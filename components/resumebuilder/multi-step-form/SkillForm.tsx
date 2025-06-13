"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeBuilder } from "@/provider/ResumeBuilderProvider";
import { Label } from "@radix-ui/react-label";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

export default function SkillForm() {
  const [newSkill, setNewSkill] = useState("");
  const {
    resumeData: { skills },
    setResumeData,
  } = useResumeBuilder();

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setResumeData((prevResumeData) => ({
        ...prevResumeData,
        skills: [...prevResumeData.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      skills: prevResumeData.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <p className="text-muted-foreground mb-6">
          Add your technical and professional skills
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="newSkill">Add a skill</Label>
            <Input
              id="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., JavaScript, Project Management, Adobe Photoshop"
            />
          </div>
          <Button
            type="button"
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="mt-6"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {skills.length > 0 && (
          <div>
            <Label className="mb-3 block">Your skills</Label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 py-1 px-3"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {skills.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No skills added yet. Start by adding your first skill above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
