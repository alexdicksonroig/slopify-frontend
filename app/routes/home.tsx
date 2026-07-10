import { redirect } from "react-router";

export function clientLoader() {
  return redirect("/products");
}

export default function Home() {
  return null;
}
