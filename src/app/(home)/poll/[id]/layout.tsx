"use client"
import { refreshPollAction } from "@/actions/poll.action"
import SocketIO from "@/lib/socket"
import { Loader2 } from "lucide-react"
import React, { PropsWithChildren, useEffect, useState } from "react"

type Props = {
  params: { id: string }
}

export default function Layout({ params, children }: Props & PropsWithChildren) {
  const [isConnected, setConnected] = useState<boolean>(false)

  useEffect(() => {
    const socket = new SocketIO()
    socket.sc.on("connect", () => {
      setConnected(true)
      socket.sc.emit("joinRoom",{room_id: params.id})
    })
    // socket.sc.on("playerJoined", () => {
    //   dispatch(getRoomInfo(params.id))
    // })
    // socket.sc.on("playerLeaved", (payload: any) => {
    //   dispatch(leaveRoom({ room_id: params.id, player_id: payload.player_id }))
    // })
    socket.sc.on("responsesUpdated", async () => {
      console.log("responsesUpdated GET INFO")
      await refreshPollAction(params.id)
    })
    return () => {
      SocketIO.instance = null
      socket.sc.removeAllListeners()
      socket.sc.disconnect()
    }
  }, [])

  if (!isConnected)
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <div className="flex gap-3">
          <Loader2 className="m-auto mr-3 h-10 w-10 animate-spin" />
          <h2 className="text-2xl my-5 font-bold text-foreground uppercase">Connecting...</h2>
        </div>
      </div>
    )
  return <>{children}</>
}
