import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <div
      className="flex flex-col h-screen bg-[url('/globe.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="flex flex-grow justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}