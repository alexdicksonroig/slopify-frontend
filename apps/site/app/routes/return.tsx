import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"
import { Api } from "~/api"

export default function Return() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<string>("")
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) return

    Api.get("session-status", { session_id: sessionId })
      .then((data) => setStatus(data.status))
      .catch((err) => {
        console.error("Error fetching session status:", err)
        setStatus("error")
      })
  }, [sessionId])

  return (
    <div className="mx-5 mt-5">
      {status === "" && <p>Checking payment status...</p>}
      {status === "complete" && (
        <p>Your payment was successful! You can now close this window.</p>
      )}
      {status === "error" && (
        <p>Something went wrong while checking your payment.</p>
      )}
    </div>
  )
}
