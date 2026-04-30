"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useCourseByIdQuery } from "@/modules/course/queries";
import { parseApiError } from "@/lib/parse-api-errors";
import { CourseLayout } from "./components/CourseLayout";
import { CourseNavbar } from "./components/CourseNavbar";
import { PageLoader } from "@/components/ui/Loader";

export default function CourseByIdPage() {
  const params = useParams();
  const courseId = params?.course_id as string | undefined;
  const { data: course, isLoading, error } = useCourseByIdQuery(courseId ?? null);

  useEffect(() => {
    if (error) toast.error(parseApiError(error));
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-8">
          <PageLoader />
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-12 text-center text-gray-600">
          Course not found. Check the notification for details.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CourseNavbar courseName={course.course_name} />
      <CourseLayout course={course} />
    </div>
  );
}
