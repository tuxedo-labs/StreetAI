"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ImSpinner } from "react-icons/im";

export default function ClientAuth({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex justfy-center items-center h-screen w-full">
        <div className="flex justfy-center items-center h-screen w-full">
          <h1>loading</h1>
        </div>
      </div>
    )
  };

  return <>{children}</>;
}

