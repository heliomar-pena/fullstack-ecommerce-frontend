import { lazy } from "react";
import type { RouteObject } from "react-router";

const LazyLogin = lazy(() => import("./login"));

const loginRoute: RouteObject = {
  path: "/auth/login",
  Component: LazyLogin,
};

export { loginRoute };
