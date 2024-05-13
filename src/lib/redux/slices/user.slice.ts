import endpoints from "@/config/endpoints"
import fetchAPI from "@/lib/fetch"
import { showNotification } from "@/lib/notification/api"
import SocketIO from "@/lib/socket"
import { changeUsername, getUserInfo, switchUserMode } from "@/lib/utils"
import { Dispatch, UnknownAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"
import { PollDocument } from "@/models/polls"
import { IUser, UserMode } from "@/types/user"

const initialState: IUser = {
  id: "",
  name: "",
  mode: UserMode.ANONYMOUS,
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state) => {
      const user = getUserInfo()
      state.id = user.id
      state.name = user.name
      state.mode = user.mode
    },
    changeName: (state,action) => {
      const name = action.payload
      state.name = name
      if(!name){
        state.mode = UserMode.ANONYMOUS
      }
      changeUsername(name)
    },
    switchMode: (state,action) => {
      const mode = action.payload
      state.mode = mode
      switchUserMode(mode)
    }
  }
})

export const { loadUser, changeName, switchMode } = UserSlice.actions
const UserReducer = UserSlice.reducer
export default UserReducer
