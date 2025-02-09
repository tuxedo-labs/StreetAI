import { UserProfile } from "@clerk/nextjs";

export default function page() {
    return (
        <div className="flex justify-center items-center h-screen flex-1 ">
            <UserProfile />
        </div>
    )
}
