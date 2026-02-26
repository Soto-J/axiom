import { Construction } from "lucide-react";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UnderConstructionProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function UnderConstruction({
  title = "Under Construction",
  message = "This page is currently being built. Please check back later!",
  className,
}: UnderConstructionProps) {
  return (
    <div className="flex min-h-100 items-center justify-center p-4">
      <Card className={cn("shadow-xl", className)}>
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Construction className="text-muted-foreground h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
