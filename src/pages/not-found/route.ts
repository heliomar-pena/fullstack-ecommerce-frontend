import { lazy } from "react";
import type { RouteObject } from "react-router";

const LazyNotFound = lazy(() => import("./not-found"));

const notFoundRoute: RouteObject = {
  path: "/*",
  Component: LazyNotFound,
};

export { notFoundRoute };
