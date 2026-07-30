import * as Api from "@app/lib/api";
import { redirect } from "react-router";

export async function clientLoader() {
  const products = await Api.get("products/");
  console.log("Products:", products);

  return redirect("/products");
}

export default function Home() {
  return null;
}
