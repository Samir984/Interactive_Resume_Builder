"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  ReactNode,
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: number;
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

// Dummy data
// export const initialResumeData: ResumeData = {
//   personalInfo: {
//     fullName: "John Doe",
//     email: "john.doe@example.com",
//     phone: "9745316522",
//     location: "San Francisco, CA, USA",
//     linkedin: "https://www.linkedin.com/in/johndoe",
//     github: "https://github.com/johndoe",
//   },
//   workExperience: [
//     {
//       id: "1",
//       company: "Tech Innovations Inc.",
//       jobTitle: "Senior Software Engineer",
//       startDate: "2022-01-18",
//       endDate: "Present",
//       current: true,
//       description:
//         "Led development of scalable web applications using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.",
//     },
//     {
//       id: "2",
//       company: "Web Solutions Co.",
//       jobTitle: "Software Developer",
//       startDate: "2019-06-11",
//       endDate: "2021-12-10",
//       current: false,
//       description:
//         "Developed and maintained front-end components with Angular. Collaborated with UX/UI designers to improve user experience.",
//     },
//   ],
//   education: [
//     {
//       id: "1",
//       institution: "University of California, Berkeley",
//       degree: "Master of Science in Computer Science",
//       startYear: "2018",
//       endYear: "2019",
//       description:
//         "Specialized in Artificial Intelligence and Machine Learning.",
//     },
//     {
//       id: "2",
//       institution: "Stanford University",
//       degree: "Bachelor of Science in Software Engineering",
//       startYear: "2014",
//       endYear: "2018",
//       description: "Graduated with honors. Dean's List every semester.",
//     },
//   ],
//   skills: [
//     "JavaScript",
//     "React.js",
//     "Node.js",
//     "Python",
//     "TypeScript",
//     "Tailwind CSS",
//     "Git",
//     "AWS",
//     "RESTful APIs",
//     "Database Management (SQL, NoSQL)",
//   ],
//   summary:
//     "Highly motivated and results-oriented Senior Software Engineer with 5+ years of experience in developing and deploying full-stack web applications. Proven ability to lead projects, mentor teams, and deliver robust, scalable software solutions. Passionate about clean code, continuous learning, and innovative problem-solving.",
// };

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
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
  currentStep: number;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  handleFormNavigation: (action: "prev" | "next") => void;
  handleResetForm: () => void;
}

const ResumeBuilderContext = createContext<ResumeBuilderContext | undefined>(
  undefined
);

export default function ResumeBuilderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [resumeData, setResumeData, clearResumeData] =
    useLocalStorage<ResumeData>("resumeData", initialResumeData);

  const [storedStep, setStoredStep] = useLocalStorage<number>("currentStep", 0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(storedStep);
  }, [storedStep]);

  const stepTitles = [
    "Personal",
    "Experience",
    "Education",
    "Skills",
    "Summary",
  ];

  const handleFormNavigation = function (action: "prev" | "next") {
    setCurrentStep((prev) => {
      let newStep = prev;
      if (action === "prev") {
        newStep = Math.max(0, prev - 1);
      } else {
        newStep = Math.min(stepTitles.length - 1, prev + 1);
      }
      setStoredStep(newStep);
      return newStep;
    });
  };

  const handleResetForm = function () {
    clearResumeData();
    setCurrentStep(0);
    setStoredStep(0);
  };

  return (
    <ResumeBuilderContext.Provider
      value={{
        resumeData,
        setResumeData,
        stepTitles,
        currentStep,
        handleFormNavigation,
        handleResetForm,
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
}

export const useResumeBuilder = () => {
  const context = useContext(ResumeBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useResumeBuilderContext must be used within a ResumeBuilderContext"
    );
  }
  return context;
};
