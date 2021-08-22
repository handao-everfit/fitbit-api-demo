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
        if (action.payload) {
          console.log(action.payload);
          const data = {
            heartData: action.payload[0]["activities-heart"][0],
            sleepData: action.payload[1].summary,
            stepsData: action.payload[2]["activities-steps"][0],
            waterData: action.payload[3]["foods-log-water"][0],
          };
          state.data = data;
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
      });

    builder
      .addCase(revokeAccess.pending, (state) => {
        state.status = "loading";
      })
      .addCase(revokeAccess.fulfilled, (state) => {
        state.isLogged = false;
        state.data = null;
        state.status = "idle";
      });
  },
});

export default userSlice;
