import { File } from "lucide-react";
import {
  AFTER_TECH_ARRIVES_ON_SITE,
  DELIVERABLES,
  PRE_CHECK_IN,
} from "@/lib/constants";

import Checklist from "@/components/checklist";
import { Button } from "@/components/ui/button";
import FaqSheet from "@/modules/check-list/ui/components/faq-sheet";

export default function CheckListView() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Check List</h1>

        <div className="flex items-center">
          <Button variant="ghost" className="cursor-pointer">
            <a
              href="/axiom-docs.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-2"
            >
              <span className="font-semibold">View Documentation</span>
              <File />
            </a>
          </Button>

          <FaqSheet />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Checklist title="Pre Checkin" list={PRE_CHECK_IN} />
        <Checklist
          title="After tech confirmed he's on site"
          list={AFTER_TECH_ARRIVES_ON_SITE}
        />
        <div className="col-span-2">
          <Checklist title="Deliverables" list={DELIVERABLES} />
        </div>
      </div>
    </>
  );
}
