import { connectDB } from "@/lib/db"
import PollResponses, { PollResponseDocument } from "@/models/poll_responses"
import Polls, { PollDocument, PollOption } from "@/models/polls"
import { PollStatus } from "@/types/enum"
import { count } from "console"
import { NextRequest, NextResponse } from "next/server"

const updatePollOptions = (options: PollOption[], index: number, total: number, lastIndex?: number) => {
  console.log("TOTAL:", total)

  const poll_option_updated = options.map((option, idx) => {
    let count = option.count
    if (idx+1 === index) {
      count++
    }
    if (lastIndex && idx+1 === lastIndex) {
      count--
    }
    // console.log(count, total, (count / total) * 100)

    return { ...option, count, percent: parseFloat(((count / total) * 100).toFixed(1)) }
  })
  console.log(poll_option_updated)

  return poll_option_updated
}

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB()
    const poll_id = params.id
    const { option_number, responder_id, responder_name } = await request.json()
    if (poll_id && option_number != undefined && responder_id && responder_name) {
      const poll: PollDocument | null = await Polls.findOne({ poll_id })
      if (poll) {
        if (poll.poll_status === PollStatus.OPENED) {
          const response: PollResponseDocument | null = await PollResponses.findOne({ poll_id, responder_id })
          if (response) {
            if (response?.option_number !== option_number) {
              const data_updated = await PollResponses.findOneAndUpdate(
                { poll_id, responder_id },
                { option_number },
                { new: true }
              )
              const poll_options = updatePollOptions(
                poll.poll_options,
                option_number,
                poll.responder_total,
                response.option_number
              )
              console.log(poll_options)

              await Polls.findOneAndUpdate({ poll_id }, { poll_options })
              return new NextResponse(JSON.stringify(data_updated), { status: 200 })
            }
            return new NextResponse(JSON.stringify(response), { status: 200 })
          } else {
            const new_record = {
              poll_id,
              responder_id,
              responder_name,
              option_number
            }

            const PollResult = await PollResponses.create(new_record)
            console.log("poll.responder_total", poll.responder_total)

            const poll_options = updatePollOptions(poll.poll_options, option_number, poll.responder_total + 1)
            await Polls.findOneAndUpdate({ poll_id }, { $inc: { responder_total: 1 }, poll_options })
            return new NextResponse(JSON.stringify(PollResult), { status: 201 })
          }
        }
        return new NextResponse(JSON.stringify({ message: "This poll is closed" }), { status: 405 })
      }
      return new NextResponse(JSON.stringify({ message: "Not found" }), { status: 404 })
    }
    return new NextResponse(JSON.stringify({ message: "Missing parameters" }), { status: 400 })
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ message: JSON.stringify(error) }), { status: 500 })
  }
}
