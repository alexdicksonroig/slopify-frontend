import { redirect } from "react-router";

export function clientLoader() {
  return redirect("/variants");
}

export default function Home() {
  return null;
}
