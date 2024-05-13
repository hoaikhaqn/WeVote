"use client"
import { changeName } from "@/lib/redux/slices/user.slice"
import { RootState } from "@/lib/redux/store"
import { changeUsername, getFirstAndLastLetters, getUserInfo } from "@/lib/utils"
import { UserMode } from "@/types/user"
import { AvatarIcon } from "@radix-ui/react-icons"
import { Pencil, Trash, Trash2 } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import Avatar from "react-avatar"
import { useDispatch, useSelector } from "react-redux"

export default function UserBox() {
  const { name } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const debounceRef = useRef<NodeJS.Timeout>()

  const handleChangeName = (e: any) => {
    const new_name = e.currentTarget.textContent
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      dispatch(changeName(new_name))
    }, 1000)
  }
  const handleDeleteProfile = () => {
    dispatch(changeName(""))
  }

  return (
    <div className="flex gap-3 justify-center items-center cursor-pointer bg-background p-2 h-[40px] rounded-full">
      {name && (
        <Avatar className="font-bold" round size="30" name={getFirstAndLastLetters(name)} textSizeRatio={2.5} />
      )}
      {!name && (
        <div className="flex justify-center items-center bg-background w-[30px] h-[30px] rounded-full">
          <AvatarIcon width={20} height={20} className="text-foreground" />
        </div>
      )}
      <p className="flex items-center gap-2">
        <span
          className="text-[12px] text-left pl-[3px] text-ellipsis overflow-hidden whitespace-nowrap ... max-w-[120px]"
          contentEditable
          suppressContentEditableWarning
          onInput={handleChangeName}
        >
          {name || "Anoymous"}
        </span>
        {!name && <Pencil className="w-3 h-3 mr-2" />}
        {name && <Trash2 className="w-3 h-3 mr-2 text-danger" onClick={handleDeleteProfile}/>}
      </p>
    </div>
  )
}
