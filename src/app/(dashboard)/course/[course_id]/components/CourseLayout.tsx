import Link from "next/link";
import { CourseBanner } from "./CourseBanner";
import { CourseHighlights } from "./CourseHighlights";
import { CourseTabs } from "./CourseTabs";
import { CourseSidebar } from "./CourseSidebar";
import { MotoSection } from "./CourseInfoTab";
import type { CourseDetail } from "@/schema/course/course.schema";

export function CourseLayout({ course }: { course: CourseDetail }) {
  const firstBatch = course.course_highlight_info?.batch?.[0];
  const discountPrice =
    firstBatch?.pricing?.discount_price ?? firstBatch?.pricing?.original_price ?? 0;

  return (
    <div className="flex flex-col w-full bg-white">
      <CourseBanner course={course} />

      <div className="w-full mx-auto py-8 px-4 md:px-12 lg:px-16 mb-20 lg:mb-0 max-w-[1440px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left column: title, video, metrics, tabs */}
          <div className="space-y-10 lg:col-span-8">
            <CourseHighlights course={course} />
            <CourseTabs course={course} />
          </div>

          {/* Right column: sticky sidebar */}
          <div className="lg:col-span-4 self-start lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
            <CourseSidebar course={course} />
          </div>
        </div>

        <div className="mt-16">
          <MotoSection course={course} />
        </div>
      </div>

      {/* Mobile Sticky Pay Button Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] lg:hidden z-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Total Price</span>
          <span className="text-xl font-bold text-gray-900">
            ₹{new Intl.NumberFormat("en-IN").format(discountPrice)}
          </span>
        </div>
        <Link
          href={`/course/${course.course_id}/enroll`}
          className="bg-[#F1A33C] text-white px-8 py-3 rounded-xl text-sm shadow-md hover:bg-[#E0922B] transition-colors font-bold"
        >
          PAY NOW
        </Link>
      </div>
    </div>
  );
}
