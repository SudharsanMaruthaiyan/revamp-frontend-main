"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BarChart2,
  Calendar,
  Award,
  Clock,
  BookOpen,
  RefreshCw,
  Map,
  Radio,
  GraduationCap,
  ClipboardCheck,
  Star,
  Users,
  FileText,
  Timer,
  Mic,
  Heart,
} from "lucide-react";
import type { CourseDetail } from "@/schema/course/course.schema";
import { Button } from "@/components/ui/button";

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  star: Star,
  users: Users,
  certificate: Award,
  notes: FileText,
  calendar: Calendar,
  microphone: Mic,
  clock: Clock,
  timer: Timer,
  assignment: ClipboardCheck,
  roadmap: Map,
  bar_chart: BarChart2,
  radio: Radio,
  graduation: GraduationCap,
  refresh: RefreshCw,
  book: BookOpen,
};

function resolveIcon(iconKey: string) {
  const lower = iconKey.toLowerCase();
  return ICON_MAP[lower] ?? BarChart2;
}

const SOCIAL_LOGOS: Record<string, { src: string; shadow: string }> = {
  instagram: {
    src: "https://utfs.io/f/Rkxh5ZPHK3aduNBZ8efJeZy0PKRWst7pXE52kGrzbvFNQ4dY",
    shadow: "shadow-[0_4px_10px_rgba(225,48,108,0.2)]",
  },
  linkedin: {
    src: "https://utfs.io/f/Rkxh5ZPHK3adgOE0PasTlA9Fgo72zi4eWH1JIcZyqRGahPMO",
    shadow: "shadow-[0_4px_10px_rgba(0,119,181,0.2)]",
  },
  google: {
    src: "https://utfs.io/f/Rkxh5ZPHK3adKrFsa4YxgZfQB2icuJwVy9zj4NGT8aIpXhSr",
    shadow: "shadow-[0_4px_10px_rgba(234,67,53,0.2)]",
  },
  whatsapp: {
    src: "https://utfs.io/f/Rkxh5ZPHK3admQcB8ZiajutzRpKPfd3nTLv7cDIUQNgF20AX",
    shadow: "shadow-[0_4px_10px_rgba(37,211,102,0.2)]",
  },
};

function SocialIcon({ type, url }: { type: string; url: string }) {
  const lower = type.toLowerCase();
  const logo = SOCIAL_LOGOS[lower];

  if (!logo) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-[56px] h-[56px] rounded-[14px] flex items-center justify-center transition-transform hover:-translate-y-1 bg-white ${logo.shadow}`}
    >
      <Image
        src={logo.src}
        alt={lower}
        width={56}
        height={56}
        className="w-full h-full object-contain rounded-[14px]"
      />
    </a>
  );
}

export function CoursePricingCard({ course }: { course: CourseDetail }) {
  const firstBatch = course.course_highlight_info?.batch?.[0];
  const price = firstBatch?.pricing?.discount_price ?? firstBatch?.pricing?.original_price;
  const originalPrice = firstBatch?.pricing?.original_price;
  const socialLinks = course.course_card_details?.social_media_links ?? [];
  const courseDetails = course.course_card_details?.course_details ?? [];

  const updatedAt = course.updated_at
    ? new Date(course.updated_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="w-full bg-white rounded-[12px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#ECECEC] flex flex-col font-poppins">
      
      {/* Top Banner Image Section */}
      <div className="relative w-full h-[180px] rounded-[8px] overflow-hidden mb-6 bg-gradient-to-br from-[#2b7aff] to-[#1e5bbd]">
        {course.cover_image_url ? (
          <img
            src={course.cover_image_url}
            alt={course.course_name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-center px-6 py-4">
            <div className="absolute top-3 right-3 bg-white text-[#2b7aff] text-[8px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
              TRENDING <span className="text-[10px]">🔥</span>
            </div>
            <p className="text-white/90 text-[11px] font-medium mb-1">A Complete Guide for</p>
            <h3 className="text-white text-[22px] font-bold leading-[1.1] w-[65%] uppercase">
              {course.course_name}
            </h3>
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-white text-[9px] font-medium">
              <span>Join us ! To Revamp You</span>
              <Heart className="w-3 h-3 fill-black text-black" />
            </div>
          </div>
        )}
      </div>

      {/* Details Section */}
      {courseDetails.length > 0 && (
        <div className="mb-6">
          <h3 className="text-[14px] font-bold text-black mb-3 uppercase tracking-tighter">
            DETAILS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2.5">
            {courseDetails.map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              const label = item.icon === "calendar" && updatedAt
                ? `${updatedAt} Last Updated`
                : item.content;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className="w-[14px] h-[14px] text-[#FFA500] shrink-0" strokeWidth={2.5} />
                  <span className="text-[8px] leading-tight font-bold text-black uppercase">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Gray Blocks (Trainers / Placeholders) */}
      <div className="flex justify-between gap-3 mb-8">
        {[0, 1, 2].map((idx) => {
          const trainer = course.trainers?.[idx];
          return trainer?.image_url ? (
            <img key={idx} src={trainer.image_url} alt={trainer.name} className="flex-1 aspect-square rounded-[8px] object-cover bg-[#D9D9D9]" />
          ) : (
            <div key={idx} className="flex-1 aspect-square rounded-[8px] bg-[#D9D9D9]" />
          );
        })}
      </div>

      {/* Contact Section */}
      {socialLinks.length > 0 && (
        <div className="text-center mb-6">
          <p className="text-[10px] font-bold tracking-widest text-[#FFA500] uppercase mb-1">
            INTERESTED ?
          </p>
          <h3 className="text-[20px] font-bold text-black uppercase mb-4 leading-none tracking-tight">
            CONTACT <span className="text-[#FFA500] border-b-[2.5px] border-[#FFA500] pb-0.5">US !</span>
          </h3>

          <div className="flex items-center justify-center gap-4 mb-2">
            {socialLinks.map((link, i) => (
              <SocialIcon key={i} type={link.social_media_type} url={link.social_url} />
            ))}
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {price !== undefined && price !== null && (
        <div className="mt-auto pt-2">
          <div className="flex flex-row items-end justify-between mb-4 px-1 gap-2">
            {/* Instalment label */}
            <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap mb-1">
              {firstBatch?.pricing?.is_instalment ? `Can Pay by ${firstBatch.pricing.no_instalment ?? 2} Instalment` : ""}
            </span>
            
            {/* Prices */}
            <div className="flex items-center gap-2 shrink-0">
              {originalPrice !== undefined && originalPrice !== null && originalPrice !== price && (
                <span className="text-[16px] font-bold line-through text-black decoration-black decoration-[1.5px] mb-1">
                  {originalPrice}
                </span>
              )}
              <span className="text-[32px] font-bold text-black tracking-tight leading-none">
                ₹ {formatPrice(price)}/-
              </span>
            </div>
          </div>

          <Button
            className="w-full h-11 rounded-[6px] bg-[#FFA500] hover:bg-[#e69500] text-white text-[12px] font-bold uppercase tracking-wide transition-all"
            asChild
          >
            <Link href={`/course/${course.course_id}/enroll`}>PAY NOW</Link>
          </Button>
        </div>
      )}
    </div>
  );
}