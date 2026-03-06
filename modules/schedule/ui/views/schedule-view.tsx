"use client";

import { useState } from "react";

import EditSiteDialog from "../components/edit-site-dialog.tsx";
import { ScheduleTable } from "../components/schedule-table";
import { columns, ScheduleColumns } from "../components/schedule-table/columns";

const PLACE_HOLDER = [
  {
    name: "John Soto",
    dateAndTime: "5/10/26 CST 8:00 PM",
    client: "McDonalds",
    siteId: "MD42069",
    techName: "Jennifer Surname",
    helperTechName: "Rosemary Surename",
    techArrivedAt: "9:00 PM",
    techDepartedAt: "4:20 AM",
    action: "",
    completed: false,
  },
] as ScheduleColumns[];

export default function ScheduleView() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <div>
      <EditSiteDialog
        isOpen={dialogIsOpen}
        onCloseDialog={() => setDialogIsOpen(true)}
      />
      <ScheduleTable columns={columns} data={PLACE_HOLDER} />
    </div>
  );
}
