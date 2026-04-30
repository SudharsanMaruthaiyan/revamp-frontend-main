import type { BaseApiResponse } from "@/types/course.types";
import type { CourseListResponse, CourseDetail } from "@/schema/course/course.schema";
import { axiosInstance } from "@/lib/axios-instance";

const COURSE_BASE = "/course";

export async function getCoursesApi(params: {
  q?: string;
  category_id?: string;
  is_public?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}): Promise<BaseApiResponse<CourseListResponse>> {
  const searchParams = new URLSearchParams();
  // Always send page and limit so backend never uses its default (e.g. 10)
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 50));
  if (params.q) searchParams.set("q", params.q);
  if (params.category_id) searchParams.set("category_id", params.category_id);
  if (params.is_public !== undefined) searchParams.set("is_public", String(params.is_public));
  if (params.sort_by) searchParams.set("sort_by", params.sort_by);
  if (params.sort_order) searchParams.set("sort_order", params.sort_order);

  const url = `${COURSE_BASE}?${searchParams.toString()}`;
  const res = await axiosInstance.get<BaseApiResponse<CourseListResponse>>(url);
  return res.data;
}

export async function getCourseByIdApi(courseId: string): Promise<BaseApiResponse<CourseDetail>> {
  const res = await axiosInstance.get<BaseApiResponse<CourseDetail>>(`${COURSE_BASE}/${courseId}`);
  return res.data;
}
