import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import { checkSession } from "../../api/auth.api";
import { useHistory, Redirect } from "react-router-dom";

const Navbar = () => {
    // const history = useHistory()

    // const checkUserSession = async () => {
    //     try {
    //         const user = await checkSession();
    //         if (user.message) {
    //             redirect()
    //         }
    //     } catch (error) {
    //         console.log("Error", error);
    //     }
    // };
    // const redirect = () => {
    //     if (location !== '/register') history.push('/login')
    // }
    // const movingBar = document.querySelector('#movingBar');
    // const scrolledDistance = movingBar.scrollLeft
    // console.log('scrolled', scrolledDistance)
    const location = useLocation();
    const url = location.pathname.split("/")[1];

    useEffect(() => {
        moveBar();
        // checkUserSession();
        // return () => {
        //     cleanup
        // }
    }, [url]);

    // const [url, setUrl] = useState(location.pathname.split("/")[1]);
    const moveBar = () => {
        const movingBar = document.querySelector("#movingBar");
        const windowWidth = window
            .getComputedStyle(movingBar)
            .getPropertyValue("width");
        const widthNumer = windowWidth.split("px")[0];
        // const scrolledDistance = movingBar.scrollLeftMax
        const scrolledDistance2 = movingBar.scrollWidth - movingBar.clientWidth;
        console.log(url);
        // console.log('scrolled', scrolledDistance)
        // console.log('scrolled2', scrolledDistance2)
        let param;
        switch (url) {
            case "":
                param = 0.5;
                break;
            case "events":
                param = 1;
                break;
            case "my-concerts":
                param = 0.75;
                break;
            case "friends":
                param = 0.25;
                break;
            case "config":
                param = 0;
                break;
            default:
                param = "Rythme";
        }
        console.log('param', param)
        movingBar.scroll({
            left: param * scrolledDistance2,
            behaviour: "smooth",
        });
        // movingBar.animate({
        //     scrollLeft: param * scrolledDistance2,
        // }, 1000)
        // movingBar.scrollLeft = param * scrolledDistance2;
        // movingBar.scrollLeft = widthNumer / icon;
        // console.log(e.target)
        // console.log(widthNumer)
    };
    const changeIcon = (e) => {
        // console.log(e.currentTarget.classList)
        const iconDivs = document.querySelectorAll(".navbar__option");
        // console.log(iconDivs)
        iconDivs.forEach((iconDiv) => {
            let classExist = iconDiv.classList.value.includes(
                "navbar__option--selected"
            );
            if (classExist)
                iconDiv.classList.remove("navbar__option--selected");
            // console.log(classExist)
        });
        e.currentTarget.classList.add("navbar__option--selected");
    };

    return (
        <nav className="navbar">
            <div className="navbar__iconbar">
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option "
                >
                    <Link to="/events">
                        <span className="navbar__icon d-flex-center-h">
                            <img src="assets/events.svg" alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            Tickets
                        </span>
                    </Link>
                </div>
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option"
                >
                    <Link to="">
                        <span className="navbar__icon d-flex-center-h">
                            <img src="assets/search.svg" alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            Search
                        </span>
                    </Link>
                </div>
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option"
                >
                    <Link to="/">
                        <span className="navbar__icon d-flex-center-h">
                            <img src="assets/home.svg" alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            Home
                        </span>
                    </Link>
                </div>
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option"
                >
                    <Link to="">
                        <span className="navbar__icon d-flex-center-h">
                            <img src="assets/my-concerts.svg" alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            My tickets
                        </span>
                    </Link>
                </div>
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option"
                >
                    <Link to="/config">
                        <span className="navbar__icon d-flex-center-h">
                            <img src="assets/friends.svg" alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            Config
                        </span>
                    </Link>
                </div>
            </div>
            <div id="movingBar" className="navbar__innerbar">
                <div className="navbar__overflow-container">
                    <img src="assets/navbar.svg" alt="" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
