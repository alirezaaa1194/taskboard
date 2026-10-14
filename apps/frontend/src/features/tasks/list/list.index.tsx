"use client";

import { useEffect, useRef } from "react";
import { TasksFiltersType, TaskType } from "../../../types/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import { tasksInfiniteOptions } from "../tasks.script";
import TasksListSkeletonComp from "../skeleton/skeleton.index";
import TasksEmptyComp from "../empty/empty.index";
import TasksItemComp from "./item/item.index";

function TasksListComp({ filters, onEdit }: { filters?: TasksFiltersType; onEdit: (task: TaskType) => void }) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useInfiniteQuery(tasksInfiniteOptions(filters));

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <TasksListSkeletonComp />;
  if (isError) return <p className="text-prio-high">خطا در بارگذاری تسک‌ها</p>;

  const allTasks = data?.pages.flatMap((page) => page.items) ?? [];

  if (allTasks.length === 0) return <TasksEmptyComp />;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {allTasks.map((task) => (
          <TasksItemComp key={task.id} task={task} onEdit={onEdit} />
        ))}
      </div>

      {/* Trigger for infinite scroll */}
      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && <TasksListSkeletonComp/>}
    </>
  );
}

export default TasksListComp;
