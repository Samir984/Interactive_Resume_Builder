"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Stepper from "./Steeper";

export default function ResumeBuilder() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Stepper />
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={() => console.log("clear")}
          variant="outline"
          size="sm"
        >
          Clear All Data
        </Button>
      </div>
    </div>
  );
}
