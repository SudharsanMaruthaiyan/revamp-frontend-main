"use client";

import { Star, Clock, Calendar, TrendingUp, GraduationCap, ArrowUpRight } from "lucide-react";
import type { CourseDetail } from "@/schema/course/course.schema";
import Image from "next/image";

// ─── TitleRating ────────────────────────────────────────────────────────────

function TitleRating({ course }: { course: CourseDetail }) {
  const firstBatch = course.course_highlight_info?.batch?.[0];
  const rating = firstBatch?.course_rating ?? 0;
  const ratingCount = firstBatch?.course_rating_count ?? 0;
  const courseDuration = firstBatch?.course_duration ?? "";
  const internshipDuration = firstBatch?.internship_duration ?? "";

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const summaryItems: React.ReactNode[] = [];

  if (rating > 0) {
    summaryItems.push(
      <div key="stars" className="flex items-center gap-0.5">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star key={`full-${i}`} className="h-4 w-4 fill-[#F1A33C] text-[#F1A33C]" />
          ))}
        {hasHalfStar && (
          <div className="relative" key="half">
            <Star className="h-4 w-4 text-gray-300 fill-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="h-4 w-4 text-[#F1A33C] fill-[#F1A33C]" />
            </div>
          </div>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 fill-gray-200 text-gray-200" />
          ))}
      </div>
    );
  }
  const actualReviewCount = Math.max(ratingCount, course.reviews?.reviews_section?.reviews?.length || 0);

  if (actualReviewCount > 0) {
    summaryItems.push(<span key="reviews">{actualReviewCount}+ Reviews</span>);
  } else if ((course.total_enrollment_count ?? 0) > 0) {
    summaryItems.push(<span key="reviews">{course.total_enrollment_count}+ Students</span>);
  } else {
    summaryItems.push(<span key="reviews">0 Reviews</span>);
  }

  if (courseDuration) {
    summaryItems.push(<span key="duration">{courseDuration} Training</span>);
  }

  if (internshipDuration) {
    summaryItems.push(<span key="internship">{internshipDuration} Internship</span>);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-[32px] font-bold tracking-tight text-gray-900 leading-tight">
        {course.course_name.toUpperCase()}
      </h1>

      {summaryItems.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] md:text-[15px] text-gray-800 font-medium">
          {summaryItems.reduce<React.ReactNode[]>((acc, item, i) => {
            if (i > 0) {
              acc.push(
                <span key={`sep-${i}`} className="text-gray-300 font-normal">
                  |
                </span>
              );
            }
            acc.push(item);
            return acc;
          }, [])}
        </div>
      )}
    </div>
  );
}

// ─── VideoPlayer ─────────────────────────────────────────────────────────────

function isYoutubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be|youtube-nocookie\.com/i.test(url);
}

function getYoutubeEmbedUrl(url: string): string {
  const shortsMatch = url.match(/\/shorts\/([^/?#&]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

  const embedMatch = url.match(/\/embed\/([^/?#&]+)/);
  if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}`;

  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
  return watchMatch ? `https://www.youtube.com/embed/${watchMatch[1]}` : url;
}

function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)$/i.test(url) || url.includes("utfs.io");
}

function VideoPlayer({ course }: { course: CourseDetail }) {
  const url = course.course_highlight_info?.intro_video_url;
  const coverImage = course.course_card_details?.cover_image_url;

  if (!url) return null;

  const embedUrl = isYoutubeUrl(url) ? getYoutubeEmbedUrl(url) : null;
  const isDirectVideo = isVideoFile(url);

  return (
    <div className="aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-sm">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={course.course_name}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : isDirectVideo ? (
        <video
          src={url}
          controls
          className="w-full h-full object-contain bg-black"
          poster={coverImage || undefined}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full relative group"
        >
          {coverImage && (
            <Image
              src={coverImage}
              alt={course.course_name}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
            <span className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-lg">
              Watch intro
            </span>
          </div>
        </a>
      )}
    </div>
  );
}

// ─── KeyMetrics ───────────────────────────────────────────────────────────────

function formatBatchDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }).toUpperCase();
    const suffix = ["th", "st", "nd", "rd"];
    const v = day % 100;
    const ordinal = day + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
    return `${ordinal} ${month}`;
  } catch {
    return "";
  }
}

/** e.g. "8:15 PM - 9:45 PM (IST)" → "8:15 - 9:45pm" */
function formatCourseTimings(timings?: string | null): string {
  if (!timings) return "";
  const match = timings.match(/(\d{1,2}:\d{2})\s*(?:AM|PM)?\s*[-–—]\s*(\d{1,2}:\d{2})\s*(AM|PM)/i);
  if (match) {
    const [, start, end, period] = match;
    return `${start} - ${end}${period.toLowerCase()}`;
  }
  return timings;
}

function KeyMetrics({ course }: { course: CourseDetail }) {
  const firstBatch = course.course_highlight_info?.batch?.[0];

  const metrics = [
    { label: "DURATION", value: firstBatch?.course_duration || "—", icon: TrendingUp },
    { label: "START DATE", value: formatBatchDate(firstBatch?.start_date), icon: Calendar },
    { label: "TIMINGS", value: formatCourseTimings(firstBatch?.course_timings), icon: Clock },
    { label: "INTERNSHIP", value: firstBatch?.internship_duration || "—", icon: GraduationCap },
  ];

  const visibleMetrics = metrics.filter((m) => m.value && m.value !== "—" && m.value !== "");

  if (visibleMetrics.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[16.13px] w-full max-w-[1058.75px]">
      {visibleMetrics.map((m, i) => (
        <div
          key={i}
          className="bg-black text-white px-[25.01px] py-[19.36px] rounded-[6.45px] flex flex-col justify-between h-[98.21px] gap-[6.45px] relative overflow-hidden group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[15px] uppercase text-white">
              {m.label}
            </span>
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowUpRight className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div className="text-base md:text-[20px] tracking-tight uppercase leading-[29.04px] h-[29.04px] overflow-hidden whitespace-nowrap">
            {m.value}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── CourseHighlights (public export) ────────────────────────────────────────

export function CourseHighlights({ course }: { course: CourseDetail }) {
  return (
    <div className="space-y-8">
      <TitleRating course={course} />
      <VideoPlayer course={course} />
      <KeyMetrics course={course} />
    </div>
  );
}