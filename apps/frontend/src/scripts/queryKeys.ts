export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  tasks: {
    all: ["tasks"] as const,
    list: (filters: Record<string, any>) => ["tasks", "list", filters] as const,
    detail: (id: number) => ["tasks", "detail", id] as const,
  },
  users: {
    all: ["users"] as const,
    list: (filters: Record<string, any>) => ["users", "list", filters] as const,
  },
};
