import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import "./App.css";

import { isLoggedSelector } from "./redux/user/userSelector";

function App() {
  const isLogged = useSelector(isLoggedSelector);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isLogged ? <Redirect to="/home" /> : <Redirect to="/login" />
            }
          />
          <Route exact path="/login" component={LoginScreen} />
          <Route
            exact
            path="/home"
            component={() => <HomeScreen isLogged={isLogged} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
