"use client";

import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";
import React from "react";

export default function Stepper() {
  const { stepTitles, currentStep } = useResumeBuilder();
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepTitles.map((title, index) => (
          <div key={title} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-xs text-center ${
                index <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / stepTitles.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
