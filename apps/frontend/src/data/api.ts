export const appApis = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  users: {
    list: "/users",
    create: "/users",
    update: (id: number) => `/users/${id}`,
    remove: (id: number) => `/users/${id}`,
  },
  tasks: {
    list: "/todos",
    create: "/todos",
    detail: (id: number) => `/todos/${id}`,
    update: (id: number) => `/todos/${id}`,
    remove: (id: number) => `/todos/${id}`,
  },
} as const;

export type AppApis = typeof appApis;
