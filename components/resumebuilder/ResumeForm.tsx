"use client";
import PersonalnfoForm from "./multi-step-form/PersonalnfoForm";
import WorkExperienceForm from "./multi-step-form/WorkExperienceForm";
import EductionForm from "./multi-step-form/EductionForm";
import SkillForm from "./multi-step-form/SkillForm";
import SummerForm from "./multi-step-form/SummerForm";
import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";

export default function ResumeForm() {
  const { currentStep } = useResumeBuilder();

  return (
    <div className="w-full">
      {currentStep === 0 && <PersonalnfoForm />}
      {currentStep === 1 && <WorkExperienceForm />}
      {currentStep === 2 && <EductionForm />}
      {currentStep === 3 && <SkillForm />}
      {currentStep === 4 && <SummerForm />}
    </div>
  );
}
