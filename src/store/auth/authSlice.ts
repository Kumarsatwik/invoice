import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  isLogin: boolean;
}

export const initialState: AuthState = {
  token: null,
  isLogin: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addLogin: (state, action) => {
      state.token = action.payload.token;
      state.isLogin = true;
    },
    addLogout: (state) => {
      state.token = null;
      state.isLogin = false;
    },
  },
});

export const { addLogin, addLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
