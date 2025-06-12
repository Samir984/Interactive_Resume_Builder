"use client";

import { ReactNode } from "react";
import ResumeBuilderProvider from "./ResumeBuilderProvider";

export default function Provider({ children }: { children: ReactNode }) {
  return <ResumeBuilderProvider>{children}</ResumeBuilderProvider>;
}
