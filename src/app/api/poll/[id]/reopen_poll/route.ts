import { connectDB } from "@/lib/db"
import PollResponses, { PollResponseDocument } from "@/models/poll_responses"
import Polls, { PollDocument } from "@/models/polls"
import { PollStatus } from "@/types/enum"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB()
    const poll_id = params.id

    if (poll_id) {
      const poll: PollDocument | null = await Polls.findOne({ poll_id })
      if (poll) {
        const data_updated = await Polls.findOneAndUpdate({ poll_id }, { poll_status: PollStatus.OPENED }, {new :true})
        return new NextResponse(JSON.stringify(data_updated), { status: 200 })
      }
      return new NextResponse(JSON.stringify({ message: "Not found" }), { status: 404 })
    }
    return new NextResponse(JSON.stringify({ message: "Missing parameters" }), { status: 400 })
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ message: JSON.stringify(error) }), { status: 500 })
  }
}
