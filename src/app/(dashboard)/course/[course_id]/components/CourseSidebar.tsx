"use client";

import type { CourseDetail } from "@/schema/course/course.schema";
import { CoursePricingCard } from "./CoursePricingCard";
import Image from "next/image";

export function CourseSidebar({ course }: { course: CourseDetail }) {
  const coverImageUrl = course.course_card_details?.cover_image_url;

  return (
    <div className="space-y-6 lg:space-y-3 max-w-[420px] w-full">
      {/* Single unified card for the entire sidebar */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Cover Image */}
        {/* {coverImageUrl && (
          <div className="w-full overflow-hidden">
            <Image
              src={coverImageUrl}
              alt={course.course_name ?? "Course Cover"}
              width={420}
              height={236}
              className="w-full object-cover"
              priority
            />
          </div>
        )} */}

      </div>
      {/* Pricing Card content below the image */}
      <div className="p-4 md:p-5">
        <CoursePricingCard course={course} />
      </div>
    </div>
  );
}