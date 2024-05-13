"use client"
import { sendResponseAction } from "@/actions/poll.action"
import PollOptions from "@/components/molecules/PollOptions"
import SwitchVote from "@/components/molecules/SwitchVote"
import { Button } from "@/components/ui/button"
import endpoints from "@/config/endpoints"
import routes from "@/config/routes"
import fetchAPI from "@/lib/fetch"
import { RootState } from "@/lib/redux/store"
import SocketIO from "@/lib/socket"
import { getResultPolls, getUserInfo, saveResultPolls } from "@/lib/utils"
import { PollDocument } from "@/models/polls"
import { PollStatus } from "@/types/enum"
import { UserMode } from "@/types/user"
import { CaretLeftIcon } from "@radix-ui/react-icons"
import { Loader2, User2 } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

type Props = {
  // params: { id: string }
  data?: PollDocument | null
}
export default function LivePollTemplate({ data }: Props) {
  const lastSelectedValue = useRef<number>()
  const [selectedValue, setSelectedValue] = useState<number>()
  const [requesting, setRequesting] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.user)

  const handleSendResponse = async () => {
    if (
      data &&
      data.poll_status === PollStatus.OPENED &&
      selectedValue !== undefined &&
      selectedValue !== lastSelectedValue.current
    ) {
      setRequesting(true)
      await sendResponseAction({ pollId: data.poll_id, selectedValue, user })
      const socket = new SocketIO()
      socket.sc.emit("sendResponse", { poll_id: data.poll_id })
      lastSelectedValue.current = selectedValue
      saveResultPolls(data.poll_id, selectedValue)
      setRequesting(false)
    }
  }

  useLayoutEffect(() => {
    if (data) {
      const defaultValue = getResultPolls(data.poll_id)
      lastSelectedValue.current = defaultValue
      setSelectedValue(defaultValue)
    }
  }, [data])

  if (!data) return null

  return (
    <div className="flex flex-col my-8 px-5 sm:max-w-lg xl:max-w-2xl mx-auto pb-20">
      <center>
        {data.poll_status === PollStatus.CLOSED && <p className="m-0 text-danger">This poll is closed</p>}
        <h4 className="text-2xl font-bold">{data.poll_subject}</h4>
      </center>
      <div className="flex justify-between my-5 w-full">
        <Link href={routes.home} className="flex gap-2 items-center cursor-pointer hover:underline">
          <CaretLeftIcon />
          <span>Back</span>
        </Link>
        <div className="flex gap-4">
          <SwitchVote />
          <div className="flex gap-2 items-center">
            <User2 className="w-4 h-4" />
            <span>{data.responder_total.toLocaleString("en-US")}</span>
          </div>
        </div>
      </div>
      <PollOptions value={selectedValue} options={data.poll_options} onChange={(v) => setSelectedValue(v)} />
      <div className="text-center fixed w-full left-0 bottom-0 bg-secondaryBackground p-5">
        <div className="container">
          <Button
            className="text-lg"
            onClick={handleSendResponse}
            disabled={
              data.poll_status === PollStatus.CLOSED ||
              selectedValue === undefined ||
              requesting ||
              selectedValue === lastSelectedValue.current
            }
          >
            {requesting && <Loader2 className="m-auto mr-3 h-6 w-6 animate-spin" />}
            Send Response
          </Button>
        </div>
      </div>
    </div>
  )
}
