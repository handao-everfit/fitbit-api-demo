import { createSlice } from "@reduxjs/toolkit";
import { fetchData, login, revokeAccess } from "./userAsyncActions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    status: "idle",
    userId: "",
    access_token: "",
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log("Data Payload ", action);
        //action.payload is undefined
        if (action.payload) {
          state.data = action.payload;
        }
        state.status = "idle";
      });

    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLogged = true;
        }
        state.status = "idle";

        // console.log("Payload", action.payload);

        // if (action.payload) {
        //   state.access_token = action.payload.access_token;
        //   state.userId = action.payload.userId;
        //   // console.log("hey " + state.access_token);
        // } else {
        //   state.user = null;
        // }
      });

    builder
      .addCase(revokeAccess.pending, (state) => {
        state.status = "loading";
      })
      .addCase(revokeAccess.fulfilled, (state) => {
        // console.log("response", action.payload);
        state.isLogged = false;
        state.status = "idle";
      });
  },
});

export default userSlice;
