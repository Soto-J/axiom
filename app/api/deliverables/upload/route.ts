import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/supabase-server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

import { deliverablesTable } from "@/lib/db/schema";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // 2) Read file from multipart form
  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  // 3) Build a private path
  const ext = file.name.split(".").pop() || "bin";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  // 4) Upload using service role
  const { error } = await supabaseAdmin.storage
    .from("images")
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 5) Save metadata (recommended)
  // const [row] = await db
  //   .insert(deliverablesTable)
  //   .values({ ownerId: userId, path })
  //   .returning();

  return NextResponse.json({ path }); // or { id: row.id }
}
