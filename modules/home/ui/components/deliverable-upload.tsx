"use client";

import { useRef, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/client";
import { getSupabaseClient } from "@/lib/supabase/supabase-client";
import { DELIVERABLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, XCircle, Clock } from "lucide-react";

type UploadStatus = "pending" | "approved" | "rejected";

function StatusBadge({ status }: { status: UploadStatus | "none" }) {
  if (status === "none") return null;

  const config = {
    pending: { icon: Clock, label: "Pending", className: "text-yellow-500" },
    approved: { icon: CheckCircle, label: "Approved", className: "text-green-500" },
    rejected: { icon: XCircle, label: "Rejected", className: "text-red-500" },
  } as const;

  const { icon: Icon, label, className } = config[status];

  return (
    <span className={cn("flex items-center gap-1 text-xs font-medium", className)}>
      <Icon size={14} />
      {label}
    </span>
  );
}

function SiteCodeForm({ onSubmit }: { onSubmit: (code: string) => void }) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">Enter Site ID</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              placeholder="e.g. MD1042"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
            <Button type="submit" disabled={!value.trim()}>
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function DeliverableItem({
  index,
  label,
  status,
  siteCode,
  onUploaded,
}: {
  index: number;
  label: string;
  status: UploadStatus | "none";
  siteCode: string;
  onUploaded: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("siteCode", siteCode);
      form.append("checklistIndex", String(index));

      const res = await fetch("/api/deliverables/upload", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const { error } = await res.json();
        alert(`Upload failed: ${error}`);
        return;
      }

      onUploaded();
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="border-border flex items-center justify-between gap-4 border-b py-3 last:border-0">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-sm leading-snug">{label}</span>
        <StatusBadge status={status} />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          variant={status !== "none" ? "outline" : "default"}
          size="sm"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={14} className="mr-1.5" />
          {uploading ? "Uploading…" : status !== "none" ? "Replace" : "Upload"}
        </Button>
      </div>
    </div>
  );
}

export default function DeliverableUpload() {
  const [siteCode, setSiteCode] = useState<string | null>(null);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const queryOptions = trpc.deliverables.getBySiteCode.queryOptions(
    { siteCode: siteCode ?? "" },
    { enabled: !!siteCode },
  );

  const { data: rows = [] } = useQuery(queryOptions);

  const statusByIndex = Object.fromEntries(
    rows.map((r) => [r.checklistIndex, r.status as UploadStatus]),
  );

  // Supabase Realtime — watch status updates for this site
  useEffect(() => {
    if (!siteCode) return;

    const supabase = getSupabaseClient();
    const channel = supabase
      .channel(`deliverables:site:${siteCode}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "deliverables",
          filter: `site_id=eq.${siteCode}`,
        },
        () => queryClient.invalidateQueries(queryOptions),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [siteCode, queryClient, queryOptions]);

  if (!siteCode) {
    return <SiteCodeForm onSubmit={setSiteCode} />;
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Deliverables</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Site: <span className="text-foreground font-medium">{siteCode}</span>
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setSiteCode(null)}>
          Change site
        </Button>
      </div>

      <Card>
        <CardContent className="px-4 py-2">
          {DELIVERABLES.map((item, index) => (
            <DeliverableItem
              key={index}
              index={index}
              label={item.label}
              status={statusByIndex[index] ?? "none"}
              siteCode={siteCode}
              onUploaded={() => queryClient.invalidateQueries(queryOptions)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
