"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Education, useResumeBuilder } from "@/provider/ResumeBuilderProvider";

import { Label } from "@radix-ui/react-label";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { validateRequired } from "@/lib/utils";
import { cn } from "@/lib/utils";

type EducationErrors = Partial<Education>;
interface EducationFormErrors {
  [educationId: number]: EducationErrors;
}

export default function EducationForm() {
  const {
    resumeData: { education },
    setResumeData,
  } = useResumeBuilder();

  const [errors, setErrors] = useState<EducationFormErrors>({});

  const getEducationErrors = (educationId: number) => {
    return errors[educationId] || {};
  };

  const hasAnyEducationErrors = function () {
    for (const id in errors) {
      const educationError = errors[id];
      for (const field in educationError) {
        if (educationError[field as keyof EducationErrors]) {
          return true;
        }
      }
    }

    for (const edu of education) {
      if (!edu.institution || !edu.degree || !edu.startYear || !edu.endYear) {
        return true;
      }

      const startYearNum = parseInt(edu.startYear);
      const endYearNum = parseInt(edu.endYear);
      if (
        !isNaN(startYearNum) &&
        !isNaN(endYearNum) &&
        startYearNum > endYearNum
      ) {
        return true;
      }
    }
    return false;
  };

  const addEducation = () => {
    // console.log("add is trigger");
    const newEducation: Education = {
      id: education.length,
      institution: "",
      degree: "",
      startYear: "",
      endYear: "",
      description: "",
    };
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      education: [...prevResumeData.education, newEducation],
    }));
    // Initialize an error for each newEduction section
    setErrors((prevErrors) => ({
      ...prevErrors,
      [newEducation.id]: {},
    }));
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string
  ) => {
    setResumeData((prevResumeData) => {
      const updatedEducation = prevResumeData.education.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              [field]: value,
            }
          : edu
      );

      return {
        ...prevResumeData,
        education: updatedEducation,
      };
    });
    // empying error field on update
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: {
        ...getEducationErrors(id),
        [field]: "",
      },
    }));
  };

  const removeEducation = (id: number) => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      education: prevResumeData.education.filter((edu) => edu.id !== id),
    }));
    // removing error along with  eduction section
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[id];
      return newErrors;
    });
  };

  const validateEducationField = (
    educationToValidate: Education,
    field: keyof Education,
    value: string
  ) => {
    let error = "";
    const currentEducationErrors = getEducationErrors(educationToValidate.id);
    const newErrorsForThisEducation: EducationErrors = {
      ...currentEducationErrors,
    };

    if (
      field === "institution" ||
      field === "degree" ||
      field === "startYear" ||
      field === "endYear"
    ) {
      if (!validateRequired(value)) {
        error = `${field.toLowerCase()} is required`;
      }
    }

    if (field === "startYear" || field === "endYear") {
      const currentEducationData =
        education.find((edu) => edu.id === educationToValidate.id) ||
        educationToValidate;

      const currentStartYear = currentEducationData.startYear;
      const currentEndYear = currentEducationData.endYear;

      if (currentStartYear && currentEndYear) {
        const startYearNum = parseInt(currentStartYear);
        const endYearNum = parseInt(currentEndYear);

        if (!isNaN(startYearNum) && !isNaN(endYearNum)) {
          if (startYearNum > endYearNum) {
            error = "End Year cannot be before Start Year.";
          }
        } else if (isNaN(startYearNum)) {
          error = "Please enter a valid start year.";
        } else if (isNaN(endYearNum)) {
          error = "Please enter a valid end year.";
        }
      }
    }

    setErrors((prevErrors) => {
      const updatedErrors = {
        ...prevErrors,
        [educationToValidate.id]: {
          ...newErrorsForThisEducation,
          [field]: error,
        },
      };

      const currentEducationData = education.find(
        (edu) => edu.id === educationToValidate.id
      );
      if (currentEducationData) {
        if (
          field === "startYear" &&
          !error &&
          updatedErrors[educationToValidate.id].endYear
        ) {
          const startYearNum = parseInt(currentEducationData.startYear);
          const endYearNum = parseInt(currentEducationData.endYear);
          if (
            !isNaN(startYearNum) &&
            !isNaN(endYearNum) &&
            startYearNum <= endYearNum
          ) {
            updatedErrors[educationToValidate.id].endYear = "";
          }
        } else if (
          field === "endYear" &&
          !error &&
          updatedErrors[educationToValidate.id].startYear
        ) {
          const startYearNum = parseInt(currentEducationData.startYear);
          const endYearNum = parseInt(currentEducationData.endYear);
          if (
            !isNaN(startYearNum) &&
            !isNaN(endYearNum) &&
            endYearNum >= startYearNum
          ) {
            updatedErrors[educationToValidate.id].startYear = "";
          }
        }
      }
      return updatedErrors;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <p className="text-muted-foreground mb-6">
          Add your educational background
        </p>
      </div>

      {education.map((edu, index) => {
        const educationErrors = getEducationErrors(edu.id);
        return (
          <Card key={edu.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Education {index + 1}</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`institution-${edu.id}`}>
                    Institution Name *
                  </Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, "institution", e.target.value)
                    }
                    onBlur={(e) =>
                      validateEducationField(edu, "institution", e.target.value)
                    }
                    placeholder="Harvard University"
                    className={cn({
                      "border-destructive": educationErrors.institution,
                    })}
                  />
                  {educationErrors.institution && (
                    <p className="text-destructive text-sm mt-1">
                      {educationErrors.institution}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`degree-${edu.id}`}>Degree *</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                    onBlur={(e) =>
                      validateEducationField(edu, "degree", e.target.value)
                    }
                    placeholder="Bachelor of Science in Computer Science"
                    className={cn({
                      "border-destructive": educationErrors.degree,
                    })}
                  />
                  {educationErrors.degree && (
                    <p className="text-destructive text-sm mt-1">
                      {educationErrors.degree}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`startYear-${edu.id}`}>Start Year *</Label>
                  <Input
                    id={`startYear-${edu.id}`}
                    type="number"
                    value={edu.startYear}
                    onChange={(e) =>
                      updateEducation(edu.id, "startYear", e.target.value)
                    }
                    onBlur={(e) =>
                      validateEducationField(edu, "startYear", e.target.value)
                    }
                    placeholder="2018"
                    min="1950"
                    max={new Date().getFullYear() + 5} // Dynamically set max year
                    className={cn({
                      "border-destructive": educationErrors.startYear,
                    })}
                  />
                  {educationErrors.startYear && (
                    <p className="text-destructive text-sm mt-1">
                      {educationErrors.startYear}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`endYear-${edu.id}`}>End Year *</Label>
                  <Input
                    id={`endYear-${edu.id}`}
                    type="number"
                    value={edu.endYear}
                    onChange={(e) =>
                      updateEducation(edu.id, "endYear", e.target.value)
                    }
                    onBlur={(e) =>
                      validateEducationField(edu, "endYear", e.target.value)
                    }
                    placeholder="2022"
                    min="1950"
                    max={new Date().getFullYear() + 5}
                    className={cn({
                      "border-destructive": educationErrors.endYear,
                    })}
                  />
                  {educationErrors.endYear && (
                    <p className="text-destructive text-sm mt-1">
                      {educationErrors.endYear}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${edu.id}`}>Description</Label>
                <Textarea
                  id={`description-${edu.id}`}
                  value={edu.description}
                  onChange={(e) =>
                    updateEducation(edu.id, "description", e.target.value)
                  }
                  onBlur={(e) =>
                    validateEducationField(edu, "description", e.target.value)
                  }
                  placeholder="Relevant coursework, achievements, honors..."
                  rows={3}
                  className={cn({
                    "border-destructive": educationErrors.description,
                  })}
                />
                {educationErrors.description && (
                  <p className="text-destructive text-sm mt-1">
                    {educationErrors.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Button
        type="button"
        onClick={addEducation}
        variant="outline"
        className="w-full"
        disabled={hasAnyEducationErrors()}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
