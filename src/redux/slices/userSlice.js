import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: 1,
    name: 'someone',
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
    },
    clearUser: (state) => {
      state.id = null
      state.name = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser,clearUser  } = userSlice.actions

export default userSlice.reducer