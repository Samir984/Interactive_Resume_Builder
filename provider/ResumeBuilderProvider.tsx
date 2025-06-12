"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ReactNode, useContext, useState, createContext } from "react";

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  summary: string;
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  workExperience: [],
  education: [],
  skills: [],
  summary: "",
};

interface ResumeBuilderContext {
  resumeData: ResumeData;
  stepTitles: string[];
}

const ResumeBuilderContext = createContext<ResumeBuilderContext | undefined>(
  undefined
);

export default function ResumeBuilderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData, clearResumeData] =
    useLocalStorage<ResumeData>("resumeData", initialResumeData);

  const stepTitles = [
    "Personal",
    "Experience",
    "Education",
    "Skills",
    "Summary",
  ];

  return (
    <ResumeBuilderContext.Provider
      value={{
        resumeData,
        stepTitles,
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
}

export const useResumeBuilderContext = () => {
  const context = useContext(ResumeBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useResumeBuilderContext must be used within a ResumeBuilderContext"
    );
  }
  return context;
};
