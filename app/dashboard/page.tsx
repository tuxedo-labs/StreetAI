import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
    const {userId, redirectToSignIn } = await auth()
    if(!userId) return redirectToSignIn();
    return (
        <h1>h</h1>
    )
}
