import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Education, useResumeBuilder } from "@/provider/ResumeBuilderProvider";

import { Label } from "@radix-ui/react-label";
import { Plus, Trash2 } from "lucide-react";
import React from "react";

export default function EductionForm() {
  const {
    resumeData: { education },
    setResumeData,
  } = useResumeBuilder();

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
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
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string | boolean
  ) => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      education: prevResumeData.education.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              [field]: value,
            }
          : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      education: prevResumeData.education.filter((edu) => edu.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <p className="text-muted-foreground mb-6">
          Add your educational background
        </p>
      </div>

      {education.map((education, index) => (
        <Card key={education.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Education {index + 1}</CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(education.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`institution-${education.id}`}>
                  Institution Name
                </Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(education.id, "institution", e.target.value)
                  }
                  placeholder="Harvard University"
                />
              </div>

              <div>
                <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(education.id, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              <div>
                <Label htmlFor={`startYear-${education.id}`}>Start Year</Label>
                <Input
                  id={`startYear-${education.id}`}
                  type="number"
                  value={education.startYear}
                  onChange={(e) =>
                    updateEducation(education.id, "startYear", e.target.value)
                  }
                  placeholder="2018"
                  min="1950"
                  max="2030"
                />
              </div>

              <div>
                <Label htmlFor={`endYear-${education.id}`}>End Year</Label>
                <Input
                  id={`endYear-${education.id}`}
                  type="number"
                  value={education.endYear}
                  onChange={(e) =>
                    updateEducation(education.id, "endYear", e.target.value)
                  }
                  placeholder="2022"
                  min="1950"
                  max="2030"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${education.id}`}>Description</Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description}
                onChange={(e) =>
                  updateEducation(education.id, "description", e.target.value)
                }
                placeholder="Relevant coursework, achievements, honors..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        onClick={addEducation}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
