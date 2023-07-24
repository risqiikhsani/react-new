
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatroomState {
  open: boolean;
  data: any; // Replace 'any' with a specific type if you know the data structure
}

const initialState: ChatroomState = {
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
};

const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState,
  reducers: {
    setChatroom: (state, action: PayloadAction<ChatroomState>) => {
      state.open = action.payload.open;
      state.data = action.payload.data;
    },
    clearChatroom: (state) => {
      state.open = false;
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChatroom, clearChatroom } = chatroomSlice.actions;

export default chatroomSlice.reducer;
