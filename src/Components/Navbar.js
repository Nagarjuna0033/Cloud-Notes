import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../Context/User/UserContext";
export default function Navbar() {
    const userName = useContext(UserContext);

    const navigate = useNavigate();
    const { username, userUpdate, getUsername } = userName;
    let location = useLocation();
    useEffect(() => {}, [location]);

    const logout = () => {
        userUpdate(false);
        localStorage.removeItem("token");
        navigate("/Login");
    };

    if (localStorage.getItem("token")) {
        getUsername();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Notes
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        location.pathname === "/"
                                            ? "active"
                                            : ""
                                    }`}
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        location.pathname === "/about"
                                            ? "active"
                                            : ""
                                    }`}
                                    to="About"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>

                        {!localStorage.getItem("token") ? (
                            <form className="d-flex" role="search">
                                <Link
                                    className="btn btn-dark mx-1"
                                    to="Login"
                                    role="button"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="btn btn-dark mx-1"
                                    to="Signup"
                                    role="button"
                                >
                                    Signup
                                </Link>
                            </form>
                        ) : (
                            <div className="d-flex ">
                                <div className="navbar-brand fw-bold">
                                    {username ? username : ""}
                                </div>

                                <button
                                    className="btn btn-dark mx-1"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
