import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  ...(process.env.NODE_ENV === "development"
    ? [route("dev/coreui", "routes/dev/coreui.tsx")]
    : []),
  layout("./layouts/header.tsx", [
    index("routes/variants.tsx"),

    route("product/:id/:variantId", "routes/product/product.tsx"),
    route("checkout", "routes/checkout.tsx"),
    route("return", "routes/return.tsx"),
  ]),
] satisfies RouteConfig;
