"use client";

import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  ChevronRight,
  PlayCircle 
} from "lucide-react";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const router = useRouter();

  const stats = [
    { label: "Courses Enrolled", value: "12", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Hours Learned", value: "45", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Certificates Earned", value: "5", icon: Trophy, color: "text-green-500", bg: "bg-green-50" },
  ];

  const recentCourses = [
    { 
      title: "Java Fullstack Internship", 
      progress: 65, 
      lastAccessed: "2 hours ago",
      image: "https://utfs.io/f/Rkxh5ZPHK3adgOE0PasTlA9Fgo72zi4eWH1JIcZyqRGahPMO" 
    },
    { 
      title: "Advanced React Patterns", 
      progress: 30, 
      lastAccessed: "Yesterday",
      image: "https://utfs.io/f/Rkxh5ZPHK3aduNBZ8efJeZy0PKRWst7pXE52kGrzbvFNQ4dY" 
    }
  ];

  return (
    <ContentLayout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-8 py-6 px-4">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back, <span className="text-[#F1A33C]">Learner!</span>
            </h1>
            <p className="text-muted-foreground">
              You&apos;re making great progress. Keep it up!
            </p>
          </div>
          <button 
            onClick={() => router.push("/course")}
            className="flex items-center gap-2 px-4 py-2 bg-[#F1A33C] text-white rounded-lg font-semibold hover:bg-[#E0922B] transition-colors w-fit"
          >
            Browse New Courses
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm bg-white/50 backdrop-blur-sm border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Learning Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Continue Learning
            <div className="h-px flex-1 bg-gray-100" />
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentCourses.map((course, i) => (
              <Card key={i} className="group overflow-hidden border-none shadow-md hover:shadow-lg transition-all bg-white border border-white/40">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-32 shrink-0">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-[#F1A33C] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground italic">Last accessed {course.lastAccessed}</p>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Progress</span>
                        <span className="text-[#F1A33C]">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" indicatorClassName="bg-[#F1A33C]" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links / Empty States placeholder */}
        <div className="rounded-2xl border-2 border-dashed border-gray-100 p-12 text-center space-y-4 bg-gray-50/30">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <BookOpen className="w-8 h-8 text-gray-300" />
          </div>
          <div className="max-w-xs mx-auto space-y-2">
            <h3 className="font-bold text-gray-400">Nothing else to show yet</h3>
            <p className="text-sm text-gray-400">Explore our curriculum to start your journey into tech excellence.</p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}