import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./userAsyncActions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.length) {
          state.user = action.payload[0];
          state.user.isLogged = true;
        } else {
          state.user = null;
        }
        state.status = "idle";
      });

    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Payload", action);
        if (action.payload) {
          state.user = action.payload;
          state.user.isLogged = true;
        } else {
          state.user = null;
        }
        state.status = "idle";
      });

    builder
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      });
  },
});

export default userSlice;
