import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  
    return (
    <main className="flex flex-col w-full px-[var(--global-padding)] justify-center items-center h-[calc(100dvh-206px)] text-center">
    <div className="flex gap-3">
      <AlertCircle /> Page not found
    </div>
    <div>
      <Link href="/" className="font-bold">Go to home</Link>
    </div>
    </main>
  )

  // return <div className="flex min-h-screen flex-col items-center pt-24 gap-10">
  // </div>
}