import { createSlice,PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  darkTheme: Boolean;
  fontTheme: String | null;
  background: String;
}

const initialState: ThemeState = {
  darkTheme: false,
  fontTheme: null,
  background: 'linear-gradient(to right, #40e0d0, #ff8c00, #ff0080)',
}


export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkTheme: (state, action:PayloadAction<ThemeState>) => {
        state.darkTheme = action.payload.darkTheme
    },
    setFontTheme: (state, action:PayloadAction<ThemeState>) => {
        state.fontTheme = action.payload.fontTheme
    },
    setBackground: (state, action:PayloadAction<ThemeState>) => {
      state.background = action.payload.background
    },
    resetTheme : (state) => {
      state.darkTheme = false
      state.fontTheme = null
      state.background = 'linear-gradient(to right, #40e0d0, #ff8c00, #ff0080)'
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDarkTheme,setFontTheme,setBackground,resetTheme  } = themeSlice.actions

export default themeSlice.reducer