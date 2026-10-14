import { ServerCall } from "../scripts/serverCall";
import { UserType } from "../types/general";
import { appApis } from "../data/api";

export async function getCurrentUser(): Promise<UserType | null> {
  try {
    return await ServerCall<UserType>(appApis.auth.me);
  } catch {
    return null;
  }
}
