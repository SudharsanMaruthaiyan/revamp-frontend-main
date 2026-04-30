"use client";

import { useState } from "react";
import { CheckSquare, Award, BadgeCheck, Users, BookOpen, Monitor, User, Quote, ClipboardCheck, Zap } from "lucide-react";
import type { CourseDetail } from "@/schema/course/course.schema";
import Image from "next/image";

const MAX_PREVIEW = 350;

// ─── About Course ────────────────────────────────────────────────────────────

function AboutCourse({ course }: { course: CourseDetail }) {
  const [showMore, setShowMore] = useState(false);
  const description = course.course_info?.about_course ?? "";

  if (!description) return null;

  const isLong = description.length > MAX_PREVIEW;
  const displayDesc = showMore || !isLong ? description : description.slice(0, MAX_PREVIEW) + "...";

  return (
    <div className="space-y-6 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">About Course</h2>
        <div>
          <h3 className="text-base font-bold text-gray-800 uppercase mb-3">
            {course.course_name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-line">
            {displayDesc}
          </p>
        </div>
        {isLong && (
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="text-sm font-semibold text-[#F1A33C] hover:text-[#E0922B] hover:underline"
          >
            {showMore ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Who Should Enroll ────────────────────────────────────────────────────────

function WhoShouldEnroll({ course }: { course: CourseDetail }) {
  const items = course.course_info?.who_should_enroll ?? [];

  if (items.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-bold text-gray-700 uppercase mb-6 tracking-wide">
        WHO SHOULD ENROLL
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-5 h-5 bg-black rounded-[4px] flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-white fill-white" strokeWidth={4} />
              </div>
            </div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Trainer Details ──────────────────────────────────────────────────────────

function TrainerDetails({ course }: { course: CourseDetail }) {
  let trainers = course.course_info?.trainer_details ?? [];

  // Fallback mock data to ensure UI matches design when testing if the backend has no trainers
  if (trainers.length === 0) {
    trainers = [
      {
        trainer_name: "SUGANTH PV",
        trainer_role: "FOUNDER • MENTOR",
        trainer_image_url: "https://placehold.co/100x100/F3F4F6/9CA3AF?text=S",
        trainer_tag: "2.2k+ Sessions",
        trainer_student_count: 2000,
      },
      {
        trainer_name: "VENKATESAN G",
        trainer_role: "PRODUCT DEVELOPER",
        trainer_image_url: "https://placehold.co/100x100/F3F4F6/9CA3AF?text=V",
        trainer_tag: "100+ Projects",
        trainer_student_count: 600,
      },
      {
        trainer_name: "SUDHARSHAN S",
        trainer_role: "FULL STACK DEVELOPER",
        trainer_image_url: "https://placehold.co/100x100/F3F4F6/9CA3AF?text=S",
        trainer_tag: "Developer",
        trainer_student_count: 200,
      },
      {
        trainer_name: "HONEY JOE",
        trainer_role: "FULL STACK DEVELOPER",
        trainer_image_url: "https://placehold.co/100x100/F3F4F6/9CA3AF?text=H",
        trainer_tag: "Developer",
        trainer_student_count: 200,
      },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 mb-8">
        <div className="inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFA500]/10">
            <Zap className="w-4 h-4 text-[#FFA500] fill-current" />
          </div>
          <span className="text-[13px] font-bold text-[#FFA500] tracking-widest uppercase">
            Mentors
          </span>
        </div>
        <h2 className="text-[36px] font-bold text-black leading-tight">
          Trainer{" "}
          <span className="text-[#FFA500] relative inline-block">
            Details
            <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#FFA500] rounded-full" />
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainers.map((t, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col items-center text-center transition-transform hover:-translate-y-1"
          >
            <div className="pt-8 pb-6 px-4 flex flex-col items-center w-full">
              <div className="relative mb-5">
                <div className="w-[100px] h-[100px] rounded-full border-[3px] border-[#FFA500]/20 p-1 flex items-center justify-center bg-white overflow-hidden">
                  {t.trainer_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.trainer_image_url}
                      alt={t.trainer_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400 mt-2" />
                  )}
                </div>
                {/* Quote Badge */}
                <div className="absolute bottom-0 -right-1 bg-[#FFA500] text-white w-9 h-9 rounded-[10px] border-[3px] border-white flex items-center justify-center">
                  <Quote className="w-[14px] h-[14px] fill-current" />
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-black uppercase leading-tight">
                {t.trainer_name}
              </h3>
              <p className="text-[11px] font-bold text-gray-500 mt-1 uppercase tracking-wider">
                {t.trainer_role}
              </p>
            </div>

            <div className="w-full bg-black text-white py-3.5 px-3 mt-auto flex items-center justify-center text-[10px] font-bold uppercase gap-3">
              <div className="flex items-center gap-1.5 text-gray-300">
                <ClipboardCheck className="w-[12px] h-[12px]" />
                <span className="text-white">{t.trainer_tag ?? "Developer"}</span>
              </div>
              <div className="h-3 w-[1px] bg-gray-600" />
              <div className="flex items-center gap-1.5 text-gray-300">
                <Users className="w-[12px] h-[12px]" />
                <span className="text-white">
                  {t.trainer_student_count
                    ? `${t.trainer_student_count >= 1000 ? `${(t.trainer_student_count / 1000).toFixed(1)}k+` : t.trainer_student_count}` 
                    : "200"} Students
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Completion Certification ─────────────────────────────────────────────────

function CompletionCertification({ course }: { course: CourseDetail }) {
  let certificates = course.course_info?.course_certificate_info ?? [];

  // Fallback mock data so the UI is visible if the backend has no certificates for this course
  if (certificates.length === 0) {
    certificates = [
      {
        certificate_name: "FRONTEND CERTIFICATE",
        certificate_tag: "Html - Css - Js - React - Ts - NextJs",
        certificate_is_verified: true,
        certificate_image: "https://placehold.co/400x280/FFFFFF/9CA3AF?text=Certificate",
      },
      {
        certificate_name: "BACKEND CERTIFICATE",
        certificate_tag: "NodeJs - Express - MongoDb - Aws",
        certificate_is_verified: true,
        certificate_image: "https://placehold.co/400x280/FFFFFF/9CA3AF?text=Certificate",
      },
      {
        certificate_name: "FULL STACK CERTIFICATE",
        certificate_tag: "Frontend + Backend",
        certificate_is_verified: true,
        certificate_image: "https://placehold.co/400x280/FFFFFF/9CA3AF?text=Certificate",
      },
      {
        certificate_name: "INTERNSHIP CERTIFICATE",
        certificate_tag: "With Offer Letter",
        certificate_is_verified: true,
        certificate_image: "https://placehold.co/400x280/FFFFFF/9CA3AF?text=Certificate",
      },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 mb-8">
        <div className="inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFA500]/10">
            <Zap className="w-4 h-4 text-[#FFA500] fill-current" />
          </div>
          <span className="text-[13px] font-bold text-[#FFA500] tracking-widest uppercase">
            Training + Internship
          </span>
        </div>
        <h2 className="text-[36px] font-bold text-black leading-tight">
          Completion{" "}
          <span className="text-[#FFA500] relative inline-block">
            Certification
            <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#FFA500] rounded-full" />
          </span>
        </h2>
      </div>

      <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 sm:p-8">
        <h3 className="text-[20px] font-bold text-gray-900 uppercase tracking-wide mb-6">
          YOUR CERTIFICATES
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="flex justify-between items-stretch p-5 rounded-[16px] border border-gray-100 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow"
            >
              <div className="flex flex-col justify-between flex-1 pr-4">
                <div className="flex items-start gap-4">
                  <div className="w-[46px] h-[46px] rounded-full bg-[#FFA500]/10 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#FFA500]" />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0 pt-0.5">
                    <h4 className="font-bold text-[16px] text-gray-900 uppercase tracking-tight">
                      {cert.certificate_name}
                    </h4>
                    <p className="text-[13px] text-gray-400 font-medium">
                      {cert.certificate_tag}
                    </p>
                  </div>
                </div>
                
                <div className="mt-5">
                  {cert.certificate_is_verified !== false ? (
                    <div className="flex items-center gap-1.5">
                      <BadgeCheck className="w-[14px] h-[14px] text-[#22c55e]" />
                      <span className="text-[12px] font-semibold text-[#22c55e] capitalize tracking-wide">
                        Verified
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-semibold text-gray-400 capitalize tracking-wide">
                        Completion
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="shrink-0 flex items-center justify-center">
                {cert.certificate_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cert.certificate_image}
                    alt={cert.certificate_name}
                    className="w-[120px] md:w-[140px] h-auto object-contain shrink-0"
                  />
                ) : (
                  <div className="w-[120px] md:w-[140px] h-[86px] bg-white border border-gray-200 shadow-sm rounded flex items-center justify-center text-[10px] text-gray-300 font-bold select-none shrink-0">
                    CERTIFICATE
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Moto / Quote Section ─────────────────────────────────────────────────────

export function MotoSection({ course }: { course: CourseDetail }) {
  const moto = course.course_info?.course_moto;

  const content = moto?.content ||
    "Learning Full Stack shouldn't be a privilege only for those who can afford ₹40,000+ for courses. That's why we created a training where every student - all background can experience a ₹1 Lakh level course at just ₹4,000.";
  const heading = moto?.main_heading || "💻 Namma Moto - Ellarum Full stack kathukanum 🔥!";

  return (
    <div className="rounded-3xl border-4 border-black bg-white p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-6 left-6 text-6xl font-serif text-black leading-none">&ldquo;</div>
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <p className="text-lg md:text-xl font-medium text-gray-900 max-w-3xl leading-relaxed">
          {content}
        </p>
        <div className="flex items-center gap-2 text-xl md:text-2xl font-bold text-black">
          <span>{heading}</span>
        </div>
      </div>
      {moto?.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={moto.logo}
          alt="Revamp"
          className="absolute bg-black bottom-6 right-6 w-16 h-16 rounded-full object-contain"
        />
      ) : (
        <div className="absolute bottom-6 right-6 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-[8px] font-bold">
          REVAMP
        </div>
      )}
    </div>
  );
}

// ─── CourseInfoTab (public export) ────────────────────────────────────────────

export interface CourseInfoTabProps {
  course: CourseDetail;
}

export function CourseInfoTab({ course }: CourseInfoTabProps) {
  return (
    <div className="space-y-12">
      <AboutCourse course={course} />
      <WhoShouldEnroll course={course} />
      <TrainerDetails course={course} />
      <CompletionCertification course={course} />
    </div>
  );
}
