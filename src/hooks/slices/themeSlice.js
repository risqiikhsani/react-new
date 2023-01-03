import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkTheme: false,
    fontTheme: null,
  },
  reducers: {
    setDarkTheme: (state, action) => {
        state.darkTheme = action.payload
    },
    setFontTheme: (state, action) => {
        state.fontTheme = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDarkTheme,setFontTheme  } = themeSlice.actions

export default themeSlice.reducer