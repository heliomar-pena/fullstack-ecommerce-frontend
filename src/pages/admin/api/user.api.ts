import { http } from "@/lib/http";
import type { UserApi } from "../dto/user.dto";

export async function getUsers(): Promise<UserApi[]> {
  const { data } = await http.get<UserApi[]>("/user/list");
  return data;
}

export type AddUserRoleInput = {
  userId: number;
  roleId: number;
};

export async function addUserRole(input: AddUserRoleInput): Promise<void> {
  await http.post(`/user/${input.userId}/roles/${input.roleId}`);
}
