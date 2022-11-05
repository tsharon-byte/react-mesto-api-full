import {useEffect, useState} from "react";
import Header from "./Header";
import api from "../utils/api";
import NewCurrentUserContext from "../contexts/NewCurrentUserContext";
import {Route, Switch, useHistory} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import InfoTooltip from "./InfoTooltip";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "../pages/Logout";

function App() {
    const history = useHistory();
    const [newCurrentUser, setNewCurrentUser] = useState({});
    const [success, setSuccess] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState();

    useEffect(() => {
        if (loggedIn) {
            api.getMe()
                .then((data) => {
                    setLoggedIn(true);
                    setNewCurrentUser(data);
                })
                .catch(() => {
                    console.log("User JWT has expired, please log in");
                    setLoggedIn(false);
                });
        }
    }, [loggedIn]);

    const handleNotificationPopupClosed = () => {
        setNotificationOpen(false);
        if (loggedIn) {
            history.push("/react-mesto-auth/");
        }
    };

    return (
        <NewCurrentUserContext.Provider value={{user: newCurrentUser, setUser: setNewCurrentUser}}>
            <div className="page">
                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                <Switch>
                    <Route path="/react-mesto-auth/sign-up">
                        <Register
                            setSuccess={setSuccess}
                            setNotificationOpen={setNotificationOpen}
                            setLoggedIn={setLoggedIn}
                            setMessage={setMessage}
                        />
                    </Route>
                    <Route path="/react-mesto-auth/sign-in">
                        <Login
                            setSuccess={setSuccess}
                            setLoggedIn={setLoggedIn}
                            setNotificationOpen={setNotificationOpen}
                        />
                    </Route>
                    <Route path="/react-mesto-auth/sign-out">
                        <Logout
                            setLoggedIn={setLoggedIn}
                            setNewCurrentUser={setNewCurrentUser}
                        />
                    </Route>
                    <ProtectedRoute
                        component={Home}
                        path="/react-mesto-auth/"
                        loggedIn={loggedIn}
                    />
                </Switch>
                <InfoTooltip
                    success={success}
                    isOpen={isNotificationOpen}
                    onClose={handleNotificationPopupClosed}
                    message={message}
                />
            </div>
        </NewCurrentUserContext.Provider>
    );
}

export default App;
