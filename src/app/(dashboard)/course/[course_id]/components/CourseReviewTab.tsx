"use client";

import type { CourseDetail, ReviewItem } from "@/schema/course/course.schema";
import { ArrowUpRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClass = size === "lg" ? "w-7 h-7" : size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className={`${sizeClass} text-[#F1A33C]`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className={`${sizeClass} text-[#F1A33C]`} viewBox="0 0 24 24">
          <defs>
            <linearGradient id="half-star-grad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#half-star-grad)"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className={`${sizeClass} text-[#F1A33C]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#F1A33C"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const CARD_STYLE = {
  border: "1.5px solid #e2e8f0",
  boxShadow: "4px 4px 0px 0px #e2e8f0, 8px 8px 0px 0px #f1f5f9, 0 2px 12px 0 rgba(0,0,0,0.06)",
};

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="bg-white rounded-2xl p-6 transition-shadow" style={CARD_STYLE}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-gray-900 font-bold text-lg shrink-0"
            style={{ border: "2px solid #1a1a1a" }}
          >
            {review.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span className="font-bold text-gray-900 text-base">{review.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <GoogleG className="w-4 h-4" />
          <span className="text-[10px] font-semibold text-gray-500">Google Review&apos;s</span>
        </div>
      </div>
      <div className="mb-4 mt-4">
        <StarRating rating={review.rating} size="md" />
      </div>
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{review.review}</p>
    </div>
  );
}

export function CourseReviewTab({ course }: { course: CourseDetail }) {
  const reviewsSection = course.reviews?.reviews_section;
  const reviews = reviewsSection?.reviews ?? [];
  const googleSummary = reviewsSection?.google_summary;
  const stats = reviewsSection?.stats;

  const averageRating = googleSummary?.rating ?? (
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 4.8
  );

  const summaryDescription =
    "Revamp Academy generally receives positive reviews for its IT Related courses, particularly for its practical approach and mentorship. The academy is also commended for its personalized mentorship, responsive support, and focus on real-world applications, with some mentioning successful outcomes like closed deals after completing the course.";

  return (
    <div className="space-y-6 py-6 bg-gray-50 px-4 md:px-6">
      {/* Section Title */}
      {reviewsSection?.title && (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div className="space-y-4">
            {reviewsSection.badge && (
              <div className="inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFA500]/10">
                  <Zap className="w-4 h-4 text-[#FFA500] fill-current" />
                </div>
                <span className="text-[13px] font-bold text-[#FFA500] tracking-widest uppercase">
                  {reviewsSection.badge}
                </span>
              </div>
            )}
            {(() => {
              const titleStr = reviewsSection.title;
              const titleParts = titleStr.split(" ");
              const firstPart = titleParts[0];
              const secondPart = titleParts.slice(1).join(" ");
              return (
                <h2 className="text-[36px] font-black text-black leading-tight uppercase">
                  {firstPart}{" "}
                  {secondPart && (
                    <span className="text-[#FFA500] relative inline-block">
                      {secondPart}
                      <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#FFA500] rounded-full" />
                    </span>
                  )}
                </h2>
              );
            })()}
          </div>
          {stats && (
            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 lg:gap-4 text-left">
              {stats.reviewed && (
                <div className="bg-black text-white px-5 py-3 rounded-md flex flex-col items-start min-w-[180px] border border-gray-800 shadow-md">
                  <div className="flex items-center justify-between w-full mb-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Reviewed</p>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center ml-4">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <p className="text-[15px] font-bold text-white uppercase tracking-wide">
                    700+ STUDENTS
                  </p>
                </div>
              )}
              {stats.response && (
                <div className="bg-black text-white px-5 py-3 rounded-md flex flex-col items-start min-w-[180px] border border-gray-800 shadow-md">
                  <div className="flex items-center justify-between w-full mb-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Response</p>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center ml-4">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <p className="text-[15px] font-bold text-white uppercase tracking-wide">
                    98% POSITIVE
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary Row: Rating Card + Quote Card */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* Rating Card */}
        <div className="rounded-[12px] overflow-hidden shrink-0 min-w-[260px] border border-gray-200 shadow-sm flex flex-col">
          <div className="bg-[#4285F4] flex-1 flex items-center justify-center gap-3 px-6 py-6">
            <span className="text-white font-bold text-5xl tracking-tight leading-none">
              {averageRating.toFixed(1)}
            </span>
            <StarRating rating={averageRating} size="md" />
          </div>
          <div className="bg-white flex items-center justify-center gap-3 px-6 py-4 border-t border-gray-100">
            <GoogleG className="w-8 h-8" />
            <div className="text-left">
              <p className="text-[16px] font-bold text-gray-800 leading-tight mb-0.5">Google Reviews</p>
              <p className="text-[12px] text-gray-500 leading-tight">Best Rated Academy</p>
            </div>
          </div>
        </div>

        {/* Quote Card */}
        <div className="flex-1 bg-white rounded-[12px] border border-gray-200 shadow-sm p-8 relative flex flex-col items-center justify-center min-h-[160px]">
          {/* Quote Mark */}
          <div className="absolute top-6 left-6">
            <span className="text-black text-4xl font-serif font-bold leading-none select-none">&ldquo;</span>
          </div>

          {/* Centered Text */}
          <div className="px-10 md:px-16 text-center w-full">
            <p className="text-black text-[13px] md:text-[14px] leading-[1.6] font-medium">
              {summaryDescription}
            </p>
          </div>

          {/* GOOGLE Text */}
          <div className="absolute bottom-6 left-6">
            <p className="text-[12px] font-bold text-black uppercase tracking-widest">Google</p>
          </div>

          {/* Google Icon Badge */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
            <div className="w-11 h-11 bg-white border border-gray-200 rounded-[10px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <GoogleG className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...reviews]
            .sort((a, b) => a.order - b.order)
            .map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm font-medium">No reviews yet. Be the first to review!</p>
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-center pt-4 pb-2">
        <Button className="bg-[#F1A33C] hover:bg-[#E0922B] text-white px-10 py-6 rounded-full flex items-center gap-3 text-sm font-bold uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">
          Read Full Reviews
          <div className="bg-white/25 p-1.5 rounded-full">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </Button>
      </div>
    </div>
  );
}
