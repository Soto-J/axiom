import { z } from "zod";
import { useForm } from "react-hook-form";
import { ResponsiveDialog } from "@/components/responsive-dialog";

const EditSiteSchema = z.object({
  techArrivedAt: z.string(),
  techDepartedAt: z.string(),
  siteNotes: z.string(),
});

interface EditSiteDialogProps {
  isOpen: boolean;
  onCloseDialog: () => void;
  //   initialValues: ProfileGetOne;
}

export default function EditSiteDialog({}: EditSiteDialogProps) {
  const form = useForm<z.infer<typeof EditSiteSchema>>({});

  return (
    <ResponsiveDialog
      title={"Site"}
      description={""}
      isOpen={false}
      onOpenChange={function (isOpen: boolean): void {
        throw new Error("Function not implemented.");
      }}
    >
      SiteForm
    </ResponsiveDialog>
  );
}
