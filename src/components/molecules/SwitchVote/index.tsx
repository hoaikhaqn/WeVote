import React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getUserInfo } from "@/lib/utils"
import { UserMode } from "@/types/user"
import { Button } from "@/components/ui/button"
import { RootState } from "@/lib/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { switchMode } from "@/lib/redux/slices/user.slice"


export default function SwitchVote() {
  const { name, mode } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handelSwitchMode = (mode:string) => {
     dispatch(switchMode(mode))
  }

  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm">Voting as</span>
      <Select value={mode} onValueChange={handelSwitchMode}>
        <SelectTrigger className="flex-1 gap-1 p-0 text-sm underline border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-background">
          <SelectGroup className="text-sm text-left">
            <SelectItem value={UserMode.ANONYMOUS}>Anonymous</SelectItem>
            {name && <SelectItem value={UserMode.IDENTIFIED}>{name}</SelectItem>}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
