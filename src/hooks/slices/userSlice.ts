import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
  name: string | null;
  public_username: string | null;
  profile_picture: string | null;
  email_confirmed: boolean;
  role: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  public_username: null,
  profile_picture: null,
  email_confirmed: false,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.public_username = action.payload.public_username;
      state.profile_picture = action.payload.profile_picture;
      state.email_confirmed = true;
      state.role = null;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.public_username = null;
      state.profile_picture = null;
      state.email_confirmed = false;
      state.role = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
