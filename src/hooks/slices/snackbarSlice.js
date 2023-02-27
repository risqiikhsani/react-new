import { createSlice } from '@reduxjs/toolkit'

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    event: "basic",
    type: null,
    string: null,
    detail:null,
    url:null,
    count:0,

  },
  reducers: {
    setSnackbar: (state, action) => {
      state.event = action.payload.event
      state.type = action.payload.type
      state.string = action.payload.string
      state.detail = action.payload.detail
      state.url = action.payload.url
      state.count = state.count + 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer