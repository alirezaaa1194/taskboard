import { ClientCall } from "@/scripts/clientCall";
import { appApis } from "../data/api";

export async function logoutUser(): Promise<void> {
  await ClientCall<{ message: string }>(appApis.auth.logout, {
    method: "POST",
  });
}
