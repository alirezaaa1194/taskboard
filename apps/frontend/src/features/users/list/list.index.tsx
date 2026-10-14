"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UsersFiltersType, usersInfiniteOptions } from "../users.script";
import { UserType } from "../../../types/general";
import UsersListSkeletonComp from "../skeleton/skeleton.index";
import UsersEmptyComp from "../empty/empty.index";
import UserItemComp from "./item/item.index";

function UsersListComp({ filters, onEdit }: { filters: UsersFiltersType; onEdit: (user: UserType) => void }) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useInfiniteQuery(usersInfiniteOptions(filters));

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <UsersListSkeletonComp />;
  if (isError) return <p className="text-prio-high">خطا در بارگذاری کاربران</p>;

  const allUsers = data?.pages.flatMap((page: any) => page.items) ?? [];

  if (allUsers.length === 0) return <UsersEmptyComp />;

  return (
    <>
      <div className="space-y-2">
        {allUsers.map((user) => (
          <UserItemComp key={user.id} user={user} onEdit={onEdit} />
        ))}
      </div>
      <div ref={loadMoreRef} className="h-10" />
      {isFetchingNextPage && <UsersListSkeletonComp />}
    </>
  );
}

export default UsersListComp;
