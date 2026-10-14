"use client";

import { useState } from "react";
import TasksPageHeaderComp from "./header/header.index";
import TasksPageFilterComp from "./filters/filters.index";
import TasksListComp from "./list/list.index";
import AddTaskDialogComp from "./addDialog/addDialog.index";
import type { TaskPriorityEnum, TaskStatusEnum, TaskType, TasksFiltersType } from "@/types/general";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

export default function TasksPageComp() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [status, setStatus] = useState<TaskStatusEnum | null>(null);
  const [priority, setPriority] = useState<TaskPriorityEnum | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  const filters: TasksFiltersType = {
    status,
    priority,
    search: debouncedSearch || undefined,
  };

  const openCreate = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEdit = (task: TaskType) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  return (
    <>
      <TasksPageHeaderComp onCreate={openCreate} search={searchInput} onSearchChange={setSearchInput} />
      <TasksPageFilterComp
        filters={{ status, priority }}
        onChange={(next) => {
          setStatus(next.status ?? null);
          setPriority(next.priority ?? null);
        }}
      />
      <TasksListComp filters={filters} onEdit={openEdit} />
      <AddTaskDialogComp open={dialogOpen} setOpen={setDialogOpen} task={editingTask} />
    </>
  );
}
