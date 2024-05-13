import { connectDB } from "@/lib/db"
import PollResponses, { PollResponseDocument } from "@/models/poll_responses"
import Polls, { LastPoll, PollDocument } from "@/models/polls"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB()
    const responder_id = params.id

    if (responder_id) {
      const polls: LastPoll[] | null = await PollResponses.aggregate([
        { $match: { responder_id } },
        {
          $lookup: {
            from: "Polls",
            let: { pollId: "$poll_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$poll_id", "$$pollId"] } } },
            ],
            as: "poll"
          }
        },
        { $unwind: { path: '$poll', preserveNullAndEmptyArrays: true } },
        { $project: { poll: 1, updated_at: 1 } },
        { $sort: { updated_at: -1 }}
      ])
      return new NextResponse(JSON.stringify(polls), { status: 200 })
    }
    return new NextResponse(JSON.stringify({ message: "Missing parameters" }), { status: 400 })
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ message: JSON.stringify(error) }), { status: 500 })
  }
}
