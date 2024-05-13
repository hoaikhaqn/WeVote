import { connectDB } from "@/lib/db"
import PollResponses, { PollResponseDocument } from "@/models/poll_responses"
import Polls, { PollDocument } from "@/models/polls"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB()
    const poll_id = params.id

    if (poll_id) {
      const poll: PollDocument | null = (
        await Polls.aggregate([
          { $match: { poll_id: poll_id } },
          {
            $lookup: {
              from: "PollResponses",
              let: { pollId: "$poll_id" },
              pipeline: [{ $match: { $expr: { $eq: ["$poll_id", "$$pollId"] } } }],
              as: "responders"
            }
          }
        ])
      )[0]
      // const responders: PollResponseDocument[] | null = await PollResponses.find({ poll_id })
      if (poll) {
        return new NextResponse(JSON.stringify(poll), { status: 200 })
      }
      return new NextResponse(JSON.stringify({ message: "Not found" }), { status: 404 })
    }
    return new NextResponse(JSON.stringify({ message: "Missing parameters" }), { status: 400 })
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ message: JSON.stringify(error) }), { status: 500 })
  }
}
