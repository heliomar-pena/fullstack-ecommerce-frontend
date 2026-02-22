import { type Role } from "@/auth/roles";

export type User = {
  id: string;
  email: string;
  roles: Role[];
};
