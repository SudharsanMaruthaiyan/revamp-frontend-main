"use client";
import { CourseTabs } from "./components/CourseTabs";
import { ContentLayout } from "@/components/layout/ContentLayout";

export default function CoursePage() {
  return (
    <ContentLayout title="Courses">
      <section className="mt-6">
        <CourseTabs />
      </section>
    </ContentLayout>
  );
}