"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook to check if a given media query matches the current viewport.
 * Example:
 * const isDesktop = useMediaQuery("(min-width: 1024px)")
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // Ensure window exists (for SSR safety)
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia(query)

    // Set initial match
    setMatches(mediaQuery.matches)

    // Handler for when the media query state changes
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

    // Add listener
    mediaQuery.addEventListener("change", handler)

    // Cleanup on unmount
    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return matches
}
