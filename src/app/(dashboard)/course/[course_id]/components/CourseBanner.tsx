"use client";

import type { CourseDetail } from "@/schema/course/course.schema";
import Image from "next/image";

export function CourseBanner({ course }: { course: CourseDetail }) {
  const banner = course.course_banners?.[0];
  const largeBanner = banner?.images.find((img) => img.type === "LARGE");
  const smallBanner = banner?.images.find((img) => img.type === "SMALL");

  if (!largeBanner && !smallBanner) return null;

  return (
    <div className="relative w-full overflow-hidden bg-black min-h-[150px]">
      {/* Large Screen Banner */}
      {largeBanner && (
        <div className="hidden md:block w-full">
          <Image
            src={largeBanner.url}
            alt={course.course_name}
            width={1905}
            height={352}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Small Screen Banner */}
      {smallBanner && (
        <div className="block md:hidden w-full">
          <Image
            src={smallBanner.url}
            alt={course.course_name}
            width={1414}
            height={795}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}
