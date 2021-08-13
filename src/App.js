import "./App.css";

function App() {
  function revokeAccess() {
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
      }
    };
    xhr.send(params);
  }

  // get the url
  var url = window.location.href;
  console.log(window.location.href);
  //getting the access token from url
  var access_token = url.split("#")[1].split("=")[1].split("&")[0];
  //get the userid
  var userId = url.split("#")[1].split("=")[2].split("&")[0];
  console.log(access_token);
  console.log(userId);

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.fitbit.com/1/user/" +
      userId +
      "/activities/heart/date/today/1w.json"
  );
  xhr.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();

  return (
    <div className='App'>
      <a href='https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=23B77Y&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fhome&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800'>
        Login to Fitbit
      </a>
      <button onClick={revokeAccess}>Revoke access</button>
    </div>
  );
}

export default App;
