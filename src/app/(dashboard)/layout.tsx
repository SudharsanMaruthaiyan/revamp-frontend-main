import { Navbar } from "@/components/layout/Navbar";
import { Footbar } from "@/components/layout/Footbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> removed, handled by ContentLayout in pages */}
      <main className="flex-1">{children}</main>
      <Footbar />
    </div>
  );
}
