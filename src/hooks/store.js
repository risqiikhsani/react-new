import { configureStore } from '@reduxjs/toolkit'


import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'
import snackbarReducer from './slices/snackbarSlice'
import refetchReducer from './slices/refetchSlice'


export default configureStore({
  reducer: {
    counter:counterReducer,
    user:userReducer,
    theme:themeReducer,
    snackbar:snackbarReducer,
    refetch:refetchReducer,
  },

})


