import React from 'react'

export default function Logo() {
  return (
    <div className="flex gap-5">
        <div className="square w-[30px] h-[30px] rounded-md bg-primary p-2 flex justify-between items-end">
            <div className="line w-[3px] h-[70%] rounded-md bg-secondaryBackground"></div>
            <div className="line w-[3px] h-full rounded-md bg-secondaryBackground"></div>
            <div className="line w-[3px] h-[30%] rounded-md bg-secondaryBackground"></div>
        </div>
        <p className="font-bold text-2xl text-primary">WeVote</p>
    </div>
  )
}
