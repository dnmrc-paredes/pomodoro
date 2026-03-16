'use client'

import { useEffect, useRef, useState } from 'react'

export const useHover = <T extends HTMLElement>() => {
  const elementRef = useRef<T | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    element?.addEventListener('mouseenter', () => setIsHovered(true))
    element?.addEventListener('mouseleave', () => setIsHovered(false))

    return () => {
      element?.addEventListener('mouseenter', () => setIsHovered(true))
      element?.addEventListener('mouseleave', () => setIsHovered(false))
    }
  }, [])

  return { elementRef, isHovered }
}
