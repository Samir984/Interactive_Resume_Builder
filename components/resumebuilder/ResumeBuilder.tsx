"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Stepper from "./Steeper";
import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";
import PersonalnfoForm from "./multi-step-form/PersonalnfoForm";
import WorkExperienceForm from "./multi-step-form/WorkExperienceForm";
import EductionForm from "./multi-step-form/EductionForm";
import SkillForm from "./multi-step-form/SkillForm";
import SummerForm from "./multi-step-form/SummerForm";
import FormNavigation from "./FormNavigation";

export default function ResumeBuilder() {
  const { currentStep, clearResumeData } = useResumeBuilder();

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
        <Button onClick={() => clearResumeData()} variant="outline" size="sm">
          Clear All Data
        </Button>
      </div>
    </div>
  );
}
