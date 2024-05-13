"use server"

import endpoints from "@/config/endpoints"
import fetchAPI from "@/lib/fetch"
import { IUser, UserMode } from "@/types/user"
import { revalidateTag } from "next/cache"

export const sendResponseAction = async ({
  pollId,
  selectedValue,
  user
}: {
  pollId: string
  selectedValue: number
  user: IUser
}) => {
  try {
    const { data, error } = await fetchAPI({
      url: endpoints.sendResponse(pollId),
      method: "POST",
      payload: {
        responder_id: user.id,
        responder_name: user.mode == UserMode.ANONYMOUS ? "Anonymous" : user.name,
        option_number: selectedValue
      }
    })
    revalidateTag(pollId)
    return { data, error }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}
export const closePollAction = async (pollId: string) => {
  try {
    const { data, error } = await fetchAPI({
      url: endpoints.closePoll(pollId),
      method: "PUT"
    })
    revalidateTag(pollId)
    return { data, error }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}
export const reOpenPollAction = async (pollId: string) => {
  try {
    const { data, error } = await fetchAPI({
      url: endpoints.reOpenPoll(pollId),
      method: "PUT"
    })
    revalidateTag(pollId)
    return { data, error }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}
export const refreshPollAction = async (pollId: string) => {
  try {
    revalidateTag(pollId)
    return true
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}
