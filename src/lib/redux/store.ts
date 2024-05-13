import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import PollReducer from "./slices/poll.slice"
import UserReducer from "./slices/user.slice"

export const store = configureStore({
  reducer: {
    user: UserReducer,
    // room: PollReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
