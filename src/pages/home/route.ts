import { lazy } from "react";
import type { RouteObject } from "react-router";

const LazyHome = lazy(() => import("./home"));

const homeRoute: RouteObject = {
  path: "",
  Component: LazyHome,
};

export { homeRoute };
