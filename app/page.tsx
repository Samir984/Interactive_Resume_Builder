import ResumeBuilder from "@/components/resumebuilder/ResumeBuilder";
import ResumePreview from "@/components/resumepreview/ResumePreview";

export default function Home() {
  return (
    <div className="container-center grid grid-cols-1  lg:grid-cols-2 w-full  gap-8 mt-6">
      <ResumeBuilder />
      <ResumePreview />
    </div>
  );
}
