import React from "react";
import { Button } from "../ui/button";
import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";

export default function ResetButton() {
  const { handleResetForm } = useResumeBuilder();

  return (
    <div className="text-center">
      <Button onClick={handleResetForm} variant="outline" size="sm">
        Clear All Data
      </Button>
    </div>
  );
}
