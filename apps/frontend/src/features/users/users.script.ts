import { infiniteQueryOptions } from "@tanstack/react-query";
import { ClientCall } from "@/scripts/clientCall";
import { appApis } from "@/data/api";
import type { PaginationType, UserType } from "@/types/general";

export interface UsersFiltersType {
  search?: string;
  role?: string;
}

export const usersInfiniteOptions = (filters: UsersFiltersType = {}) =>
  infiniteQueryOptions({
    queryKey: ["users", "list", filters],
    queryFn: ({ pageParam }) =>
      ClientCall<PaginationType<UserType>>(appApis.users.list, {
        query: {
          page: pageParam,
          limit: 10,
          search: filters.search || undefined,
          role: filters.role || undefined,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined),
  });
