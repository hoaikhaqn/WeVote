import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type PageProps = {
  loading?: boolean
}

const initialState: PageProps = {
  loading: false
}

export const PageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    stopLoading: (state) => {
      state.loading = false
    }
  }
})

export const { startLoading, stopLoading } = PageSlice.actions
const PageReducer = PageSlice.reducer
export default PageReducer
