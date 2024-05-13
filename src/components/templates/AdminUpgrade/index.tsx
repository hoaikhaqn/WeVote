"use client"
import LinkEnhanced from "@/components/ui/link"
import routes from "@/config/routes"
import { switchPermission } from "@/lib/redux/slices/user.slice"
import { RootState } from "@/lib/redux/store"
import { Permissions } from "@/types/user"
import React, { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function AdminUpgradeTemplate() {
  const { permission } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (permission !== Permissions.ADMIN) {
      dispatch(switchPermission(Permissions.ADMIN))
    }
  }, [])

  return (
    <div className="flex flex-col my-8 px-5 sm:max-w-lg xl:max-w-2xl mx-auto pb-20">
      <center>
        <h2 className="text-2xl font-bold mb-3">Your Profile is upgraded to administrator.</h2>
        <p className="mb-5">You can now create polls and manage your polls</p>
        <LinkEnhanced className="underline" href={routes.home}>
          Back to home
        </LinkEnhanced>
      </center>
    </div>
  )
}
