import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/user/userAsyncActions";

function LoginScreen() {
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login());
  }

  return (
    <div>
      <button onClick={handleLogin}>Login to Fitbit</button>
    </div>
  );
}

export default LoginScreen;
