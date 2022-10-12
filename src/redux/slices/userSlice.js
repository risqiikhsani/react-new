import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
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