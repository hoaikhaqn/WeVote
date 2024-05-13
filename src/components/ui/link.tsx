"use client"
import React, { PropsWithChildren, useEffect } from "react"
import { useDispatch } from "react-redux"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { startLoading, stopLoading } from "@/lib/redux/slices/page.slice"

interface EnhancedLinkProps extends PropsWithChildren {
  href?: string
  className?: string
  onClick?: () => void
  target?: React.HTMLAttributeAnchorTarget
}

const LinkEnhanced = ({ href, className, children, target, onClick }: EnhancedLinkProps) => {
  const dispatch = useDispatch()
  const pathname = usePathname()

  const handleClick = () => {
    onClick && onClick()
    if (target != "_blank" && pathname != href) {
      dispatch(startLoading())
    }
  }

  useEffect(() => {
    return () => {
      dispatch(stopLoading())
    }
  }, [])

  return (
    <Link className={className} href={href || ""} target={target} onClick={handleClick}>
      {children}
    </Link>
  )
}
export default LinkEnhanced
