"use client";

import DropdownComp from "@/utilities/components/dropdown/dropdown.index";
import { statusLabel, priorityLabel } from "../tasks.data";
import { TaskPriorityEnum, TaskStatusEnum, type TasksFiltersType } from "@/types/general";

const STATUS_FILTERS: { value: TaskStatusEnum | null; label: string }[] = [
  { value: null, label: "همه وضعیت‌ها" },
  { value: TaskStatusEnum.TODO, label: statusLabel[TaskStatusEnum.TODO] },
  { value: TaskStatusEnum.IN_PROGRESS, label: statusLabel[TaskStatusEnum.IN_PROGRESS] },
  { value: TaskStatusEnum.DONE, label: statusLabel[TaskStatusEnum.DONE] },
];

const PRIORITY_FILTERS: { value: TaskPriorityEnum | null; label: string }[] = [
  { value: null, label: "همه اولویت‌ها" },
  { value: TaskPriorityEnum.LOW, label: priorityLabel[TaskPriorityEnum.LOW] },
  { value: TaskPriorityEnum.MEDIUM, label: priorityLabel[TaskPriorityEnum.MEDIUM] },
  { value: TaskPriorityEnum.HIGH, label: priorityLabel[TaskPriorityEnum.HIGH] },
];

function TasksPageFilterComp({ filters, onChange }: { filters: TasksFiltersType; onChange: (filters: TasksFiltersType) => void }) {
  return (
    <div className="mb-4 flex gap-2">
      <DropdownComp<TaskStatusEnum | null> value={filters.status ?? null} onChange={(status) => onChange({ ...filters, status })} options={STATUS_FILTERS} rounded placeholder="همه وضعیت‌ها" />
      <DropdownComp<TaskPriorityEnum | null> value={filters.priority ?? null} onChange={(priority) => onChange({ ...filters, priority })} options={PRIORITY_FILTERS} rounded placeholder="همه اولویت‌ها" />
    </div>
  );
}

export default TasksPageFilterComp;
