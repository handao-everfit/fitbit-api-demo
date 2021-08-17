import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// All actions with API or Async/Await
// export const login = createAsyncThunk("login", async (params) => {
//   const { username, password } = params;
//   try {
//     const response = await axios.get(
//       `http://localhost:3000/users?username=${username}&password=${password}`
//     );
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// });

export const login = createAsyncThunk("login", async (params) => {
  const { access_token, userId } = params;

  const headers = {
    Authorization: "Bearer " + access_token,
  };
  axios
    .get(
      "https://api.fitbit.com/1/user/" +
        userId +
        "/activities/heart/date/today/1w.json",
      { headers }
    )
    .then((response) => {
      if (response.status === 200) {
        const headers = {
          Authorization: "Bearer " + access_token,
        };
        axios
          .all([
            axios.get(
              "https://api.fitbit.com/1/user/" +
                userId +
                "/activities/heart/date/today/1d.json",
              { headers }
            ),
            //GET https://api.fitbit.com/1.2/user/[user-id]/sleep/date/[date].json
            axios.get(
              "https://api.fitbit.com/1.2/user/" +
                userId +
                "/sleep/date/today.json",
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
          ])
          .then(
            axios.spread((heart, sleep, steps, water) => {
              if (response.status === 200) {
                return {
                  heartData: Object.values(heart.data)[0],
                  sleepData: sleep.data.summary,
                  stepData: Object.entries(steps.data)[0][1][0],
                  waterData: Object.entries(water.data)[0][1][0],
                };
                // setHeartData(Object.values(heart.data)[0]);
                // setSleepData(sleep.data.summary);
                // setStepData(Object.entries(steps.data)[0][1][0]);
                // setWaterData(Object.entries(water.data)[0][1][0]);
              }
            })
          )

          .catch((error) => {
            return error;
          });
      }
    });
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
