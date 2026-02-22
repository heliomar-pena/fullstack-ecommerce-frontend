import { lazy } from "react";
import type { RouteObject } from "react-router";

const LazyMerchant = lazy(() => import("./merchant"));

const merchantRoute: RouteObject = {
  path: "/merchant/products",
  Component: LazyMerchant,
};

export { merchantRoute };
