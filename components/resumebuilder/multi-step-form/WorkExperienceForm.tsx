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
import React from "react";

export default function WorkExperienceForm() {
  const {
    resumeData: { workExperience },
    setResumeData,
  } = useResumeBuilder();

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
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
  };

  const updateExperience = (
    id: string,
    field: keyof WorkExperience,
    value: string | boolean
  ) => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      workExperience: prevResumeData.workExperience.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
            }
          : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      workExperience: prevResumeData.workExperience.filter(
        (exp) => exp.id !== id
      ),
    }));
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        <p className="text-muted-foreground mb-6">
          Add your professional experience
        </p>
      </div>

      {workExperience.map((experience, index) => (
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
                <Label htmlFor={`company-${experience.id}`}>Company Name</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(experience.id, "company", e.target.value)
                  }
                  placeholder="Apple Inc."
                />
              </div>

              <div>
                <Label htmlFor={`jobTitle-${experience.id}`}>Job Title</Label>
                <Input
                  id={`jobTitle-${experience.id}`}
                  value={experience.jobTitle}
                  onChange={(e) =>
                    updateExperience(experience.id, "jobTitle", e.target.value)
                  }
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  type="date"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "startDate", e.target.value)
                  }
                />
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
                  disabled={experience.current}
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onCheckedChange={(checked) =>
                      updateExperience(experience.id, "current", !!checked)
                    }
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
                Job Description
              </Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) =>
                  updateExperience(experience.id, "description", e.target.value)
                }
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        onClick={addExperience}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
}
