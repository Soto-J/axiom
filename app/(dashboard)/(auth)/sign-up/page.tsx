import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/get-current-session";
import SignUpView from "@/modules/auth/ui/views/sign-up-view";

export default async function SignUpPage() {
  const session = await getCurrentSession();

  if (!!session) redirect("/");

  return <SignUpView />;
}
