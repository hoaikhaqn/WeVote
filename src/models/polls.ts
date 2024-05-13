import { PollStatus } from "@/types/enum"
import mongoose from "mongoose"
import { PollResponseDocument } from "./poll_responses"

const { Schema } = mongoose

export type PollDocument = {
  _id: string
  poll_id: string
  poll_subject: string
  poll_options: PollOption[]
  responder_total: number
  responders?: PollResponseDocument[]
  poll_status: PollStatus
  owner_id: string
  created_at: string
  updated_at: string
}

export type LastPoll = {
  _id: string
  updated_at: string
  poll: PollDocument
}

export type PollOption = {
  label:string
  count: number,
  percent: number
}


const schema = new Schema(
  {
    poll_id: {
      type: String,
      unique: true,
      required: true
    },
    poll_subject: {
      type: String,
      required: true
    },
    poll_options: {
      type: Array,
      default: []
    },
    responder_total: {
      type: Number,
      default: 0
    },
    poll_status: {
      type: Number,
      required: true,
      default: PollStatus.OPENED
    },
    owner_id: {
      type: String,
      required: true
    },
  },
  {
    
    collection: "Polls",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    versionKey: false,
    minimize: false
  }
)

const Polls = mongoose.models.Polls || mongoose.model("Polls", schema)
export default Polls
