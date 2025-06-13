"use client"

import { Textarea } from "@/components/ui/textarea";
import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function SummerForm() {
  const {
    resumeData: { summary },
    setResumeData,
  } = useResumeBuilder();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
        <p className="text-muted-foreground mb-6">
          Write a brief summary about yourself and your career goals
        </p>
      </div>

      <div>
        <Label htmlFor="summary">About Me</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) =>
            setResumeData((prevResumeData) => ({
              ...prevResumeData,
              summary: e.target.value,
            }))
          }
          placeholder="Write professional summary ..."
          rows={6}
          className="mt-2"
        />
        <p className="text-sm text-muted-foreground mt-2">
          {summary.length} characters (recommended: 150-300 characters)
        </p>
      </div>
    </div>
  );
}
