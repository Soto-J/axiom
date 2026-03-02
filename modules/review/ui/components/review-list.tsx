"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/client";
import { getSupabaseClient } from "@/lib/supabase/supabase-client";
import { DELIVERABLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, ImageIcon } from "lucide-react";

type Status = "pending" | "approved" | "rejected";

interface DeliverableRow {
  id: string;
  siteId: string;
  checklistIndex: number;
  status: string;
  path: string;
  bucket: string;
  fileName: string;
  createdAt: Date;
}

function StatusBadge({ status }: { status: Status }) {
  const config = {
    pending: { icon: Clock, label: "Pending", className: "text-yellow-500" },
    approved: {
      icon: CheckCircle,
      label: "Approved",
      className: "text-green-500",
    },
    rejected: { icon: XCircle, label: "Rejected", className: "text-red-500" },
  } as const;

  const { icon: Icon, label, className } = config[status];

  return (
    <span
      className={cn("flex items-center gap-1 text-xs font-medium", className)}
    >
      <Icon size={13} />
      {label}
    </span>
  );
}

function DeliverableCard({
  row,
  onReview,
}: {
  row: DeliverableRow;
  onReview: (id: string, status: "approved" | "rejected") => void;
}) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loadingUrl, setLoadingUrl] = useState(true);
  const label =
    DELIVERABLES[row.checklistIndex]?.label ?? `Item #${row.checklistIndex}`;

  useEffect(() => {
    async function fetchUrl() {
      try {
        const res = await fetch("/api/deliverables/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: row.path, bucket: row.bucket }),
        });
        if (res.ok) {
          const { signedUrl } = await res.json();
          setSignedUrl(signedUrl);
        }
      } finally {
        setLoadingUrl(false);
      }
    }
    fetchUrl();
  }, [row.path, row.bucket]);

  const isPending = row.status === "pending";

  return (
    <Card className="overflow-hidden">
      <div className="bg-muted flex aspect-video items-center justify-center overflow-hidden">
        {loadingUrl ? (
          <ImageIcon className="text-muted-foreground" size={32} />
        ) : signedUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={signedUrl}
            alt={label}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImageIcon className="text-muted-foreground" size={32} />
        )}
      </div>

      <CardContent className="p-3">
        <p className="text-muted-foreground mb-1 text-[11px] font-medium tracking-wider uppercase">
          Site: {row.siteId}
        </p>
        <p className="mb-2 text-sm leading-snug">{label}</p>
        <div className="mb-3">
          <StatusBadge status={row.status as Status} />
        </div>

        {isPending && (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onReview(row.id, "approved")}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => onReview(row.id, "rejected")}
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ReviewList() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const queryOptions = trpc.deliverables.getAll.queryOptions({
    status: "pending",
  });
  const { data: rows = [] } = useQuery(queryOptions);

  const { mutate: review } = useMutation(
    trpc.deliverables.review.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries(queryOptions),
    }),
  );

  // Real-time: new uploads appear without refresh
  useEffect(() => {
    const invalidate = () => queryClient.invalidateQueries(queryOptions);
    const supabase = getSupabaseClient();

    const channel = supabase
      .channel("deliverables:all")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "deliverables" },
        invalidate,
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "deliverables" },
        invalidate,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, queryOptions]);

  if (rows.length === 0) {
    return (
      <div className="text-muted-foreground py-16 text-center text-sm">
        No pending deliverables.
      </div>
    );
  }

  // Group by siteId
  const bySite = rows.reduce<Record<string, DeliverableRow[]>>((acc, row) => {
    (acc[row.siteId] ??= []).push(row as DeliverableRow);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(bySite).map(([siteId, siteRows]) => (
        <section key={siteId}>
          <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
            Site: {siteId}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteRows.map((row) => (
              <DeliverableCard
                key={row.id}
                row={row}
                onReview={(id, status) => review({ id, status })}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
