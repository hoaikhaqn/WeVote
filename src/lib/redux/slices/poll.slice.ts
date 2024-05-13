import endpoints from "@/config/endpoints"
import fetchAPI from "@/lib/fetch"
import { showNotification } from "@/lib/notification/api"
import SocketIO from "@/lib/socket"
import { getUserInfo } from "@/lib/utils"
import { Dispatch, UnknownAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"
import { PollDocument } from "@/models/polls"

type PollStore = {
  data?: PollDocument
  isError?: boolean
}

const initialState: PollStore = {}

// export const changeTurns = createAsyncThunk<PollDocument, ChangeTurnsDTO, { rejectValue: any }>(
//   "room/changeTurns",
//   async ({ room_id, player_id }, { rejectWithValue }) => {
//     const { data, error } = await fetchAPI<PollDocument>({
//       url: endpoints.changeTurns(room_id),
//       method: "PUT",
//       payload: { player_id },
//       cache: "no-cache"
//     })
//     if (error) return rejectWithValue(error)
//     return data as PollDocument
//   }
// )

export const RoomSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    // builder.addCase(createRoom.fulfilled, (state, action) => {
    //   const room = action.payload
    //   state.data = room
    //   state.starting = false
    //   state.counter = wait_seconds
    // }),
  }
})

export const { } = RoomSlice.actions
const PollReducer = RoomSlice.reducer
export default PollReducer
