import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";

function App() {
  return (
    <Router>
      <Switch>
        <div className='App'>
          <Route exact path='/' component={LoginScreen} />
          <Route exact path='/home' component={HomeScreen} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
