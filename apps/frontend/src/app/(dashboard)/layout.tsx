"use client";
import LayoutHeaderComp from "@/utilities/components/header/header.index";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <LayoutHeaderComp />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
