import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfileForm from "./components/profile-forms/CreateProfileForm";
import EditProfileForm from "./components/profile-forms/EditProfileForm";
import AddNewExperienceForm from "./components/profile-forms/AddNewExperienceForm";
import AddNewEducationForm from "./components/profile-forms/AddNewEducationForm";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfileForm}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfileForm}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddNewExperienceForm}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddNewEducationForm}
              />
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
