import React from "react";
import { Button } from "../ui/button";
import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function FormNavigation() {
  const { currentStep, stepTitles } = useResumeBuilder();
  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        // onClick={onPrevious}
        disabled={currentStep === 0}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </Button>

      <Button
        type="button"
        // onClick={onNext}
        // disabled={isNextDisabled}
        className="flex items-center gap-2"
      >
        {currentStep === stepTitles.length - 1 ? "Complete" : "Next"}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
