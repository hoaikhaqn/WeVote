import { Button } from "@/components/ui/button"
import routes from "@/config/routes"
import { PollDocument } from "@/models/polls"
import { LogIn } from "lucide-react"
import Link from "next/link"
import React from "react"

type Props = {
  data: PollDocument
}

export default function PollItem({ data }: Props) {
  if (!data) return null

  return (
    <div className="flex w-full items-center space-x-2 border-2 border-solid border-border rounded-full p-3 bg-secondaryBackground hover:bg-background duration-300">
      {/* <BarChart2 className="ml-2" /> */}
      <b className="ml-2"># {data.poll_id}</b>
      <p>|</p>
      <p className="flex-1 text-left text-ellipsis overflow-hidden whitespace-nowrap ...">{data.poll_subject}</p>
      <Button type="button" className="rounded-full" size="icon">
        <Link href={routes.livePoll(data.poll_id)}>
          <LogIn />
        </Link>
        {/* <Loader2 className="m-auto h-6 w-6 animate-spin" /> */}
      </Button>
    </div>
  )
}
