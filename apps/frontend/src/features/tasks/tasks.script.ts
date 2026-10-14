import { infiniteQueryOptions } from "@tanstack/react-query";
import { ClientCall } from "@/scripts/clientCall";
import { PaginationType, TasksFiltersType, TaskType } from "../../types/general";
import { appApis } from "../../data/api";

export const tasksInfiniteOptions = (filters: TasksFiltersType = {}) =>
  infiniteQueryOptions({
    queryKey: ["tasks", "list", filters],
    queryFn: ({ pageParam }) =>
      ClientCall<PaginationType<TaskType>>(appApis.tasks.list, {
        query: {
          page: pageParam,
          limit: 10,
          status: filters.status ?? undefined,
          priority: filters.priority ?? undefined,
          assigneeId: filters.assigneeId ?? undefined,
          search: filters.search || undefined,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined),
  });
