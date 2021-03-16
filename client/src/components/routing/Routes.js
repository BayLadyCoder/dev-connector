import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CreateProfileForm from "../profile-forms/CreateProfileForm";
import EditProfileForm from "../profile-forms/EditProfileForm";
import AddNewExperienceForm from "../profile-forms/AddNewExperienceForm";
import AddNewEducationForm from "../profile-forms/AddNewEducationForm";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";

const Routes = () => {
  return (
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
        <PrivateRoute exact path="/edit-profile" component={EditProfileForm} />
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
  );
};

export default Routes;
