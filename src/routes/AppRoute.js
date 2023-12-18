import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../components/Register/Register";
import Users from "../components/ManageUser/Users";
import Login from "../components/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
const AppRoute = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        {/* <PrivateRoutes path="/projets" component={Projects} /> */}

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          home
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*" exact>
          404 not found
        </Route>
      </Switch>
    </>
  );
};

export default AppRoute;
