import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { eq, and } from "drizzle-orm";

import { supabaseAdmin } from "@/lib/supabase/supabase-server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { deliverablesTable } from "@/lib/db/schema";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path } = await req.json();

  if (!path || typeof path !== "string") {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const userId = session.user.id;
  // IMPORTANT: verify ownership (recommended)
  // const row = await db.query.imagesTable.findFirst({
  //   where: and(eq(imagesTable.ownerId, userId), eq(imagesTable.path, path)),
  // });
  // if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // const { data, error } = await supabaseAdmin.storage
  //   .from("images")
  //   .createSignedUrl(path, 60); // seconds

  // if (error) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  // return NextResponse.json({ url: data.signedUrl });
}
