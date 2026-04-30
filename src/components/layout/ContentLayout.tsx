import { Navbar } from "@/components/layout/Navbar";

interface ContentLayoutProps {
    title: string;
    children: React.ReactNode;
    breadcrumb?: React.ReactNode;
    actions?: React.ReactNode;
}

export function ContentLayout({ title, children, breadcrumb, actions }: ContentLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50/30">
            <Navbar title={title} breadcrumb={breadcrumb} actions={actions} />
            {/* pt-20 accounts for the fixed 64px navbar height + breathing room */}
            <div className="container pt-20 pb-8 px-4 sm:px-8 mx-auto max-w-7xl">{children}</div>
        </div>
    );
}