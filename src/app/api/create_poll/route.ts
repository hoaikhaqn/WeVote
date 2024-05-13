import { connectDB } from "@/lib/db"
import Polls from "@/models/polls"

import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
  try {
    await connectDB()
    const { subject, options, owner_id } = await request.json()

    if (subject && options && owner_id) {
      const new_record = {
        poll_id: Math.floor(Math.random() * 900000) + 100000,
        poll_subject: subject,
        poll_options: options.map((label: string) => ({ label, count: 0, percent: 0 })),
        owner_id
      }

      const PollResult = await Polls.create(new_record)
      return new NextResponse(JSON.stringify(PollResult), { status: 201 })
    }
    return new NextResponse(JSON.stringify({ message: "Missing parameters" }), { status: 400 })
  } catch (error) {
    console.log("API ERROR:", error)

    return new NextResponse(JSON.stringify({ message: JSON.stringify(error) }), { status: 500 })
  }
}
