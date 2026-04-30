"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { useCourseCategoriesForTabs } from "@/modules/course/queries";
import { CourseList } from "./CourseList";
import { CourseSearch } from "./CourseSearch";
import { useState, useCallback } from "react";

const TAB_ALL = "all";

export function CourseTabs() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categories = [], isLoading: categoriesLoading } = useCourseCategoriesForTabs();
  const [activeTab, setActiveTab] = useState<string>(TAB_ALL);
  const handleSearch = useCallback((v: string) => setSearchTerm(v), []);

  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Category Pills - Exactly as in the design */}
      <div className="flex justify-center mb-12">
        <Tabs.List className="inline-flex items-center gap-3 p-2.5 bg-white border-2 border-gray-200 rounded-[30px] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] max-w-full overflow-x-auto no-scrollbar">
          <Tabs.Trigger
            value={TAB_ALL}
            className="px-10 py-3 text-[15px] font-semibold tracking-wider uppercase transition-all rounded-[24px] data-[state=active]:bg-[#F1A33C] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-900 data-[state=inactive]:hover:bg-gray-50 flex-shrink-0"
          >
            All
          </Tabs.Trigger>
          {categoriesLoading ? (
            <div className="px-10 py-3 text-sm font-semibold text-gray-400 uppercase animate-pulse">Loading...</div>
          ) : (
            categories.map((cat) => (
              <Tabs.Trigger
                key={cat.course_category_id}
                value={cat.course_category_id}
                className="px-10 font-semibold py-3 text-[15px] font-bold tracking-wider uppercase transition-all rounded-[24px] data-[state=active]:bg-[#F1A33C] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-900 data-[state=inactive]:hover:bg-gray-50 flex-shrink-0"
              >
                {cat.course_category_name}
              </Tabs.Trigger>
            ))
          )}
        </Tabs.List>
      </div>
      
      <div className="py-8">
        <Tabs.Content value={TAB_ALL} className="focus-visible:outline-none font-semibold">
          <CourseList categoryId={undefined} searchTerm={searchTerm} />
        </Tabs.Content>
        {categories.map((cat) => (
          <Tabs.Content
            key={cat.course_category_id}
            value={cat.course_category_id}
            className="focus-visible:outline-none font-semibold"
          >
            <CourseList categoryId={cat.course_category_id} searchTerm={searchTerm} />
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}