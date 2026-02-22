import { Home, Shield, Store } from "lucide-react";
import { ROLES, type Role } from "@/auth/roles";

export type NavItem = {
  key: string;
  title: string;
  to: string;
  icon?: React.ComponentType<{ className?: string }>;
  end?: boolean;
};

export type NavGroup = {
  key: string;
  title: string;
  allowedRoles?: readonly Role[];
  items: NavItem[];
};

export const SIDEBAR_NAV: readonly NavGroup[] = [
  {
    key: "main",
    title: "Main",
    allowedRoles: [ROLES.Customer, ROLES.Admin, ROLES.Merchant],
    items: [{ key: "home", title: "Home", to: "/", icon: Home, end: true }],
  },
  {
    key: "merchant",
    title: "Merchant",
    allowedRoles: [ROLES.Merchant],
    items: [
      {
        key: "merchant",
        title: "Products",
        to: "/merchant/products",
        icon: Store,
      },
    ],
  },
  {
    key: "admin",
    title: "Admin",
    allowedRoles: [ROLES.Admin],
    items: [
      {
        key: "admin",
        title: "Users Management",
        to: "/admin/users",
        icon: Shield,
      },
    ],
  },
];
