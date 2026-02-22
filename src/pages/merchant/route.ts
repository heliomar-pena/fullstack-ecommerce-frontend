import { lazy } from "react";
import type { RouteObject } from "react-router";

const LazyMerchant = lazy(() => import("./merchant"));

const merchantRoute: RouteObject = {
  path: "/merchant",
  Component: LazyMerchant,
};

export { merchantRoute };
