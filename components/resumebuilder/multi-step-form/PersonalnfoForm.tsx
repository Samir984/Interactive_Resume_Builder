import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  PersonalInfo,
  useResumeBuilder,
} from "@/provider/ResumeBuilderProvider";
import { LocateFixed, Mail, PhoneIcon } from "lucide-react";
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
        <div className="flex flex-col gap-1 ">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Samir Neupane"
            value={personalInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
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
              className="pl-10"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
            <Input
              id="phone"
              type="number"
              placeholder="9783293632"
              className="pl-10"
              value={personalInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="location">Location *</Label>
          <div className="relative">
            <LocateFixed className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
            <Input
              id="location"
              placeholder="Chitwan tadi"
              className="pl-10"
              value={personalInfo.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 ">
          <Label htmlFor="github">GitHub Profile</Label>
          <Input
            id="github"
            placeholder="https://github.com/"
            value={personalInfo.github}
            onChange={(e) => handleChange("github", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
