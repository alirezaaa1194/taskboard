"use client";

import { createContext, useContext, ReactNode } from "react";
import { UserType } from "../types/general";

const UserContext = createContext<UserType | null>(null);

export function UserProvider({ user, children }: { user: UserType | null; children: ReactNode }) {
  return <UserContext value={user}>{children}</UserContext>;
}

export function useUser(): UserType | null {
  return useContext(UserContext);
}

export function useRequireUser(): UserType {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useRequireUser must be used inside authenticated area");
  }
  return user;
}
