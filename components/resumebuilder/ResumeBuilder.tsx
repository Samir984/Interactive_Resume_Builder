"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Stepper from "./Steeper";
import FormNavigation from "./FormNavigation";
import ResumeForm from "./ResumeForm";
import ResetButton from "./ResetButton";

export default function ResumeBuilder() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Stepper />
          <ResumeForm />
          <FormNavigation />
        </CardContent>
      </Card>

      <ResetButton />
    </div>
  );
}
