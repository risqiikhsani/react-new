import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkTheme: false,
    fontTheme: null,
    background: 'linear-gradient(to right, #40e0d0, #ff8c00, #ff0080)',
  },
  reducers: {
    setDarkTheme: (state, action) => {
        state.darkTheme = action.payload
    },
    setFontTheme: (state, action) => {
        state.fontTheme = action.payload
    },
    setBackground: (state, action) => {
      state.background = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDarkTheme,setFontTheme,setBackground  } = themeSlice.actions

export default themeSlice.reducer