"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ModuleHomePage = dynamic(() => import("../views/landing/index"), {
  ssr: false, 
});

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModuleHomePage />
    </Suspense>
  );
}
