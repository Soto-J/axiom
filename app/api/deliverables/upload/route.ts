import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/supabase-server";
import { db } from "@/lib/db";
import { deliverableTable } from "@/lib/db/schema";

export async function POST(req: Request) {
  const form = await req.formData();

  const file = form.get("file");
  const siteCode = form.get("siteCode");
  const checklistIndex = form.get("checklistIndex");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (typeof siteCode !== "string" || !siteCode.trim()) {
    return NextResponse.json({ error: "Missing siteCode" }, { status: 400 });
  }

  const index = Number(checklistIndex);
  if (!Number.isInteger(index) || index < 0) {
    return NextResponse.json(
      { error: "Invalid checklistIndex" },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop() || "bin";
  const path = `${siteCode}/${index}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("images")
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const [row] = await db
    .insert(deliverableTable)
    .values({
      id: crypto.randomUUID(),
      siteId: siteCode.trim(),
      checklistIndex: index,
      bucket: "images",
      path,
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
      status: "pending",
      uploadedBy: siteCode.trim(),
    })
    .returning();

  return NextResponse.json({ id: row.id, path: row.path });
}
