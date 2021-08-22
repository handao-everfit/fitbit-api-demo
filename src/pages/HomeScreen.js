import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, revokeAccess } from "../redux/user/userAsyncActions";
import HeartDataTable from "../components/HeartDataTable";
import DataTable from "../components/DataTable";
import { dataSelector } from "../redux/user/userSelector";
import { useHistory } from "react-router-dom";

function HomeScreen({ isLogged }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { heartData, sleepData, stepsData, waterData } =
    useSelector(dataSelector);

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
  }, []);

  function handleRevokeAccess(e) {
    e.preventDefault();
    dispatch(revokeAccess());
    history.push("/login");
  }

  return (
    <div>
      <button onClick={handleRevokeAccess}>Revoke access</button>

      {heartData && (
        <div>
          <h2>{heartData.dateTime}</h2>
          <HeartDataTable data={heartData.value["heartRateZones"]} />
        </div>
      )}
      {sleepData && <DataTable data={sleepData} name="Sleep" />}
      {stepsData && <DataTable data={stepsData} name="Steps" />}
      {waterData && <DataTable data={waterData} name="Water" />}
    </div>
  );
}

export default HomeScreen;
