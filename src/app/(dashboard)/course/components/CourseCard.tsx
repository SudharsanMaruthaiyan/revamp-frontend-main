"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Briefcase,
  ArrowRight,
  Upload,
  Heart,
  User,
} from "lucide-react";
import type { CourseListItem } from "@/schema/course/course.schema";

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}

// Helper to format large numbers (e.g. 1500 -> 1.5k)
function formatCount(n: number) {
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return n;
}

export default function CourseCard({ course }: { course: CourseListItem }) {
  const rating = course.rating?.course_rating ?? 0;
  const reviews = course.rating?.total_rating ?? 0;

  const trainers = course.trainers || [];
  const trainersCount = course.trainers_count || trainers.length;
  const instructorNames = trainers.length > 0 ? trainers.map((t: any) => t.name).join(", ") : "Instructor Not Assigned";
  const instructorAchievements = trainers.length > 0 ? trainers.map((t: any) => t.role).join(", ") : "TBA";

  // Calculate discount percentage if both prices exist
  const discountPercent =
    course.original_price && course.discount_price
      ? Math.round(
        ((course.original_price - course.discount_price) /
          course.original_price) *
        100
      )
      : null;

  return (
    <div className="w-full max-w-[600px] bg-white rounded-[10px] p-2 border border-[#ECECEC] shadow-card flex flex-col font-poppins transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
      {/* Image Section */}
      <div className="relative">
        <div className="relative h-[240px] rounded-[9px] overflow-hidden bg-gradient-to-br from-[#B44CFF] via-[#C44BFF] to-[#F05DBA]">
          {course.cover_image_url ? (
            <img
              src={course.cover_image_url}
              alt={course.course_name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <>
              {/* Fallback gradients/blobs if no image */}
              <div className="absolute top-[-70px] right-[-70px] w-[220px] h-[220px] bg-white/20 rounded-full blur-3xl" />
              <div className="absolute bottom-[-60px] left-[-60px] w-[180px] h-[180px] bg-white/10 rounded-full blur-3xl" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                <p className="text-[13px] font-semibold opacity-90 uppercase tracking-wide">
                  Mastering {course.category.course_category_name}
                </p>
                <h2 className="text-[28px] leading-[1.1] font-bold tracking-[-0.04em] my-1 uppercase line-clamp-2">
                  {course.course_name}
                </h2>
                <p className="text-[11px] font-bold tracking-[0.2em] opacity-80 mt-2 uppercase">
                  Turn Your Ideas - UI
                </p>
              </div>
            </>
          )}

          {/* Featured Badge */}
          <span className="absolute top-4 left-4 bg-[#f0a440ff] text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-20 shadow-sm">
            FEATURED
          </span>

          {/* Discount Badge */}
          {discountPercent && (
            <span className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md z-20">
              {discountPercent}% OFFER
            </span>
          )}

          {/* Join Us Text */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-white text-[11px] font-medium z-20">
            <span className="drop-shadow-sm">Join us ! To Revamp You</span>
            <Heart className="w-3.5 h-3.5 fill-black text-black drop-shadow-sm" />
          </div>
        </div>

        {/* Floating Rating Pill */}
        <div className="absolute -bottom-4 left-5 bg-white rounded-full px-3.5 py-1.5 shadow-float flex items-center gap-1.5 z-30">
          <div className="flex gap-[1px]">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5 transition-colors",
                  i <= Math.round(rating)
                    ? "fill-[#F1A33C] text-[#F1A33C]"
                    : "fill-[#E5E7EB] text-[#E5E7EB]"
                )}
              />
            ))}
          </div>
          <span className="text-[12px] font-bold text-gray-800">({reviews} Reviews)</span>
        </div>

        {/* Floating Share Button */}
        <button className="absolute -bottom-4 right-5 w-9 h-9 rounded-full bg-white shadow-float flex items-center justify-center z-30 transition-transform hover:scale-105 active:scale-95">
          <Upload className="w-3.5 h-3.5 text-black" />
        </button>
      </div>

      {/* Instructor Info */}
      <div className="flex items-center gap-2 mb-3 px-1 mt-4">
        <div className="flex -space-x-3 overflow-hidden p-1">
          {trainers.length > 0 ? (
            trainers.slice(0, 3).map((trainer: any) => (
              trainer.image_url ? (
                <img
                  key={trainer.trainer_id}
                  src={trainer.image_url}
                  alt={trainer.name}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover bg-gray-100"
                />
              ) : (
                <div key={trainer.trainer_id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                </div>
              )
            ))
          ) : (
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-gray-400 mt-1" />
            </div>
          )}
          {trainersCount > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 ring-2 ring-white text-[10px] font-bold text-gray-600">
              +{trainersCount - 3}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] leading-tight truncate">
            <span className="text-brand font-bold">{instructorNames}</span>{" "}
            {trainers.length > 0 && (
              <span className="text-gray-900 font-medium opacity-80">
                in {instructorAchievements}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Course Title */}
      <h3 className="text-[20px] ml-2 font-bold uppercase leading-[1.2] text-gray-900 line-clamp-2 min-h-[48px] px-1">
        {course.course_name}
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-y-2 ml-2 mt-2 gap-x-2 mb-3 px-1">
        <Info icon={Clock} text={`${course.total_hours || 0} hrs`} />
        <Info icon={Users} text={`${formatCount(course.enrollments_count)} Students`} />
        <Info icon={BookOpen} text={`${course.curriculum_count} Lessons`} />
        <Info icon={Briefcase} text={`${course.projects_count} Projects`} />
      </div>

      {/* Footer / CTA */}
      <div className="mt-auto justify-center flex gap-[100px] px-1 pb-1">
        <div className="h-[38px] bg-[#f0a440ff] rounded-[10px] px-5 flex items-center gap-2.5 shadow-sm min-w-fit">
          {course.original_price && (
            <span className="text-white/70 text-[12px] font-semibold line-through">
              ₹{formatCount(course.original_price)}
            </span>
          )}
          <span className="text-white font-bold text-[16px]">
            ₹{course.discount_price ? formatPrice(course.discount_price) : "Free"}
          </span>
        </div>

        <Link
          href={`/course/${course.course_id}`}
          className="w-[130px] h-[38px] bg-black rounded-[10px] flex items-center justify-center gap-2 text-white text-[12px] font-bold shadow-sm transition-colors hover:bg-gray-900"
        >
          ENROLL NOW
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  text,
}: {
  icon: any;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-full bg-[#FFF4E5] flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-brand" />
      </div>
      <span className="text-[12px] font-medium text-[#444] whitespace-nowrap">{text}</span>
    </div>
  );
}