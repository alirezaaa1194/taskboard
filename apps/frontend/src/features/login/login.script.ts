import { appApis } from "../../data/api";
import { ClientCall } from "../../scripts/clientCall";
import { LoginFormData, LoginResponse } from "./login.type";

export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  return ClientCall<LoginResponse>(appApis.auth.login, {
    method: "POST",
    body: data,
  });
}
