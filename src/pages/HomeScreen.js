import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, login, revokeAccess } from "../redux/user/userAsyncActions";
import HeartDataTable from "../components/HeartDataTable";
import DataTable from "../components/DataTable";
import { dataSelector } from "../redux/user/userSelector";
import { Redirect, Route } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();

  const [heartData, sleepData, stepData, waterData] = useSelector(dataSelector);

  useEffect(() => {
    // get the url
    var url = window.location.href;
    console.log(window.location.href);
    //getting the access token from url
    var access_token = url.split("#")[1].split("=")[1].split("&")[0];
    //get the userid
    var userId = url.split("#")[1].split("=")[2].split("&")[0];
    console.log("access token " + access_token);
    console.log("userId: " + userId);
    dispatch(
      fetchData({
        access_token,
        userId,
      })
    );
    console.log(heartData);
  }, []);

  function handleRevokeAccess(e) {
    e.preventDefault();
    // get the url
    var url = window.location.href;
    console.log(window.location.href);
    //getting the access token from url
    var access_token = url.split("#")[1].split("=")[1].split("&")[0];
    // dispatch(revokeAccess(access_token));
    var p = "token=" + access_token;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.fitbit.com/oauth2/revoke");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader(
      "Authorization",
      "Basic MjNCNzdZOjQ0ZWI1NWE5NzhjZWQ1NWI3MzdmYjY2MTNkYjk5ZTg4",
      true
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        // setHeartData(null);
        // setSleepData(null);
        // setStepData(null);
        // setWaterData(null);
      }
    };
    xhr.send(p);
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h1>Data goes here</h1>
      <button onClick={handleRevokeAccess}>Revoke access</button>

      {/* {heartData &&
        heartData.map((item) => (
          <div>
            <h2>{item.dateTime}</h2>
            <HeartDataTable data={item.value.heartRateZones} />
          </div>
        ))}

      {sleepData && <DataTable data={sleepData} name='Sleep' />}
      {stepData && <DataTable data={stepData} name='Steps' />}
      {waterData && <DataTable data={waterData} name='Water' />} */}
    </div>
  );
}

export default HomeScreen;
