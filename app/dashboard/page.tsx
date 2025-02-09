import MapWrapper from "@/components/MapWrapper";
import { auth } from "@clerk/nextjs/server"

export default async function page() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  return (
    <div className="flex flex-col flex-1 h-full">
      <div>
        <MapWrapper />
      </div>
    </div>
  )
}
