"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getCoursesApi, getCourseByIdApi } from "./api";
import type { PaginationCourseQuery, CourseCategory } from "@/schema/course/course.schema";

export const courseKeys = {
  all: ["course"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (params: PaginationCourseQuery) => [...courseKeys.lists(), params] as const,
  categoriesForTabs: () => [...courseKeys.all, "categories-for-tabs"] as const,
  details: () => [...courseKeys.all, "detail"] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
};

export function useCoursesQuery(params: PaginationCourseQuery = { page: 1, limit: 50 }) {
  return useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () =>
      getCoursesApi({
        page: params.page,
        limit: params.limit,
        q: params.q,
        category_id: params.category_id,
        is_public: params.is_public,
        sort_by: params.sort_by,
        sort_order: params.sort_order,
      }),
    });
}

/** Fetch unique categories for tabs. */
const PER_PAGE = 50;

export function useCourseCategoriesForTabs() {
  return useQuery({
    queryKey: courseKeys.categoriesForTabs(),
    queryFn: async () => {
      const first = await getCoursesApi({
        page: 1,
        limit: PER_PAGE,
        is_public: true,
      });
      const meta = first.data?.meta;
      const totalPages = meta?.pagination?.total_pages ?? 1;
      let allCourses = first.data?.data ?? [];

      if (totalPages > 1) {
        const rest = await Promise.all(
          Array.from({ length: totalPages - 1 }, (_, i) =>
            getCoursesApi({
              page: i + 2,
              limit: PER_PAGE,
              is_public: true,
            })
          )
        );
        for (const res of rest) {
          allCourses = allCourses.concat(res.data?.data ?? []);
        }
      }

      const seen = new Set<string>();
      const categories: CourseCategory[] = [];
      for (const c of allCourses) {
        const id = c.category.course_category_id;
        if (!seen.has(id)) {
          seen.add(id);
          categories.push(c.category);
        }
      }
      return categories;
    },
  });
}

const COURSES_PAGE_SIZE = 12;

export function useCoursesInfiniteQuery(params: Omit<PaginationCourseQuery, "page"> & { pageSize?: number }) {
  const pageSize = params.pageSize ?? COURSES_PAGE_SIZE;
  return useInfiniteQuery({
    queryKey: [...courseKeys.lists(), { ...params, pageSize }] as const,
    queryFn: ({ pageParam }) =>
      getCoursesApi({
        page: pageParam as number,
        limit: pageSize,
        q: params.q,
        category_id: params.category_id,
        is_public: params.is_public,
        sort_by: params.sort_by,
        sort_order: params.sort_order,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages) => {
      const meta = lastPage?.data?.meta;
      if (!meta) return undefined;
      const { current_page, total_pages } = meta.pagination;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
    });

}

export function useCourseByIdQuery(courseId: string | null) {
  return useQuery({
    queryKey: courseKeys.detail(courseId ?? ""),
    queryFn: () => getCourseByIdApi(courseId!).then((r) => r.data),
    enabled: !!courseId,
  });
}