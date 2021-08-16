import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "./../redux/user/userReducer";

const reducers = combineReducers({
  rootUser: userReducer,
});

export default configureStore({
  reducer: reducers,
});
