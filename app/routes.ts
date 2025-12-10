import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/header.tsx", [
    index("routes/home.tsx"),

    layout("./layouts/filters.tsx", [route("products", "routes/products.tsx")]),

    route("product/:id", "routes/product/product.tsx"),
    route("cart", "routes/cart.tsx"),
    route("checkout", "routes/checkout.tsx"),
    route("return", "routes/return.tsx"),
  ]),
] satisfies RouteConfig;
