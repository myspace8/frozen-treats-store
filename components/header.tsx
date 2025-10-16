"use client"

import Link from "next/link"
import { HelpCircle } from "lucide-react"
import { DeliveryLocationHeader } from "@/components/delivery-location-header"
import { useMediaQuery } from "@/hooks/use-media-query"

export function Header() {

  return (
    <header className=
      "fixed z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 top-0 left-0 right-0 border-b"
    >
      <div className="container m-auto flex justify-between items-center min-h-16">
        <DeliveryLocationHeader />
        <Link href={"/help"}>
          <HelpCircle />
        </Link>
      </div>
    </header>
  )
}
