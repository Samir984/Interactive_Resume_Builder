"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateUrl,
} from "@/lib/utils";
import {
  PersonalInfo,
  useResumeBuilder,
} from "@/provider/ResumeBuilderProvider";
import { LocateFixed, Mail, PhoneIcon } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function PersonalnfoForm() {
  const {
    resumeData: { personalInfo },
    setResumeData,
  } = useResumeBuilder();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = function (field: keyof PersonalInfo, value: string) {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      personalInfo: {
        ...prevResumeData.personalInfo,
        [field]: value,
      },
    }));

    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const validateField = function (field: keyof PersonalInfo, value: string) {
    let error = "";

    if (
      field === "fullName" ||
      field === "email" ||
      field === "phone" ||
      field === "location"
    ) {
      if (!validateRequired(value)) {
        error = `${field.toLowerCase()} is required`;
      }
    }

    if (field === "email" && value && !validateEmail(value)) {
      error = "Please enter a valid email address";
    }
    if (field === "phone" && value && !validatePhone(value)) {
      error = "Please enter a valid phone number";
    }
    if (
      (field === "linkedin" || field === "github") &&
      value &&
      !validateUrl(value)
    ) {
      error = "Please enter a valid url.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <p className="text-muted-foreground mb-6">
          Let&#39;s start with your basic information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 ">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Samir Neupane"
            value={personalInfo.fullName}
            onBlur={(e) => validateField("fullName", e.target.value)}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={cn({ "border-destructive": errors.fullName })}
          />
          {errors.fullName && (
            <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={personalInfo.email}
              className={cn("pl-10", { "border-destructive": errors.email })}
              onBlur={(e) => validateField("email", e.target.value)}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
            <Input
              id="phone"
              type="text"
              placeholder="9783293632"
              className={cn("pl-10", { "border-destructive": errors.phone })}
              value={personalInfo.phone}
              onBlur={(e) => validateField("phone", e.target.value)}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="location">Location *</Label>
          <div className="relative">
            <LocateFixed className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
            <Input
              id="location"
              placeholder="Chitwan tadi"
              className={cn("pl-10", { "border-destructive": errors.location })}
              value={personalInfo.location}
              onChange={(e) => handleChange("location", e.target.value)}
              onBlur={(e) => validateField("location", e.target.value)}
            />
          </div>
          {errors.location && (
            <p className="text-destructive text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="linkedin">LinkedIn Profile </Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            onBlur={(e) => validateField("linkedin", e.target.value)}
            className={cn({ "border-destructive": errors.linkedin })}
          />
          {errors.linkedin && (
            <p className="text-destructive text-sm mt-1">{errors.linkedin}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="github">GitHub Profile </Label>
          <Input
            id="github"
            placeholder="https://github.com/"
            value={personalInfo.github}
            onChange={(e) => handleChange("github", e.target.value)}
            onBlur={(e) => validateField("github", e.target.value)}
            className={cn({ "border-destructive": errors.github })}
          />
          {errors.github && (
            <p className="text-destructive text-sm mt-1">{errors.github}</p>
          )}
        </div>
      </div>
    </div>
  );
}
