"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Pen } from "lucide-react";
import { z } from "zod";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const ScheduleColumnsSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateAndTime: z.string(),
  client: z.string(),
  siteId: z.string(),
  techName: z.string(),
  helperTechName: z.string(),
  techArrivedAt: z.string(),
  techDepartedAt: z.string(),
  completed: z.boolean(),
  action: z.string(),
});

export type ScheduleColumns = z.infer<typeof ScheduleColumnsSchema>;

export const columns: ColumnDef<ScheduleColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "dateAndTime",
    header: "Date & Time",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "siteId",
    header: "Site ID",
  },
  {
    accessorKey: "techName",
    header: "Tech",
  },
  {
    accessorKey: "helperTechName",
    header: "Helper Tech",
  },
  {
    accessorKey: "techArrivedAt",
    header: "Tech Arrived",
  },
  {
    accessorKey: "techDepartedAt",
    header: "Tech Departed",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: () => {
      return (
        <Button variant="ghost">
          <Pen />
        </Button>
      );
    },
  },
  {
    accessorKey: "completed",
    header: "Completed",
    cell: () => {
      return (
        <div className="flex items-center justify-center">
          <Check />
        </div>
      );
    },
  },
];
