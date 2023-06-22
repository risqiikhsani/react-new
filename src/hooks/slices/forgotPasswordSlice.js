import { createSlice } from '@reduxjs/toolkit'

export const forgotPasswordSlice = createSlice({
  name: 'user',
  initialState: {
    email:null,
    phone:null,
    method:null,
    code:null,
  },
  reducers: {
    setForgotPassword: (state, action) => {
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.method = action.payload.method
      state.code = action.payload.code
    },
    clearForgotPassword: (state) => {
      state.email = null
      state.phone = null
      state.method = null
      state.code = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setForgotPassword,clearForgotPassword  } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer