import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

export const Login = (props?: any) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        props.login(email, password);
    };

    if (props.isAuthenticated) {
        return <Redirect to="/profile" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Enter Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        className="testEmail"
                        id="testEmail"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        minLength={6}
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input
                    type="submit"
                    id="submitBtn"
                    className="btn btn-primary btnLogin"
                    value="Login"
                />
            </form>
            <p className="my-1">
                Dont have an account? <Link to="/register">Sign up</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
)(Login);
