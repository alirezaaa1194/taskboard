import { ListChecks, Users } from "lucide-react";
import { UserRoleEnum } from "@/types/general";

export const HeaderLinks = [
  {
    href: "/tasks",
    label: "تسک‌ها",
    icon: ListChecks,
    roles: [UserRoleEnum.OWNER, UserRoleEnum.MANAGER, UserRoleEnum.MEMBER],
  },
  {
    href: "/users",
    label: "کاربران",
    icon: Users,
    roles: [UserRoleEnum.OWNER],
  },
];