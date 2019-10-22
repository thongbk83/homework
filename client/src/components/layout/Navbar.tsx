import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { logout } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const Navbar = (props?: any) => {
    const classes = useStyles();

    const authLinks = (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Kamereo
                    </Typography>
                    <li>
                        <a
                            onClick={props.logout}
                            href="#!"
                            style={{ color: "white" }}
                        >
                            <span className="hide-sm">Logout</span>
                        </a>
                    </li>
                </Toolbar>
            </AppBar>
        </div>
    );

    const guestLinks = (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Kamereo
                    </Typography>
                    <Link to="/login" style={{ color: "white" }}>
                        Login
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );

    return (
        <>
            {!props.loading && (
                <Fragment>
                    {props.auth.isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            )}
        </>
    );
};

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,

    { logout }
)(Navbar);
