import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  PersonalInfo,
  useResumeBuilder,
} from "@/provider/ResumeBuilderProvider";
import React from "react";

export default function PersonalnfoForm() {
  const {
    resumeData: { personalInfo },
    setResumeData,
  } = useResumeBuilder();

  const handleChange = function (field: keyof PersonalInfo, value: string) {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      personalInfo: {
        ...prevResumeData.personalInfo,
        [field]: value,
      },
    }));
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
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={personalInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="9783293632"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={personalInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/johndoe"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub Profile</Label>
          <Input
            id="github"
            placeholder="https://github.com/johndoe"
            value={personalInfo.github}
            onChange={(e) => handleChange("github", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
