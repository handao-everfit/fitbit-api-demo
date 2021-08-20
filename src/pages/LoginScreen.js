import React from "react";
import { useDispatch } from "react-redux";
import { login, revokeAccess } from "../redux/user/userAsyncActions";

function LoginScreen() {
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login());
  }

  return (
    <div>
      <button onClick={handleLogin}>Login to Fitbit</button>
      {/* <button onClick={() => dispatch(revokeAccess())}>Revoke access</button> */}
    </div>
  );
}

export default LoginScreen;
