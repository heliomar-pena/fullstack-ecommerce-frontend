import type { Role } from "./roles";

export function hasAnyRole(
  userRoles: readonly Role[] | undefined,
  allowed: readonly Role[],
) {
  if (!userRoles?.length) return false;
  return allowed.some((r) => userRoles.includes(r));
}
