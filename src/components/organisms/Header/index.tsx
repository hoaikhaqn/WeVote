import Logo from "@/components/molecules/Logo"
import SwitchVote from "@/components/molecules/SwitchVote"
import UserBox from "@/components/molecules/UserBox"
import React from "react"

export default function Header() {
  return (
    <div className="bg-secondaryBackground flex flex-col justify-center h-[80px]">
      <div className="flex justify-between items-center lg:px-10 px-5">
        <Logo />
        <div className="flex items-center">
          <UserBox />
        </div>
      </div>
    </div>
  )
}
