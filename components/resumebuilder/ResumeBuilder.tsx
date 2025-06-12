"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Stepper from "./Steeper";
import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";
import PersonalnfoForm from "./multi-stepform/PersonalnfoForm";
import WorkExperienceForm from "./multi-stepform/WorkExperienceForm";
import EductionForm from "./multi-stepform/EductionForm";
import SkillForm from "./multi-stepform/SkillForm";
import SummerForm from "./multi-stepform/SummerForm";
import FormNavigation from "./FormNavigation";

export default function ResumeBuilder() {
  const { resumeData, currentStep } = useResumeBuilder();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Stepper />
          <div className="w-full">
            {currentStep === 0 && <PersonalnfoForm />}
            {currentStep === 1 && <WorkExperienceForm />}
            {currentStep === 2 && <EductionForm />}
            {currentStep === 3 && <SkillForm />}
            {currentStep === 4 && <SummerForm />}
          </div>
          <FormNavigation />
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={() => console.log("clear")}
          variant="outline"
          size="sm"
        >
          Clear All Data
        </Button>
      </div>
    </div>
  );
}
