import { z } from "zod";

// ─── Category (from backend) ───────────────────────────────────────────────
export const courseCategorySchema = z.object({
  course_category_id: z.string(),
  course_category_name: z.string(),
  course_category_slug: z.string(),
});

// ─── List item (GET /course response item) ────────────────────────────────
export const courseListTrainerSchema = z.object({
  trainer_id: z.string(),
  name: z.string(),
  role: z.string(),
  student_count: z.number().optional(),
  tag: z.string().nullable().optional(),
});

export const courseListItemSchema = z.object({
  course_id: z.string(),
  course_name: z.string(),
  rating: z.object({
    course_rating: z.number().nullable(),
    total_rating: z.number(),
  }),
  cover_image_url: z.string().nullable(),
  total_hours: z.number().nullable(),
  category: courseCategorySchema,
  enrollments_count: z.number(),
  curriculum_count: z.number(),
  projects_count: z.number(),
  original_price: z.number().nullable(),
  discount_price: z.number().nullable(),
  trainers: z.array(courseListTrainerSchema).optional(),
  trainers_count: z.number().optional(),
});

// ─── List response (GET /course) ───────────────────────────────────────────
export const courseListResponseSchema = z.object({
  data: z.array(courseListItemSchema),
  meta: z.object({
    pagination: z.object({
      total_courses: z.number(),
      limit: z.number(),
      current_page: z.number(),
      total_pages: z.number(),
    }),
  }),
});

// ─── Batch pricing ──────────────────────────────────────────────────────────
export const batchPricingSchema = z.object({
  original_price: z.number(),
  discount_price: z.number(),
  is_instalment: z.boolean().optional(),
  no_instalment: z.number().optional(),
});

// ─── Batch (from course_highlight_info.batch[]) ────────────────────────────
export const courseHighlightBatchSchema = z.object({
  batch_id: z.string(),
  batch_name: z.string(),
  course_duration: z.string(),
  internship_duration: z.string().nullable().optional(),
  course_rating: z.number().nullable().optional(),
  course_rating_count: z.number().optional(),
  pricing: batchPricingSchema,
  start_date: z.string(),
  course_timings: z.string(),
});

// ─── Highlight info ────────────────────────────────────────────────────────
export const courseHighlightInfoSchema = z.object({
  intro_video_url: z.string().nullable().optional(),
  batch: z.array(courseHighlightBatchSchema),
});

// ─── Trainer details (in course_info) ─────────────────────────────────────
export const trainerDetailSchema = z.object({
  trainer_name: z.string(),
  trainer_role: z.string(),
  trainer_student_count: z.number().optional(),
  trainer_tag: z.string().nullable().optional(),
  trainer_image_url: z.string().nullable().optional(),
});

// ─── Certificate info ──────────────────────────────────────────────────────
export const certificateInfoSchema = z.object({
  certificate_name: z.string(),
  certificate_tag: z.string(),
  certificate_image: z.string().nullable().optional(),
  certificate_is_verified: z.boolean().optional(),
});

// ─── Course moto ───────────────────────────────────────────────────────────
export const courseMotoSchema = z.object({
  logo: z.string().nullable().optional(),
  content: z.string(),
  main_heading: z.string(),
});

// ─── Course info ───────────────────────────────────────────────────────────
export const courseInfoSchema = z.object({
  about_course: z.string(),
  who_should_enroll: z.array(z.string()),
  trainer_details: z.array(trainerDetailSchema),
  course_certificate_info: z.array(certificateInfoSchema),
  course_moto: courseMotoSchema.optional(),
});

// ─── Course card detail item ───────────────────────────────────────────────
export const courseCardDetailItemSchema = z.object({
  icon: z.string(),
  content: z.string(),
});

// ─── Social media link ─────────────────────────────────────────────────────
export const socialMediaLinkSchema = z.object({
  social_url: z.string(),
  social_media_type: z.string(),
});

// ─── Course card details ───────────────────────────────────────────────────
export const courseCardDetailsSchema = z.object({
  cover_image_url: z.string().nullable().optional(),
  course_details: z.array(courseCardDetailItemSchema),
  social_media_links: z.array(socialMediaLinkSchema),
});

// ─── Review item (inside reviews_section.reviews) ─────────────────────────
export const reviewItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.number(),
  review: z.string(),
  order: z.number(),
});

// ─── Google summary ────────────────────────────────────────────────────────
export const googleSummarySchema = z.object({
  rating: z.number(),
  platform: z.string(),
  description: z.string(),
});

// ─── Reviews section ───────────────────────────────────────────────────────
export const reviewsSectionSchema = z.object({
  title: z.string(),
  badge: z.string().optional(),
  stats: z
    .object({
      reviewed: z.string().optional(),
      response: z.string().optional(),
    })
    .optional(),
  google_summary: googleSummarySchema.optional(),
  reviews: z.array(reviewItemSchema),
});

// ─── Reviews wrapper ───────────────────────────────────────────────────────
export const courseReviewsSchema = z.object({
  reviews_section: reviewsSectionSchema,
});

// ─── Announcement item ─────────────────────────────────────────────────────
export const announcementItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  created_at: z.string().optional(),
});

// ─── Course Banner ─────────────────────────────────────────────────────────
export const courseBannerImageSchema = z.object({
  course_banner_image_id: z.string(),
  platform: z.string(),
  type: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const courseBannerSchema = z.object({
  course_banner_id: z.string(),
  course_banner_name: z.string(),
  description: z.string().nullable().optional(),
  priority: z.number().optional(),
  images: z.array(courseBannerImageSchema),
});

// ─── Course detail (GET /web/course/:id) ───────────────────────────────────
export const courseDetailSchema = z.object({
  course_id: z.string(),
  course_slug: z.string(),
  course_name: z.string(),
  course_highlight_info: courseHighlightInfoSchema,
  course_info: courseInfoSchema,
  course_card_details: courseCardDetailsSchema,
  course_banners: z.array(courseBannerSchema).optional(),
  curriculum: z.unknown().nullable(),
  reviews: courseReviewsSchema.nullable().optional(),
  projects: z.unknown().nullable(),
  announcement: z.array(z.unknown()).optional(),
  total_enrollment_count: z.number().optional(),
  is_public: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// ─── Query params (list courses) ──────────────────────────────────────────
export const paginationCourseQuerySchema = z.object({
  q: z.string().optional(),
  category_id: z.string().optional(),
  is_public: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
  sort_by: z.string().optional(),
  sort_order: z.enum(["asc", "desc"]).optional(),
});

// ─── Inferred types ──────────────────────────────────────────────────────
export type CourseCategory = z.infer<typeof courseCategorySchema>;
export type CourseListItem = z.infer<typeof courseListItemSchema>;
export type CourseListResponse = z.infer<typeof courseListResponseSchema>;
export type CourseHighlightBatch = z.infer<typeof courseHighlightBatchSchema>;
export type TrainerDetail = z.infer<typeof trainerDetailSchema>;
export type CertificateInfo = z.infer<typeof certificateInfoSchema>;
export type ReviewItem = z.infer<typeof reviewItemSchema>;
export type CourseDetail = z.infer<typeof courseDetailSchema>;
export type PaginationCourseQuery = z.infer<typeof paginationCourseQuerySchema>;

// ─── Legacy aliases (kept for backward compat) ────────────────────────────
export type CourseDetailTrainer = TrainerDetail;
export type CourseReview = ReviewItem;
