import type { JSONContent } from "@tiptap/core";

export type ThemeType = "light" | "dark";

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: UserRoleEnum;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskUser = {
  id: number;
  name: string;
  email: string;
};

export type TaskType = {
  id: number;
  title: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  description: JSONContent | null;
  dueDate: string | null;
  assignee: TaskUser | null;
  createdBy: TaskUser;
  createdAt: string;
  updatedAt: string;
};

export type PaginationType<T> = {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type TasksFiltersType = {
  status?: TaskStatusEnum | null;
  priority?: TaskPriorityEnum | null;
  assigneeId?: number | null;
  search?: string;
};

// -------------Enums-------------

export enum UserRoleEnum {
  OWNER = "owner",
  MANAGER = "manager",
  MEMBER = "member",
}

export enum TaskStatusEnum {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum TaskPriorityEnum {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
