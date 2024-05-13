import LivePollTemplate from "@/components/templates/LivePoll"
import endpoints from "@/config/endpoints"
import fetchAPI from "@/lib/fetch"
import { PollDocument } from "@/models/polls"
import { Metadata, ResolvingMetadata } from "next"
import React from "react"

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data } = await fetchAPI<PollDocument>({
    url: endpoints.getInfoPoll(params.id),
    method: "GET",
    next: { tags: ["poll"] }
  })
  // console.log(data)

  if (!data) return { title: "WeVote" }
  return {
    title: `${data?.poll_subject} - WeVote`
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { data } = await fetchAPI<PollDocument>({
    url: endpoints.getInfoPoll(params.id),
    method: "GET",
    next: { tags: ["poll",params.id] }
  })
  // console.log("data", data)

  return <LivePollTemplate data={data} />
}
