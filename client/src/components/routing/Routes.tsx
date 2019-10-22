import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../profile/Profile";
import SideBar from "../layout/SideBar";
import Grid from "@material-ui/core/Grid";

import PrivateRoute from "./PrivateRoute";

const Routes = () => {
    return (
        <Grid container>
            <Grid item xs={2}>
                <SideBar />
            </Grid>
            <Grid item xs={10}>
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/" component={Profile} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </Grid>
        </Grid>
    );
};

export default Routes;
