import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { supabaseAdmin } from "@/lib/supabase/supabase-server";
import { db } from "@/lib/db";
import { deliverableTable } from "@/lib/db/schema";

const BUCKET = "images";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  const { path } = body as { path?: unknown };

  if (!path || typeof path !== "string") {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  if (path.includes("..") || path.startsWith("/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  // Verify the path belongs to a known deliverable — prevents signing arbitrary objects
  const row = await db
    .select({ id: deliverableTable.id })
    .from(deliverableTable)
    .where(eq(deliverableTable.path, path))
    .limit(1);

  if (row.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(path, 300); // 5-minute expiry

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ signedUrl: data.signedUrl });
}
