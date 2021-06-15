
import { Home, EventDetail,EventsPage, Payform  } from "./pages";
import { useDispatch } from "react-redux";
import { getHomeInfo } from "./redux/slices/homeInfo.slice";
import { getEventsAsync } from "./redux/slices/events.slice";
import { useEffect, useState } from "react";
import "./styles/styles.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Redirect,
} from "react-router-dom";
import { Register, Login } from "./components";
import { checkSession, logout } from "./api/auth.api";
import "./App.scss";
import { Header, Navbar } from "./components";

const App = () => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    // console.log(history)
    useEffect(() => {
        dispatch(getHomeInfo());
        dispatch(getEventsAsync());
        checkUserSession();
    }, []);
    const checkUserSession = async () => {
        try {
            const user = await checkSession();
            // if (user.message) redirect()
            if (!user.message) {
                saveUser(user);
            } else {
                saveUser(false);
            }
            // console.log('user', user)
        } catch (error) {
            // console.log("Error", error);
        }
    };
    const saveUser = (user) => setUser(user);
    return (
        <Router>
            <div className="app">
                {/* {!user.message && <Header />} */}
                <Header />
                <div className="route-pages-container">
                    {/* {!user.message && <div className="header-space"></div>} */}
                    <div className="header-space"></div>
                    {/* <button onClick={logout} style={{position: 'absolute', top: '50vh', left: '50vw', backgroundColor: 'red', cursor:'pointer'}}>Logout</button> */}
                    <Switch>
                        <Route
                            path="/register"
                            exact
                            component={(props) => (
                                <Register {...props} saveUser={saveUser} />
                            )}
                        />
                        <Route
                            path="/login"
                            exact
                            component={(props) => (
                                <Login {...props} saveUser={saveUser} />
                            )}
                        />
                        <Route
                            path="/events/eventdetail"
                            exact
                            component={(props) => (
                                <EventDetail {...props} saveUser={saveUser} />
                            )}
                        />

                        {/* {user.message && <Redirect to='/login'/>} */}
                        <Route path="/" exact component={Home} />
                        <Route path="/events" exact component={EventsPage} />
                        <Route
                            path="/pay"
                            exact
                            component={(props) => (
                                <Payform {...props} saveUser={saveUser} />
                            )}
                        />
                    </Switch>
                    {/* {!user.message && <div className="nav-space"></div>} */}
                    <div className="nav-space"></div>
                </div>
                {/* {!user.message && <Navbar />} */}
                <Navbar />
            </div>
        </Router>
    );
};

export default App;
