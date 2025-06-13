"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useResumeBuilder,
  WorkExperience,
} from "@/provider/ResumeBuilderProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { validateRequired } from "@/lib/utils";
import { cn } from "@/lib/utils";

type ExperienceErrors = Partial<WorkExperience>;

type WorkExperienceFormErrors = {
  [experienceId: number]: ExperienceErrors;
};

export default function WorkExperienceForm() {
  const {
    resumeData: { workExperience },
    setResumeData,
  } = useResumeBuilder();

  const [errors, setErrors] = useState<WorkExperienceFormErrors>({});

  const getExperienceErrors = (experienceId: number) => {
    return errors[experienceId] || {};
  };

  const hasAnyExperienceErrors = function () {
    for (const id in errors) {
      const experienceError = errors[id];
      for (const field in experienceError) {
        if (experienceError[field as keyof ExperienceErrors]) {
          return true;
        }
      }
    }

    for (const exp of workExperience) {
      if (
        !validateRequired(exp.company) ||
        !validateRequired(exp.jobTitle) ||
        !validateRequired(exp.startDate) ||
        !validateRequired(exp.description)
      ) {
        return true;
      }

      if (!exp.current && !validateRequired(exp.endDate)) {
        return true;
      }

      if (exp.startDate && exp.endDate && !exp.current) {
        const startDateObj = new Date(exp.startDate);
        const endDateObj = new Date(exp.endDate);

        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
          if (startDateObj > endDateObj) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: workExperience.length,
      company: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      workExperience: [...prevResumeData.workExperience, newExperience],
    }));

    // Initialize an empty error object for each experience section
    setErrors((prevErrors) => ({
      ...prevErrors,
      [newExperience.id]: {},
    }));
  };

  const updateExperience = (
    id: number,
    field: keyof WorkExperience,
    value: string | boolean
  ) => {
    setResumeData((prevResumeData) => {
      const updatedWorkExperience = prevResumeData.workExperience.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
            }
          : exp
      );
      return {
        ...prevResumeData,
        workExperience: updatedWorkExperience,
      };
    });

    // empying error field on update
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: {
        ...getExperienceErrors(id),
        [field]: "",
      },
    }));

    if (field === "current" && !!value) {
      setResumeData((prevResumeData) => ({
        ...prevResumeData,
        workExperience: prevResumeData.workExperience.map((exp) =>
          exp.id === id
            ? {
                ...exp,
                endDate: "",
              }
            : exp
        ),
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: {
          ...getExperienceErrors(id),
          endDate: "",
        },
      }));
    }
  };

  const removeExperience = (id: number) => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      workExperience: prevResumeData.workExperience.filter(
        (exp) => exp.id !== id
      ),
    }));

    // removing error along with experience section
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[id];
      return newErrors;
    });
  };

  const validateExperienceField = (
    experienceToValidate: WorkExperience,
    field: keyof WorkExperience,
    value: string
  ) => {
    let error = "";
    const currentExperienceErrors = getExperienceErrors(
      experienceToValidate.id
    );
    const newErrorsForThisExperience: ExperienceErrors = {
      ...currentExperienceErrors,
    };

    if (
      field === "company" ||
      field === "jobTitle" ||
      field === "startDate" ||
      field === "description"
    ) {
      if (!validateRequired(value)) {
        error = `${field.replace(/([A-Z])/g, " $1").toLowerCase()} is required`;
      }
    } else if (field === "endDate") {
      const currentExperienceData =
        workExperience.find((exp) => exp.id === experienceToValidate.id) ||
        experienceToValidate;
      if (!currentExperienceData.current && !validateRequired(value)) {
        error = "end date is required";
      }
    }

    if (field === "startDate" || field === "endDate") {
      const currentExperienceData =
        workExperience.find((exp) => exp.id === experienceToValidate.id) ||
        experienceToValidate;

      const currentStartDate = currentExperienceData.startDate;
      const currentEndDate = currentExperienceData.endDate;

      if (
        currentStartDate &&
        currentEndDate &&
        !currentExperienceData.current
      ) {
        const startDateObj = new Date(currentStartDate);
        const endDateObj = new Date(currentEndDate);

        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
          if (startDateObj > endDateObj) {
            error = "End Date cannot be before Start Date.";
          }
        }
      }
    }

    setErrors((prevErrors) => {
      const updatedErrors = {
        ...prevErrors,
        [experienceToValidate.id]: {
          ...newErrorsForThisExperience,
          [field]: error,
        },
      };

      const currentExperienceData = workExperience.find(
        (exp) => exp.id === experienceToValidate.id
      );
      if (currentExperienceData) {
        if (
          field === "startDate" &&
          !error &&
          updatedErrors[experienceToValidate.id].endDate
        ) {
          if (
            currentExperienceData.endDate &&
            new Date(currentExperienceData.startDate) <=
              new Date(currentExperienceData.endDate)
          ) {
            updatedErrors[experienceToValidate.id].endDate = "";
          }
        } else if (
          field === "endDate" &&
          !error &&
          updatedErrors[experienceToValidate.id].startDate
        ) {
          if (
            currentExperienceData.startDate &&
            new Date(currentExperienceData.endDate) >=
              new Date(currentExperienceData.startDate)
          ) {
            updatedErrors[experienceToValidate.id].startDate = "";
          }
        }
      }

      return updatedErrors;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        <p className="text-muted-foreground mb-6">
          Add your professional experience
        </p>
      </div>

      {workExperience.map((experience, index) => {
        const experienceErrors = getExperienceErrors(experience.id);
        return (
          <Card key={experience.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(experience.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`company-${experience.id}`}>
                    Company Name *
                  </Label>
                  <Input
                    id={`company-${experience.id}`}
                    value={experience.company}
                    onChange={(e) =>
                      updateExperience(experience.id, "company", e.target.value)
                    }
                    onBlur={(e) =>
                      validateExperienceField(
                        experience,
                        "company",
                        e.target.value
                      )
                    }
                    placeholder="Apple Inc."
                    className={cn({
                      "border-destructive": experienceErrors.company,
                    })}
                  />
                  {experienceErrors.company && (
                    <p className="text-destructive text-sm mt-1">
                      {experienceErrors.company}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`jobTitle-${experience.id}`}>
                    Job Title *
                  </Label>
                  <Input
                    id={`jobTitle-${experience.id}`}
                    value={experience.jobTitle}
                    onChange={(e) =>
                      updateExperience(
                        experience.id,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      validateExperienceField(
                        experience,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    placeholder="Software Engineer"
                    className={cn({
                      "border-destructive": experienceErrors.jobTitle,
                    })}
                  />
                  {experienceErrors.jobTitle && (
                    <p className="text-destructive text-sm mt-1">
                      {experienceErrors.jobTitle}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`startDate-${experience.id}`}>
                    Start Date *
                  </Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    type="date"
                    value={experience.startDate}
                    onChange={(e) =>
                      updateExperience(
                        experience.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      validateExperienceField(
                        experience,
                        "startDate",
                        e.target.value
                      )
                    }
                    className={cn({
                      "border-destructive": experienceErrors.startDate,
                    })}
                  />
                  {experienceErrors.startDate && (
                    <p className="text-destructive text-sm mt-1">
                      {experienceErrors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    type="date"
                    value={experience.endDate}
                    onChange={(e) =>
                      updateExperience(experience.id, "endDate", e.target.value)
                    }
                    onBlur={(e) =>
                      validateExperienceField(
                        experience,
                        "endDate",
                        e.target.value
                      )
                    }
                    disabled={experience.current}
                    className={cn({
                      "border-destructive": experienceErrors.endDate,
                    })}
                  />
                  {experienceErrors.endDate && (
                    <p className="text-destructive text-sm mt-1">
                      {experienceErrors.endDate}
                    </p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onCheckedChange={(checked) => {
                        updateExperience(experience.id, "current", !!checked);
                        if (!!checked) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            [experience.id]: {
                              ...getExperienceErrors(experience.id),
                              endDate: "",
                            },
                          }));
                        } else {
                          const currentExp = workExperience.find(
                            (exp) => exp.id === experience.id
                          );
                          if (currentExp && !currentExp.endDate) {
                            validateExperienceField(currentExp, "endDate", "");
                          }
                        }
                      }}
                    />
                    <Label
                      htmlFor={`current-${experience.id}`}
                      className="text-sm"
                    >
                      I currently work here
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${experience.id}`}>
                  Job Description *
                </Label>
                <Textarea
                  id={`description-${experience.id}`}
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(
                      experience.id,
                      "description",
                      e.target.value
                    )
                  }
                  onBlur={(e) =>
                    validateExperienceField(
                      experience,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                  className={cn({
                    "border-destructive": experienceErrors.description,
                  })}
                />
                {experienceErrors.description && (
                  <p className="text-destructive text-sm mt-1">
                    {experienceErrors.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Button
        type="button"
        onClick={addExperience}
        variant="outline"
        className="w-full"
        disabled={hasAnyExperienceErrors()}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
}
