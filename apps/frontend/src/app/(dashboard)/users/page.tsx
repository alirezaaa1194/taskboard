import { dehydrate, HydrationBoundary, noop } from "@tanstack/react-query";
import UsersPageComp from "@/features/users/users.index";
import { getQueryClient } from "../../../lib/getQueryClient";
import { usersInfiniteOptions } from "../../../features/users/users.script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کاربران",
  description: "مدیریت کاربران تیم",
};

export default async function UsersPage() {
  const queryClient = getQueryClient();
  await queryClient.infiniteQuery(usersInfiniteOptions()).catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersPageComp />
    </HydrationBoundary>
  );
}
