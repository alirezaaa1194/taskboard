import TasksPageComp from "@/features/tasks/tasks.index";
import { Metadata } from "next";
import { getQueryClient } from "../../../lib/getQueryClient";
import { dehydrate, HydrationBoundary, noop } from "@tanstack/react-query";
import { tasksInfiniteOptions } from "../../../features/tasks/tasks.script";

export const metadata: Metadata = {
  title: "تسک‌ها",
  description: "مدیریت و پیگیری تسک‌های تیمی",
};

async function page() {
  const queryClient = getQueryClient();
  await queryClient.infiniteQuery(tasksInfiniteOptions()).catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksPageComp />
    </HydrationBoundary>
  );
}

export default page;
