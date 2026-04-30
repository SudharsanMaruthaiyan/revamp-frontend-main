export type {
  CourseCategory,
  CourseListItem,
  CourseListResponse,
  CourseDetail,
  CourseHighlightBatch,
  TrainerDetail,
  CourseDetailTrainer,
  PaginationCourseQuery,
} from "@/schema/course/course.schema";

export interface BaseApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

