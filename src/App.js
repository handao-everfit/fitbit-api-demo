import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";

import { isLoggedSelector } from "./redux/user/userSelector";

function App() {
  const isLogged = useSelector(isLoggedSelector);

  return (
    <Router>
      <Switch>
        <div className='App'>
          <Route
            exact
            path='/'
            render={() =>
              isLogged ? <Redirect to='/home' /> : <Redirect to='/login' />
            }
          />
          <Route exact path='/login' component={LoginScreen} />
          <Route
            exact
            path='/home'
            component={() => <HomeScreen isLogged={isLogged} />}
          />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
