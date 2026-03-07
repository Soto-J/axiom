"use client";

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
    techStartsAt: "7:00 PM",
    completed: false,
  },
] as ScheduleColumns[];

export default function ScheduleView() {
  return (
    <>
      <ScheduleTable columns={columns} data={PLACE_HOLDER} />
    </>
  );
}
