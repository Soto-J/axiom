import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/supabase-server";

export async function POST(req: Request) {
  const body = await req.json();
  const { path, bucket = "images" } = body;

  if (!path || typeof path !== "string") {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUrl(path, 300); // 5-minute expiry

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ signedUrl: data.signedUrl });
}
