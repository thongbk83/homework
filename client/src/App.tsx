import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import store from "./store";

import NavBar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";

//actions
import { loadUser } from "./actions/auth";

//utils
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App: React.FC = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <NavBar></NavBar>
                <Route component={Routes} />
            </Router>
            <ToastContainer />
        </Provider>
    );
};

export default App;
