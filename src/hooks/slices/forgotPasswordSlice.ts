import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForgotPasswordState {
  email: string | null;
  phone: string | null;
  method: string | null;
  code: string | null;
}

const initialState: ForgotPasswordState = {
  email: null,
  phone: null,
  method: null,
  code: null,
};

const forgotPasswordSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setForgotPassword: (state, action: PayloadAction<ForgotPasswordState>) => {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.method = action.payload.method;
      state.code = action.payload.code;
    },
    clearForgotPassword: (state) => {
      state.email = null;
      state.phone = null;
      state.method = null;
      state.code = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setForgotPassword, clearForgotPassword } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
