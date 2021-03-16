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
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/layout/NotFound";

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
          <Switch>
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
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
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/posts/:id" component={Post} />
                <Route component={NotFound} />
              </Switch>
            </section>
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
