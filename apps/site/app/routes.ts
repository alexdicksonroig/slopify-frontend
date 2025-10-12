import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("./layouts/header.tsx", [
		index("routes/home.tsx"),
		route("products", "routes/products.tsx"),
		route("payment", "routes/payment.tsx"),
		route("return", "routes/return.tsx"),
	]),
] satisfies RouteConfig;
