"use client"
import Header from "@/components/organisms/Header"
import { loadUser } from "@/lib/redux/slices/user.slice"
import React, { PropsWithChildren, useEffect, useLayoutEffect } from "react"
import { useDispatch } from "react-redux"

export default function MainLayout({ children }: PropsWithChildren) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <div className="bg-background">
      <Header />
      <div>{children}</div>
    </div>
  )
}
