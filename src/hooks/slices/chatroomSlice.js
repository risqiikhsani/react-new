import { createSlice } from '@reduxjs/toolkit'

export const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState: {
    open: false,
    data: null,


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
    setChatroom: (state, action) => {
      state.open = action.payload.open
      state.data = action.payload.data
    },
    clearChatroom: (state) => {
      state.open = false
      state.data = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setChatroom,clearChatroom  } = chatroomSlice.actions

export default chatroomSlice.reducer