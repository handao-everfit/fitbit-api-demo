import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import HeartDataTable from "./components/HeartDataTable";
import DataTable from "./components/DataTable";
import { fetchData, login, revokeAccess } from "./redux/user/userAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import {
  dataSelector,
  accessTokenSelector,
  userIdSelector,
} from "./redux/user/userSelector";

function App() {
  const dispatch = useDispatch();

  const { heartData, sleepData, stepData, waterData } =
    useSelector(dataSelector);

  const access_token = useSelector((state) => state.rootUser.access_token);
  const userId = useSelector((state) => state.rootUser.userId);

  async function handleLogin(e) {
    await dispatch(login());
    dispatch(
      fetchData({
        access_token,
        userId,
      })
    );
  }

  function handleRevokeAccess() {
    dispatch(revokeAccess(access_token));
  }

  return (
    <div className='App'>
      <div>
        <button onClick={handleLogin}>Login to Fitbit</button>
        <button onClick={handleRevokeAccess}>Revoke access</button>
      </div>

      {heartData &&
        heartData.map((item) => (
          <div>
            <h2>{item.dateTime}</h2>
            <HeartDataTable data={item.value.heartRateZones} />
          </div>
        ))}

      {sleepData && <DataTable data={sleepData} name='Sleep' />}
      {stepData && <DataTable data={stepData} name='Steps' />}
      {waterData && <DataTable data={waterData} name='Water' />}
    </div>
  );
}

export default App;
