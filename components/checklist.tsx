"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ChecklistProps {
  title: string;
  list: { label: string; images?: string[] }[];
}

export default function Checklist({ title, list }: ChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(label: string) {
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  return (
    <ul className="border-border space-y-3 rounded border p-6 shadow">
      <h2 className="font-semibold">{title}</h2>

      {list.map(({ label, images }) => (
        <li key={label} className="">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex gap-x-2">
                <Checkbox
                  id={label}
                  checked={!!checked[label]}
                  onCheckedChange={() => toggle(label)}
                  className="cursor-pointer"
                />

                <label
                  htmlFor={label}
                  className={cn(
                    "cursor-pointer text-sm select-none",
                    checked[label] ? "text-muted-foreground line-through" : "",
                  )}
                >
                  {label}
                </label>
              </div>
            </TooltipTrigger>

            {images && images?.length > 0 && (
              <TooltipContent
              side="left"
                className={cn(
                  "grid p-0 shadow-2xl",
                  images.length > 1 ? "grid-cols-2" : "grid-cols-1",
                )}
              >
                {images.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt="deliverable"
                    height={375}
                    width={375}
                    className="border"
                  />
                ))}
              </TooltipContent>
            )}
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
