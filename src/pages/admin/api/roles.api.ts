import { http } from "@/lib/http";

export type RoleApi = {
  id: number;
  name: string;
};

export async function getRoles(): Promise<RoleApi[]> {
  const { data } = await http.get<RoleApi[]>("/role/list");
  return data;
}
