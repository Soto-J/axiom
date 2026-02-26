"use client";

import { HelpCircle } from "lucide-react";

import { FAQ_ITEMS } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function FaqSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="cursor-pointer gap-x-1">
          <span className="font-semibold">FAQ</span>
          <HelpCircle className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-xl">FAQ / Guidelines</SheetTitle>
          <SheetDescription>
            Key rules and reminders for Axiom technicians on site.
          </SheetDescription>
        </SheetHeader>

        <ol className="list-decimal space-y-3 px-12">
          {FAQ_ITEMS.map((item, index) => (
            <li key={index} className="space-y-1">
              <p className="text-sm font-medium">{item.text}</p>

              {item.subItems && (
                <ol className="ml-4 list-disc">
                  {item.subItems.map((sub, subIndex) => (
                    <li
                      key={subIndex}
                      className="text-muted-foreground text-sm"
                    >
                      {sub}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
