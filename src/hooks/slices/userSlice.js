import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
    email_confirmed:false,
    role:null,

    // id: 1,
    // name: "test",
    // email_confirmed:true,
    // role:"basic",

    // id: 1,
    // name: "test",
    // email_confirmed:false,
    // role:"basic",

  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email_confirmed = true
      state.role = null
    },
    clearUser: (state) => {
      state.id = null
      state.name = null
      state.email_confirmed= false
      state.role=null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser,clearUser  } = userSlice.actions

export default userSlice.reducer