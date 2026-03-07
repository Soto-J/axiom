"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { Check, Pen } from "lucide-react";

import EditSiteDialog from "@/modules/schedule/ui/components/dialogs.tsx/edit-site-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SiteInfoDialog from "../dialogs.tsx/site-info-diallog";

export const ScheduleColumnsSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateAndTime: z.string(),
  client: z.string(),
  siteId: z.string(),
  techName: z.string(),
  helperTechName: z.string(),
  techStartsAt: z.string(),
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
    accessorKey: "techStartsAt",
    header: "Tech Starts At",
  },
  {
    accessorKey: "completed",
    header: "Completed",
    cell: () => {
      return (
        <div className="flex items-center justify-center">
          <Check className="text-green-600" />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => {
      const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
      const [siteInfoDialogIsOpen, setSiteInfoDialogIsOpen] = useState(false);

      return (
        <>
          <EditSiteDialog
            isOpen={editDialogIsOpen}
            onCloseDialog={() => setEditDialogIsOpen(false)}
          />
          <SiteInfoDialog
            isOpen={siteInfoDialogIsOpen}
            onCloseDialog={() => setSiteInfoDialogIsOpen(false)}
          />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Pen size={16} className="cursor-pointer" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setSiteInfoDialogIsOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  Site Info
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditDialogIsOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  Edit
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
