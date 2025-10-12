import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Slopify" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/products");
	}, []);
	return <div>Hola</div>;
}
