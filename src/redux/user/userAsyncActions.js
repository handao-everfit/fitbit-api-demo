import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function redirect(url) {
  return new Promise((resolve, reject) => {
    window.location.replace(url);
    console.log(window.location.href);
    if (window.location.href.includes("access_token")) {
      resolve();
    } else {
      reject("Something went wrong! redirecting");
    }
  });
}

// All actions with API or Async/Await
export const login = createAsyncThunk("login", async (payload, params) => {
  // const { username, password } = params;
  try {
    await redirect(
      "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=23B77Y&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fhome&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800"
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
    return { access_token, userId };
  } catch (error) {
    return error;
  }
});

export const fetchData = createAsyncThunk("fetchData", async (params) => {
  const { access_token, userId } = params;

  const headers = {
    Authorization: "Bearer " + access_token,
  };
  try {
    const response = await axios.all([
      axios.get(
        "https://api.fitbit.com/1/user/" +
          userId +
          "/activities/heart/date/today/1d.json",
        { headers }
      ),
      //GET https://api.fitbit.com/1.2/user/[user-id]/sleep/date/[date].json
      axios.get(
        "https://api.fitbit.com/1.2/user/" + userId + "/sleep/date/today.json",
        { headers }
      ),
      //GET https://api.fitbit.com/1/user/-/activities/steps/date/today/1m.json
      axios.get(
        "https://api.fitbit.com/1/user/" +
          userId +
          "/activities/steps/date/today/1d.json",
        { headers }
      ),

      //GET https://api.fitbit.com/1/user/[user-id]/[resource-path]/date/[date]/[period].json
      axios.get(
        "https://api.fitbit.com/1/user/" +
          userId +
          "/foods/log/water/date/today/1d.json",
        { headers }
      ),
    ]);
    // .then(
    //   axios.spread((heart, sleep, steps, water) => {
    //     console.log("Herar data:  ", Object.values(heart.data)[0]);
    //     return {
    //       heartData: Object.values(heart.data)[0],
    //       sleepData: sleep.data.summary,
    //       stepData: Object.entries(steps.data)[0][1][0],
    //       waterData: Object.entries(water.data)[0][1][0],

    //       // setHeartData(Object.values(heart.data)[0]);
    //       // setSleepData(sleep.data.summary);
    //       // setStepData(Object.entries(steps.data)[0][1][0]);
    //       // setWaterData(Object.entries(water.data)[0][1][0]);
    //     };
    //   })
    //
    let data = [];
    response.forEach((res) => {
      data.push(res.data);
    });
    if (response.status === 429) {
      alert("Too many requests. Please wait.");
      return;
    }
    return data;
  } catch (error) {
    return error;
  }
});

export const revokeAccess = createAsyncThunk("revokeAccess", async (params) => {
  try {
    var url = window.location.href;
    console.log(window.location.href);
    //getting the access token from url
    var access_token = url.split("#")[1].split("=")[1].split("&")[0];
    var p = "token=" + access_token;
    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   Authorization:
    //     "Basic MjNCNzdZOjQ0ZWI1NWE5NzhjZWQ1NWI3MzdmYjY2MTNkYjk5ZTg4",
    // };

    // const response = await axios.post("https://api.fitbit.com/oauth2/revoke", {
    //   ...p,
    //   headers: headers,
    // });
    // return response.status;

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
    return xhr.status;
  } catch (error) {
    return error;
  }
});
