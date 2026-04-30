"use client";
import type { CourseDetail } from "@/schema/course/course.schema";
import { parseProjects, type ParsedProject } from "@/lib/course-utils";
import { Github, Link as LinkIcon, Monitor, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import img1 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117.png";
import img2 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (1).png";
import img3 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (2).png";
import img4 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (3).png";
import img5 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (4).png";
import img6 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (5).png";
import img7 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (6).png";
import img8 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (7).png";
import img9 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (8).png";
import img10 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (9).png";
import img11 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (10).png";
import img12 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624117 (11).png";
import img13 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624118.png";
import img14 from "@/assets/CourseImages/ProjectTabImages/Rectangle 34624119.png";

function SectionHeader({
  title,
  highlight,
  subtitle,
}: {
  title: string;
  highlight: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-4 mb-8">
      <div className="inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFA500]/10">
          <Zap className="w-4 h-4 text-[#FFA500] fill-current" />
        </div>
        <span className="text-[13px] font-bold text-[#FFA500] tracking-widest uppercase">
          {subtitle}
        </span>
      </div>
      <h2 className="text-[36px] font-black text-black leading-tight uppercase">
        {title}{" "}
        <span className="text-[#FFA500] relative inline-block">
          {highlight}
          <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#FFA500] rounded-full" />
        </span>
      </h2>
    </div>
  );
}

function TechIcon({ tech }: { tech: string }) {
  const techLower = tech.toLowerCase();
  const icons: Record<string, string> = {
    tailwindcss: "tailwindcss",
    tailwind: "tailwindcss",
    nextjs: "nextjs",
    next: "nextjs",
    nodejs: "nodejs",
    node: "nodejs",
    javascript: "javascript",
    js: "javascript",
    typescript: "typescript",
    ts: "typescript",
    html: "html5",
    css: "css3",
    react: "react",
    mongodb: "mongodb",
    firebase: "firebase",
    express: "express",
    github: "github",
  };

  // Find the longest key that matches to get the most specific icon
  const sortedKeys = Object.keys(icons).sort((a, b) => b.length - a.length);
  const iconKey = sortedKeys.find((key) => techLower.includes(key));

  if (iconKey) {
    return (
      <Image
        width={1000}
        height={1000}
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icons[iconKey]}/${icons[iconKey]}-original.svg`}
        className={cn("w-5 h-5", icons[iconKey] === "nextjs" && "invert")}
        alt={tech}
      />
    );
  }

  return (
    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1 rounded uppercase">
      {tech.substring(0, 2)}
    </span>
  );
}

export function CourseProjectsTab({ course }: { course: CourseDetail }) {
  const projects = parseProjects(course.projects);
  let liveProjects = projects.filter((p) => p.type === "LIVE" || p.type === "Live" || p.type === "live");
  const recordedProjects = projects.filter((p) => p.type === "RECORDED" || p.type === "Recorded" || p.type === "recorded");
  let companyProjects = projects.filter((p) => p.type === "COMPANY" || p.type === "Company" || p.type === "company");

  // Fallback mock data so the UI is visible if the backend has no LIVE projects for this course
  if (liveProjects.length === 0) {
    liveProjects = [
      {
        id: "mock-1",
        type: "LIVE",
        title: "To-Do List using Git Workflow",
        imageUrl: img1.src,
        techStack: ["github"],
        tags: [],
      },
      {
        id: "mock-2",
        type: "LIVE",
        title: "Tourism Website",
        imageUrl: img2.src,
        techStack: ["html", "css", "tailwind"],
        tags: [],
      },
      {
        id: "mock-3",
        type: "LIVE",
        title: "Food Store Website",
        imageUrl: img3.src,
        techStack: ["html", "css", "tailwind"],
        tags: [],
      },
      {
        id: "mock-4",
        type: "LIVE",
        title: "Personal Portfolio Website",
        imageUrl: img4.src,
        techStack: ["html", "css", "tailwind"],
        tags: [],
      },
      {
        id: "mock-5",
        type: "LIVE",
        title: "Interactive Counter Website",
        imageUrl: img5.src,
        techStack: ["html", "css", "tailwind", "js"],
        tags: [],
      },
      {
        id: "mock-6",
        type: "LIVE",
        title: "Responsive Form + Firebase",
        imageUrl: img6.src,
        techStack: ["html", "css", "tailwind", "js"],
        tags: [],
      },
      {
        id: "mock-7",
        type: "LIVE",
        title: "E-commerce App",
        imageUrl: img7.src,
        techStack: ["react"],
        tags: [],
      },
      {
        id: "mock-8",
        type: "LIVE",
        title: "Auth Dashboard",
        imageUrl: img8.src,
        techStack: ["nextjs"],
        tags: [],
      },
      {
        id: "mock-9",
        type: "LIVE",
        title: "UI Components",
        imageUrl: img9.src,
        techStack: ["tailwind", "ts"],
        tags: [],
      },
      {
        id: "mock-10",
        type: "LIVE",
        title: "Blog API",
        imageUrl: img10.src,
        techStack: ["nodejs", "express"],
        tags: [],
      },
      {
        id: "mock-11",
        type: "LIVE",
        title: "Task Manager API",
        imageUrl: img11.src,
        techStack: ["nodejs", "express", "mongodb"],
        tags: [],
      },
      {
        id: "mock-12",
        type: "LIVE",
        title: "Auth System",
        imageUrl: img12.src,
        techStack: ["nodejs", "express"],
        tags: [],
      }
    ];
  }

  // Fallback mock data so the UI is visible if the backend has no COMPANY projects for this course
  if (companyProjects.length === 0) {
    companyProjects = [
      {
        id: "mock-company-1",
        type: "COMPANY",
        title: "LEARNING MANAGEMENT SYSTEM",
        duration: "6 - 8hrs",
        description: "It proves you can build a real-world, full-stack application",
        points: ["Admin & Student Side", "Login with JWT", "Payment flow"],
        techStack: ["html", "css", "tailwind", "js", "nodejs", "express", "mongodb"],
        imageUrl: img13.src,
        tags: []
      },
      {
        id: "mock-company-2",
        type: "COMPANY",
        title: "JOB PORTAL APP",
        duration: "6 - 8hrs",
        description: "Shows business logic with job posting, user roles, resume upload",
        points: ["Authentication", "Recruiter Panel", "Seeker Panel", "Analytics"],
        techStack: ["html", "css", "tailwind", "js", "nodejs", "express", "mongodb"],
        imageUrl: img14.src,
        tags: []
      }
    ];
  }

  const sectionSubtitle = [
    liveProjects.length > 0 ? `12 LIVE PROJECTS` : null,
    recordedProjects.length > 0 ? `8 RECORDED PROJECTS` : null,
    companyProjects.length > 0 ? `2 COMPANY` : null,
  ]
    .filter(Boolean)
    .join(" & ");

  return (
    <div className="space-y-16 pb-20">
      {/* LIVE PROJECTS */}
      {liveProjects.length > 0 && (
        <section>
          <SectionHeader
            title={`Live`}
            highlight="PROJECTS"
            subtitle={sectionSubtitle}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveProjects.map((project: ParsedProject, i: number) => (
              <div key={i} className="bg-white rounded-[20px] p-3 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col gap-3 group transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[16/10] bg-gray-50 rounded-[12px] overflow-hidden">
                  <img
                    src={project.imageUrl || "https://placehold.co/400x250/F3F4F6/9CA3AF?text=Project"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50">
                      <Github className="w-4 h-4 text-gray-900" />
                    </div>
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50">
                      <LinkIcon className="w-4 h-4 text-gray-900" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3 pb-2 pt-1">
                  <h3 className="text-[14px] font-bold text-gray-900 text-center leading-tight px-2">
                    {project.title}
                  </h3>
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex items-center justify-center gap-2">
                      {project.techStack.map((tech: string, ti: number) => (
                        <div key={ti} title={tech} className="w-[38px] h-[38px] rounded-[10px] bg-white border border-gray-200 flex items-center justify-center p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                          <TechIcon tech={tech} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {recordedProjects.length > 0 && (
        <section>
          <SectionHeader title="Recorded" highlight="PROJECTS" subtitle={sectionSubtitle} />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-12">
            {recordedProjects.map((project: ParsedProject, i: number) => {
              const Icon = project.icon || Monitor;
              return (
                <div key={i} className="flex flex-col items-center gap-4 text-center group">
                  <div className="w-[100px] h-[100px] rounded-full bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#F1A33C]/10 transition-colors">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Icon className="w-12 h-12 text-gray-800 group-hover:text-[#F1A33C] transition-colors" strokeWidth={1.5} />
                    )}
                  </div>
                  <p className="text-[12px] font-bold text-gray-900 tracking-wider uppercase max-w-[120px]">
                    {project.title}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {companyProjects.length > 0 && (
        <section>
          <SectionHeader title="Company" highlight="PROJECTS" subtitle={sectionSubtitle} />
          <div className="space-y-6">
            {companyProjects.map((project: ParsedProject, i) => (
              <div key={i} className="bg-white rounded-[12px] p-4 border border-gray-200 shadow-[6px_6px_0_0_#E5E7EB] flex flex-col md:grid md:grid-cols-[300px_1fr] gap-6 group transition-all">
                {/* Project Image */}
                <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden">
                  <img
                    src={project.imageUrl || "https://placehold.co/600x400/F3F4F6/111827?text=Company+Project"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Project Details */}
                <div className="flex flex-col justify-between py-1">
                  <div className="space-y-4">
                    {/* Header: Title and Duration */}
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-[18px] font-bold text-black uppercase tracking-wide leading-tight mt-1">
                        {project.title}
                      </h3>
                      {project.duration && (
                        <div className="px-3 py-1 bg-black text-white text-[13px] font-bold whitespace-nowrap">
                          {project.duration}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {project.description && (
                      <p className="text-[14px] text-gray-700">
                        {project.description}
                      </p>
                    )}

                    {/* Features List (Points) */}
                    {project.points && project.points.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        {project.points.map((point: string, pi: number) => (
                          <div key={pi} className="flex items-center gap-3">
                            <span className="text-[14px] font-bold text-black whitespace-nowrap">
                              {point}
                            </span>
                            {pi < (project.points?.length ?? 0) - 1 && (
                              <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Dedicated Container */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="mt-5">
                      <div className="inline-flex items-center gap-3 px-3 py-2 bg-white rounded-[8px] border border-gray-200 shadow-sm">
                        {Array.from(new Set(project.techStack)).map((tech: string, ti: number) => (
                          <div key={ti} title={tech} className="w-[28px] h-[28px] flex items-center justify-center">
                            <TechIcon tech={tech} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}