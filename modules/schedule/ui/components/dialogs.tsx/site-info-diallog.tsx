import { ResponsiveDialog } from "@/components/responsive-dialog";

interface SiteInfoDialogProps {
  isOpen: boolean;
  onCloseDialog: () => void;
  //   initialValues: ProfileGetOne;
}

export default function SiteInfoDialog({
  isOpen,
  onCloseDialog,
}: SiteInfoDialogProps) {
  return (
    <ResponsiveDialog
      title="Site Information"
      description="Place Holder"
      isOpen={isOpen}
      onOpenChange={onCloseDialog}
    >
      SiteForm
    </ResponsiveDialog>
  );
}
