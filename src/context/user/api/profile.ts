import type { User } from "@/types/user";
import { http } from "../../../lib/http";
import type { Role } from "@/auth/roles";

type ProfileResponse = User & {
  roles: { name: Role }[];
};

export async function profile(): Promise<User> {
  const { data } = await http.get<ProfileResponse>("/user/profile");

  const parsedRoles = Array.isArray(data?.roles)
    ? data.roles.map((role: { name: Role }) => role.name)
    : [];

  return { ...data, roles: parsedRoles };
}
