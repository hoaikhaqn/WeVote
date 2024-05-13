"use client"
import PollItem from "@/components/molecules/Poll"
import SearchBar from "@/components/molecules/SearchBar"
import { Button } from "@/components/ui/button"
import endpoints from "@/config/endpoints"
import routes from "@/config/routes"
import { useCustomNavigation } from "@/hooks/useCustomNavigation"
import fetchAPI from "@/lib/fetch"
import { RootState } from "@/lib/redux/store"
import { LastPoll, PollDocument } from "@/models/polls"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
const UserBox = dynamic(() => import("@/components/molecules/UserBox"), { ssr: false })
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

type Props = {
  // polls?: LastPoll[] | null
}

export default function HomePageTemplate() {
  const router = useCustomNavigation()
  const { id: userId } = useSelector((state: RootState) => state.user)
  const [lastPolls, setLastPolls] = useState<LastPoll[]>()

  const handleSearch = (pollId: string) => {
    router.push(routes.livePoll(pollId))
  }

  const fetchLastPolls = async () => {
    const { data } = await fetchAPI<LastPoll[]>({
      url: endpoints.getLastPolls(userId),
      method: "GET",
      next: { tags: ["poll"] }
    })
    // console.log(data)

    data && setLastPolls(data)
  }

  useEffect(() => {
    if (userId) {
      fetchLastPolls()
    }
  }, [userId])

  return (
    <div className="container flex flex-col gap-10 py-10">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold">Polls</h2>
        <Button className="rounded-full uppercase" onClick={() => router.push(routes.createPoll)}>
          Create Poll
        </Button>
      </div>
      <div>
        <SearchBar onChange={handleSearch} />
      </div>
      <div className="text-center">
        <p className="text-sm mb-5 font-bold" hidden={!lastPolls || lastPolls.length === 0}>
          Your last event
        </p>
        <div className="flex flex-col gap-5">
          {lastPolls && lastPolls.length > 0 && lastPolls?.map((p) => <PollItem key={p._id} data={p.poll} />)}
        </div>
      </div>
    </div>
  )
}
