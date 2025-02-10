'use client';
import Loader from "@/components/elements/Loader";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function LoaderProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <Loader/>
      </div>
    );
  }

  return <>{children}</>;
}