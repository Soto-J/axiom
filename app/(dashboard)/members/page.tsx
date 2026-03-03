import UnderConstruction from "@/components/under-construction";
import MembersView from "@/modules/members/ui/views/members-view";

export default function MembersPage() {
  if (process.env.NODE_ENV !== "development") {
    return (
      <UnderConstruction
        title="Members Page"
        message="We're working on hard deliver an amazing user experience."
      />
    );
  }

  return <MembersView />;
}
