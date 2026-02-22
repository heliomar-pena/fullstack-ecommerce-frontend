export const ROLES = {
  Anon: "Anon",
  Customer: "Customer",
  Admin: "Admin",
  Merchant: "Merchant",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
