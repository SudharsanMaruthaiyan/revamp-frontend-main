import { useState } from "react";
import type { CourseDetail } from "@/schema/course/course.schema";
import { parseCurriculum } from "@/lib/course-utils";
import { ChevronUp, ChevronDown, Lightbulb, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

function TopicBullet() {
  return (
    <div className="mt-[2px] w-[15px] h-[15px] flex items-center justify-center shrink-0">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="15" height="15" rx="3" fill="#F1A33C" fillOpacity="0.2"/>
        <path d="M10 7.5L6.25 10.0981L6.25 4.90192L10 7.5Z" fill="#F1A33C"/>
        <rect x="0.5" y="0.5" width="14" height="14" rx="2.5" stroke="#F1A33C" strokeOpacity="0.2"/>
      </svg>
    </div>
  );
}

export function CourseCurriculumTab({ course }: { course: CourseDetail }) {
  const sections = parseCurriculum(course.curriculum);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "0-0": true, // Expand first module of first section by default
  });

  if (sections.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Curriculum</h2>
        <p className="text-sm text-gray-500">No curriculum content available yet.</p>
      </div>
    );
  }

  const toggleModule = (sectionIdx: number, moduleIdx: number) => {
    const key = `${sectionIdx}-${moduleIdx}`;
    setExpandedModules((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-12 pb-10">
      <div className="space-y-4 mb-8">
        <div className="inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFA500]/10">
            <Zap className="w-4 h-4 text-[#FFA500] fill-current" />
          </div>
          <span className="text-[13px] font-bold text-[#FFA500] tracking-widest uppercase">
            Syllabus
          </span>
        </div>
        <h2 className="text-[36px] font-black text-black leading-tight uppercase">
          Course{" "}
          <span className="text-[#FFA500] relative inline-block">
            Curriculum
            <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#FFA500] rounded-full" />
          </span>
        </h2>
      </div>

      <div className="space-y-16">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-8">
            <h3 className="text-[28px] text-gray-900 tracking-tight">
              {section.title}
            </h3>

            <div className="space-y-4">
              {section.modules.map((module, moduleIndex) => {
                const isExpanded = expandedModules[`${sectionIndex}-${moduleIndex}`];
                return (
                  <div
                    key={moduleIndex}
                    className="group border border-gray-100 rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleModule(sectionIndex, moduleIndex)}
                      className={cn(
                        "w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/50 transition-all duration-200",
                        isExpanded && "border-b border-gray-300"
                      )}
                    >
                      <span className="text-[17px] font-bold text-gray-900 tracking-tight">
                        {module.title}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-[#F1A33C]" strokeWidth={2.5} />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#F1A33C]" strokeWidth={2.5} />
                      )}
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-8 py-6 space-y-4">
                          <ul className="space-y-5">
                            {/* Topics */}
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-4">
                                <TopicBullet />
                                <span className="text-[14px] text-gray-800 leading-none py-[2px]">
                                  {topic}
                                </span>
                              </li>
                            ))}
                            
                            {/* Notes */}
                            {module.notes.map((note, noteIdx) => (
                              <li key={`note-${noteIdx}`} className="flex items-start gap-4">
                                <div className="mt-[2px] w-[15px] h-[15px] flex items-center justify-center shrink-0">
                                  <Lightbulb className="h-5 w-5 text-[#F1A33C]" fill="#F1A33C" fillOpacity={0.2} />
                                </div>
                                <span className="text-[14px] text-gray-800 leading-none py-[2px]">
                                  {note}
                                </span>
                              </li>
                            ))}
                          </ul>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}