"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  const cookiesStore = await cookies();
  return cookiesStore.get(name)?.value;
};

export const setCookie = async (name: string, value: string) => {
  const cookiesStore = await cookies();
  cookiesStore.set(name, value);
};
