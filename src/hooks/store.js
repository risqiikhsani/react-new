import { configureStore } from '@reduxjs/toolkit'


import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'
import snackbarReducer from './slices/snackbarSlice'

export default configureStore({
  reducer: {
    counter:counterReducer,
    user:userReducer,
    theme:themeReducer,
    snackbar:snackbarReducer,
  },

})


