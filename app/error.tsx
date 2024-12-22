"use client"
import { CircleAlert } from "lucide-react"
import Link from "next/link"

export default function Error() {

  return <div className="flex min-h-screen flex-col items-center pt-24">
    <CircleAlert size={64} />
    <div>
      <Link href="/">Go to home</Link>
    </div>
  </div>
}