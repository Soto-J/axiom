import UnderConstruction from "@/components/under-construction";
import ScheduleView from "@/modules/schedule/ui/views/schedule-view";

export default function SchedulePage() {
  if (process.env.NODE_ENV !== "development") {
    return (
      <UnderConstruction
        title="Schedule"
        message="Stay tuned. We're working on an amazing user experience."
      />
    );
  }

  return <ScheduleView />;
}
