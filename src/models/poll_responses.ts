import { PollStatus } from "@/types/enum"
import mongoose from "mongoose"

const { Schema } = mongoose

export type PollResponseDocument = {
  _id: string
  poll_id: string
  responder_id: string
  responder_name: string
  option_number: number
  created_at: string
  updated_at: string
}

const schema = new Schema(
  {
    poll_id: {
      type: String,
      required: true
    },
    responder_id: {
      type: String,
      required: true
    },
    responder_name: {
      type: String,
      required: true
    },
    option_number: {
      type: Number,
      required: true
    }
  },
  {
    collection: "PollResponses",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    versionKey: false,
    minimize: false
  }
)

const PollResponses = mongoose.models.PollResponses || mongoose.model("PollResponses", schema)
export default PollResponses
