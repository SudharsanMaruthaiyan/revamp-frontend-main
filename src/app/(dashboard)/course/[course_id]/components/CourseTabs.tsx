"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { CourseDetail } from "@/schema/course/course.schema";
import { CourseInfoTab } from "./CourseInfoTab";
import { CourseCurriculumTab } from "./CourseCurriculumTab";
import { CourseReviewTab } from "./CourseReviewTab";
import { CourseProjectsTab } from "./CourseProjectsTab";
import { CourseAnnouncementTab } from "./CourseAnnouncementTab";

const TABS = [
  { value: "info", label: "Course Info" },
  { value: "curriculum", label: "Curriculam" },
  { value: "review", label: "Review" },
  { value: "projects", label: "Projects" },
  { value: "announcement", label: "Announcement" },
] as const;

export function CourseTabs({ course }: { course: CourseDetail }) {
  return (
    <Tabs.Root defaultValue="info" className="w-full">
      {/* Tabs Container */}
      <div className="w-full overflow-hidden rounded-[8px] bg-white shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-gray-100 mb-8 max-w-5xl mx-auto">
        <Tabs.List className="flex w-full items-stretch overflow-x-auto no-scrollbar">
          {TABS.map(({ value, label }) => (
            <Tabs.Trigger 
              key={value} 
              value={value} 
              className="flex-1 min-w-[140px] px-6 py-4 text-[15px] font-semibold text-gray-800 transition-colors data-[state=active]:bg-[#FFA500] data-[state=active]:text-white outline-none whitespace-nowrap"
            >
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      <div className="mt-4">
        <Tabs.Content value="info" className="focus-visible:outline-none">
          <CourseInfoTab course={course} />
        </Tabs.Content>
        <Tabs.Content value="curriculum" className="focus-visible:outline-none">
          <CourseCurriculumTab course={course} />
        </Tabs.Content>
        <Tabs.Content value="review" className="focus-visible:outline-none">
          <CourseReviewTab course={course} />
        </Tabs.Content>
        <Tabs.Content value="projects" className="focus-visible:outline-none">
          <CourseProjectsTab course={course} />
        </Tabs.Content>
        <Tabs.Content value="announcement" className="focus-visible:outline-none">
          <CourseAnnouncementTab course={course} />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}