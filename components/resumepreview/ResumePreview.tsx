"use client";

import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";
import { Card } from "../ui/card";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function ResumePreview() {
  const { resumeData } = useResumeBuilder();
  return (
    <Card className="px-8 py-10 h-fit  bg-background border shadow-lg max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {resumeData.personalInfo.name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
          {resumeData.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}
          {resumeData.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <a
                href={resumeData.personalInfo.github}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3 uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {resumeData.summary}
            </p>
          </div>
          <Separator className="my-6" />
        </>
      )}

      {/* Work Experience */}
      {resumeData.workExperience.length > 0 && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 uppercase tracking-wide">
              Work Experience
            </h2>
            <div className="space-y-6">
              {resumeData.workExperience.map((experience) => (
                <div
                  key={experience.id}
                  className="border-l-2 border-primary pl-4"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {experience.jobTitle || "Job Title"}
                      </h3>
                      <p className="text-primary font-medium">
                        {experience.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 sm:mt-0">
                      {formatDate(experience.startDate)} -{" "}
                      {experience.current
                        ? "Present"
                        : formatDate(experience.endDate)}
                    </div>
                  </div>
                  {experience.description && (
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {experience.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
        </>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((education) => (
                <div
                  key={education.id}
                  className="border-l-2 border-primary pl-4"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {education.degree || "Degree"}
                      </h3>
                      <p className="text-primary">
                        {education.institution || "Institution"}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 sm:mt-0">
                      {education.startYear} - {education.endYear}
                    </div>
                  </div>
                  {education.description && (
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {education.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
        </>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
