import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/header.tsx", [
    layout("./layouts/filters.tsx", [index("routes/variants.tsx")]),

    route("product/:id/:variantId", "routes/product/product.tsx"),
    route("cart", "routes/cart.tsx"),
    route("return", "routes/return.tsx"),
  ]),
] satisfies RouteConfig;
