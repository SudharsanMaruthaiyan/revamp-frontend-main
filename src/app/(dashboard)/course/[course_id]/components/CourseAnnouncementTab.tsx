"use client";

import { MapPin, ArrowRight } from "lucide-react";
import type { CourseDetail } from "@/schema/course/course.schema";

const upcomingOpportunities = [
  {
    month: "June",
    day: "10",
    year: "24",
    image: "https://ik.imagekit.io/jjyo3gsee/Insperation%20Image/Opportunity/UpImg1.jpg?updatedAt=1728197700241",
    tag: "Internship",
    title: "Online Training + Internship"
  },
  {
    month: "June",
    day: "15",
    year: "24",
    image: "https://ik.imagekit.io/jjyo3gsee/Insperation%20Image/Opportunity/UpImg2.jpg?updatedAt=1728197700247",
    tag: "Internship",
    title: "Online Training + Internship"
  },
  {
    month: "June",
    day: "16",
    year: "24",
    image: "https://ik.imagekit.io/jjyo3gsee/Insperation%20Image/Opportunity/UpImg3.jpg?updatedAt=1728197700233",
    tag: "Internship",
    title: "Online Training + Internship"
  },
  {
    month: "June",
    day: "25",
    year: "24",
    image: "https://ik.imagekit.io/jjyo3gsee/Insperation%20Image/Opportunity/UpImg4.jpg?updatedAt=1728197700379",
    tag: "Internship",
    title: "Online Training + Internship"
  }
];

export function CourseAnnouncementTab({ course }: { course: CourseDetail }) {
  return (
    <div className="w-full pt-4 pb-12">
      <div className="grid grid-cols-1 gap-y-6">
        {upcomingOpportunities.map((opp, idx) => (
          <div key={idx} className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex md:items-center p-5 gap-6 md:gap-8 flex-col sm:flex-row">
              {/* Left Side: Date and Image */}
              <div className="flex items-center gap-6 md:gap-8 shrink-0">
                <div className="flex flex-col items-center justify-center min-w-[60px]">
                  <h1 className="text-[17px] text-slate-500">{opp.month}</h1>
                  <p className="text-[38px] border-b border-gray-300 w-[80%] text-center font-normal text-gray-900 leading-[1.1] pb-1 mb-1">
                    {opp.day}
                  </p>
                  <p className="text-[17px] text-slate-500">{opp.year}</p>
                </div>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={opp.image} alt={opp.title} className="rounded-full w-[100px] h-[100px] object-cover" />
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="flex flex-col justify-center flex-1 py-2 pl-2 sm:pl-0">
                <p className="flex items-center text-[15px] text-slate-500 gap-2 font-medium mb-1">
                  <MapPin className="w-5 h-5" fill="#14C88C" color="white" strokeWidth={2} />
                  {opp.tag}
                </p>
                <h1 className="lg:text-[26px] text-xl font-bold text-gray-900 pb-3 tracking-tight">
                  {opp.title}
                </h1>
                <div className="flex items-center gap-1.5 cursor-pointer w-fit group">
                  <button className="text-[#2682F9] font-semibold text-[15px] group-hover:underline">
                    View Details
                  </button>
                  <ArrowRight className="w-4 h-4 text-[#2682F9]" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
