import { lazy } from "react";
import type { RouteObject } from "react-router";

const LazyForbidden = lazy(() => import("./forbidden"));

const forbiddenRoute: RouteObject = {
  path: "/forbidden",
  Component: LazyForbidden,
};

export { forbiddenRoute };
