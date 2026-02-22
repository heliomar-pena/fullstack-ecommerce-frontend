import { createBrowserRouter, type RouteObject } from "react-router";
import { loginRoute } from "../pages/login/route";
import { AnonymousRoutes } from "./decorators/anonymous-router";
import { notFoundRoute } from "../pages/not-found/route";
import { signupRoute } from "@/pages/signup/route";
import { forbiddenRoute } from "@/pages/forbidden/route";
import { AuthenticatedRouter } from "./decorators/authenticated-router";
import { AdminRouter } from "./decorators/admin-router";
import { MerchantRouter } from "./decorators/merchant-router";
import { homeRoute } from "@/pages/home/route";
import { merchantRoute } from "@/pages/merchant/route";
import { adminRoute } from "@/pages/admin/route";

const anonymousRoutes: RouteObject[] = [loginRoute, signupRoute];
const authenticatedRoutes: RouteObject[] = [homeRoute];
const adminRoutes: RouteObject[] = [adminRoute];
const merchantRoutes: RouteObject[] = [merchantRoute];

const anonymousRouter: RouteObject = {
  Component: AnonymousRoutes,
  children: anonymousRoutes,
};

const adminRouter: RouteObject = {
  Component: AdminRouter,
  children: adminRoutes,
};

const merchantRouter: RouteObject = {
  Component: MerchantRouter,
  children: merchantRoutes,
};

const authenticatedRouter: RouteObject = {
  Component: AuthenticatedRouter,
  children: [...authenticatedRoutes, merchantRouter, adminRouter],
};

export const router = createBrowserRouter([
  anonymousRouter,
  authenticatedRouter,
  notFoundRoute,
  forbiddenRoute,
]);
