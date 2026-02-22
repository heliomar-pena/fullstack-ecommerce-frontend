import { lazy } from "react";
import type { RouteObject } from "react-router";

const LazyAdminPanel = lazy(() => import("./admin"));

export const adminRoute: RouteObject = {
  path: "/admin/users",
  Component: LazyAdminPanel,
};
