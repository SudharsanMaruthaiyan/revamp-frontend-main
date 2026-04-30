import type { CourseDetail } from "@/schema/course/course.schema";

/** Extract structured content from the new API response shape */
export function parseCourseDetailContent(course: CourseDetail) {
  const info = course.course_info;
  const batch = course.course_highlight_info?.batch?.[0];

  const certificates =
    info?.course_certificate_info?.map((c) => ({
      type: c.certificate_name,
      desc: c.certificate_tag,
      verified: c.certificate_is_verified !== false,
      previewImageUrl: c.certificate_image ?? null,
    })) ?? [];

  return {
    description: info?.about_course ?? null,
    whoShouldEnroll: info?.who_should_enroll ?? [],
    certificates,
    courseMoto: info?.course_moto ?? null,
    requirements: [] as string[],
    audience: [] as string[],
    tags: [] as string[],
    // kept for any legacy call-sites
    materialsIncludes: ["Full lifetime access", "Certificate of Completion"],
    certificationText:
      "Add this certificate to your resume to demonstrate your skills & increase your chances of getting noticed.",
    certificationImageUrl: null as string | null,
    courseDuration: batch?.course_duration ?? course.course_highlight_info?.batch?.[0]?.course_duration ?? null,
    internshipDuration: batch?.internship_duration ?? null,
  };
}
