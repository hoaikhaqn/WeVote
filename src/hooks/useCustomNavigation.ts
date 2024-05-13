"use client"
import { startLoading, stopLoading } from '@/lib/redux/slices/page.slice'
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useCustomNavigation = () => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()

  const navigate = {
    push: (to: string, options?: NavigateOptions) => {
      if (pathname != to) {
        router.push(to,options)
        dispatch(startLoading())
      }
    },
    replace: (to: string, options?: NavigateOptions) => {
      if (pathname != to) {
        router.replace(to,options)
        dispatch(startLoading())
      }
    },
  }

  useEffect(() => {
    return () => {
      dispatch(stopLoading())
    }
  }, [pathname])

  return navigate
}
