import { lazy } from "react";
import type { RouteObject } from "react-router";

const LazySignup = lazy(() => import("./signup"));

const signupRoute: RouteObject = {
  path: "/auth/signup",
  Component: LazySignup,
};

export { signupRoute };
