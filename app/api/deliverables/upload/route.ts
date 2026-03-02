import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/supabase-server";
import { db } from "@/lib/db";
import { deliverableTable } from "@/lib/db/schema";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
];
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

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

  const normalizedSiteCode = siteCode
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-");

  if (typeof checklistIndex !== "string" || checklistIndex.trim() === "") {
    return NextResponse.json(
      { error: "Missing checklistIndex" },
      { status: 400 },
    );
  }

  const index = Number(checklistIndex);
  if (!Number.isInteger(index) || index < 0 || index > 17) {
    return NextResponse.json(
      { error: "Invalid checklistIndex" },
      { status: 400 },
    );
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "bin";
  const path = `${normalizedSiteCode}/${index}/${crypto.randomUUID()}.${ext}`;

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
      siteId: normalizedSiteCode,
      checklistIndex: index,
      bucket: "images",
      path,
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
      status: "pending",
      uploadedBy: normalizedSiteCode,
    })
    .returning();

  return NextResponse.json({ id: row.id, path: row.path });
}
