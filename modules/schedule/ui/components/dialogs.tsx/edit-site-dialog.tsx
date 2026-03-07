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

export default function EditSiteDialog({
  isOpen,
  onCloseDialog,
}: EditSiteDialogProps) {
  const form = useForm<z.infer<typeof EditSiteSchema>>({});

  return (
    <ResponsiveDialog
      title={"Site"}
      description={""}
      isOpen={isOpen}
      onOpenChange={onCloseDialog}
    >
      SiteForm
    </ResponsiveDialog>
  );
}
