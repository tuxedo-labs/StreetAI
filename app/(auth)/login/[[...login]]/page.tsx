import { SignIn } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-grow justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}
