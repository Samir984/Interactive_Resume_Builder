import ResumeBuilder from "@/components/resumebuilder/ResumeBuilder";
import ResumePreview from "@/components/resumepreview/ResumePreview";

export default function Home() {
  return (
    <div className="container-center grid grid-cols-1  xl:grid-cols-2 w-full  gap-8 mt-6 p-4">
      <ResumeBuilder />
      <ResumePreview />
    </div>
  );
}
