import { Api } from "~/api"
import type { Route } from "./+types/home"
import Checkout from "./checkout"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const products = await Api.get("products/")
  return { products }
}

export default function Payment({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-5 mt-5">
      <Checkout />
    </div>
  )
}
