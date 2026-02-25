import Image from "next/image";

import { File } from "lucide-react";
import {
  after_tech_arrives_on_site,
  DELIVERABLES,
  PRE_CHECK_IN,
} from "@/lib/constants";

import Checklist from "@/components/checklist";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="w-full max-w-5xl space-y-6 px-16">
        <Image
          src="/axiom-logo.png"
          alt="Axiom Logo"
          height={250}
          width={250}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Check List</h1>

          <h2 className="flex items-center">
            <span className="font-semibold">View Documentation</span>
            <a href="/axiom-docs.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="cursor-pointer">
                <File />
              </Button>
            </a>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Checklist title="Pre Checkin" list={PRE_CHECK_IN} />
          <Checklist
            title="After tech confirmed hes on site"
            list={after_tech_arrives_on_site}
          />
          <div className="col-span-2">
            <Checklist title="Deliverables" list={DELIVERABLES} />
          </div>
        </div>
      </main>
    </div>
  );
}
