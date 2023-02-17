import {
  Route,
  Routes as Switch,
  HashRouter as Router,
} from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/account/login" element={<LoginPage />} />
          <Route exact path="/account/signup" element={<SignupPage />} />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Switch>
      </>
    </Router>
  );
}

export default Routes;
