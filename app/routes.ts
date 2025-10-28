import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("page/index.tsx"),
  route("/about", "page/aboutUs/index.tsx"),
  route("/service", "page/service/index.tsx"),
  route("/login", "page/auth/loginPage.tsx"),
  route("/register", "page/auth/register.tsx"),
  route("/dashboard", "page/dashboard/index.tsx"),
] satisfies RouteConfig;
