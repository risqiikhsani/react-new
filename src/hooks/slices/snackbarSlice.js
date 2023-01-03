import { createSlice } from '@reduxjs/toolkit'

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    type: null,
    string: null,
    count:0,
  },
  reducers: {
    setSnackbar: (state, action) => {
      state.type = action.payload.type
      state.string = action.payload.string
      state.count = state.count + 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer