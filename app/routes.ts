import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("payment", "routes/payment.tsx"),
  route("return", "routes/return.tsx")
] satisfies RouteConfig;
