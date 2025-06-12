import ResumePreview from "@/components/resumepreview/ResumePreview";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="">Resume Builder</div>
      <ResumePreview />
    </div>
  );
}
