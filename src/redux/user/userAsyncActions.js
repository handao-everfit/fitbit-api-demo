import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// All actions with API or Async/Await
export const login = createAsyncThunk("login", async (params) => {
  const { username, password } = params;
  try {
    const response = await axios.get(
      `http://localhost:3000/users?username=${username}&password=${password}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
});

export const register = createAsyncThunk("register", async (params) => {
  try {
    const response = await axios.post(`http://localhost:3000/users`, {
      ...params,
    });
    return response.data;
  } catch (error) {
    return error;
  }
});

export const logout = createAsyncThunk("logout", async () => {
  return null;
});
