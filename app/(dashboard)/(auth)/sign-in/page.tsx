import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/get-current-session";
import SignInView from "@/modules/auth/ui/views/sign-in-view";

export default async function SignInPage() {
  const session = await getCurrentSession();

  if (!!session) redirect("/");
  return <SignInView />;
}
