import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function AuthProvider({ children }: Props) {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
