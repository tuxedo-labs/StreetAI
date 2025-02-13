"use client";

import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("@/components/map"), { ssr: false });

export default function MapWrapper() {
  return <MyMap />;
}

