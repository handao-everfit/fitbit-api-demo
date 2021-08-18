import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import HeartDataTable from "./components/HeartDataTable";
import DataTable from "./components/DataTable";
import { login } from "./redux/user/userAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import { selectorData, selectorIsLogged } from "./redux/user/userSelector";

function App() {
  const dispatch = useDispatch();

  // const [heartData, setHeartData] = useState(null);
  // const [sleepData, setSleepData] = useState(null);
  // const [stepData, setStepData] = useState(null);
  // const [waterData, setWaterData] = useState(null);

  const { heartData, sleepData, stepData, waterData } =
    useSelector(selectorData);

  function revokeAccess() {
    // get the url
    var url = window.location.href;
    console.log(window.location.href);
    //getting the access token from url
    var access_token = url.split("#")[1].split("=")[1].split("&")[0];
    //get the userid
    var userId = url.split("#")[1].split("=")[2].split("&")[0];
    console.log("access token " + access_token);
    console.log("userId: " + userId);

    var params = "token=" + access_token;
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
    xhr.send(params);
  }

  // useEffect(() => {
  //   const headers = {
  //     Authorization: "Bearer " + access_token,
  //   };
  //   axios
  //     .get(
  //       "https://api.fitbit.com/1/user/" +
  //         userId +
  //         "/activities/heart/date/today/1w.json",
  //       { headers }
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const headers = {
  //           Authorization: "Bearer " + access_token,
  //         };
  //         axios
  //           .all([
  //             axios.get(
  //               "https://api.fitbit.com/1/user/" +
  //                 userId +
  //                 "/activities/heart/date/today/1d.json",
  //               { headers }
  //             ),
  //             //GET https://api.fitbit.com/1.2/user/[user-id]/sleep/date/[date].json
  //             axios.get(
  //               "https://api.fitbit.com/1.2/user/" +
  //                 userId +
  //                 "/sleep/date/today.json",
  //               { headers }
  //             ),
  //             //GET https://api.fitbit.com/1/user/-/activities/steps/date/today/1m.json
  //             axios.get(
  //               "https://api.fitbit.com/1/user/" +
  //                 userId +
  //                 "/activities/steps/date/today/1d.json",
  //               { headers }
  //             ),

  //             //GET https://api.fitbit.com/1/user/[user-id]/[resource-path]/date/[date]/[period].json
  //             axios.get(
  //               "https://api.fitbit.com/1/user/" +
  //                 userId +
  //                 "/foods/log/water/date/today/1d.json",
  //               { headers }
  //             ),
  //           ])
  //           .then(
  //             axios.spread((heart, sleep, steps, water) => {
  //               if (response.status === 200) {
  //                 setHeartData(Object.values(heart.data)[0]);
  //                 setSleepData(sleep.data.summary);
  //                 setStepData(Object.entries(steps.data)[0][1][0]);
  //                 setWaterData(Object.entries(water.data)[0][1][0]);
  //               }
  //             })
  //           )

  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       }
  //     });
  // }, [access_token, userId]);
  // console.log(Object.values(data)[0]);
  // if (data) console.log(data[0].value.heartRateZones);
  // if (heartData) console.table(heartData[0].value.heartRateZones);
  // if (sleepData) console.table(sleepData);
  // if (stepData) console.log(Object.entries(stepData)[0][1][0]);

  function redirect(url) {
    return new Promise((resolve, reject) => {
      window.location.href = url;
      if (window.location.href === url) {
        resolve();
      } else {
        reject("Something went wrong!");
      }
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    await redirect(
      "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=23B77Y&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800"
    );
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
      login({
        access_token,
        userId,
      })
    );
  }

  return (
    <div className='App'>
      <div>
        <button onClick={handleLogin}>Login to Fitbit</button>
        <button onClick={revokeAccess}>Revoke access</button>
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
