'use client'
import { RootState } from '@/lib/redux/store'
import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

type LoadingBarProps = {
  color?: string
  position?: string
}

export const ContextHolder = ({ children }: PropsWithChildren) => {

  const { loading } = useSelector((root: RootState) => root.page)
  return (
    <>
      {loading && <LoadingBar />}
      {children}
    </>
  )
}

export const LoadingBar = ({ color, position = 'fixed' }: LoadingBarProps) => {
  return (
    <div className={classNames(`top-0 left-0 flex justify-between w-full h-[5px] overflow-hidden z-[9999]`, position)}>
      <div className={`animate-progress w-full h-full origin-left-right bg-primary`} style={{ backgroundColor: color }}></div>
    </div>
  )
}
