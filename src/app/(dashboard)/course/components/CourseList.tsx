"use client";
import { useState, useEffect } from "react";
import { useCoursesQuery } from "@/modules/course/queries";
import CourseCard from "./CourseCard";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";
import { parseApiError } from "@/lib/parse-api-errors";
import { Loader2, AlertCircle } from "lucide-react";

import { CardLoader } from "@/components/ui/Loader";

const PAGE_SIZE = 12;

export function CourseList({
  categoryId,
  searchTerm,
}: {
  categoryId?: string;
  searchTerm: string;
}) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [categoryId, searchTerm]);

  const { data, isLoading, error } = useCoursesQuery({
    page,
    limit: PAGE_SIZE,
    category_id: categoryId,
    q: searchTerm.trim() || undefined,
    is_public: true,
  });

  useEffect(() => {
    if (error) toast.error(parseApiError(error));
  }, [error]);

  if (isLoading) {
    return (
      <div className="grid gap-[10px] justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-full mx-auto px-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CardLoader key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
        <p className="text-lg font-semibold text-gray-900">Failed to load courses</p>
      </div>
    );
  }

  const courses = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const pagination = meta?.pagination;
  const totalPages = pagination?.total_pages ?? 1;
  const totalCourses = pagination?.total_courses ?? 0;
  const currentPage = pagination?.current_page ?? 1;

  return (
    <div className="space-y-1">
      {courses.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-600 font-bold">No courses found</p>
        </div>
      ) : (
        <>
          <div className="grid gap-[10px] justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-full mx-auto px-4">
            {courses.map((course: any) => (
              <CourseCard key={course.course_id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center py-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
                showPrevNext
                maxVisible={5}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}