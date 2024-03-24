import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Login.css";
import UserContext from "../Context/User/UserContext";
export default function Signup() {
    const signupApi = process.env.REACT_APP_NEW_USER;
    const alertContext = useContext(UserContext);
    const { changeAlert } = alertContext;
    const [passwordShow, setPassword] = useState("Show");
    const [cPasswordShow, setCPassword] = useState("Show");
    const [cred, setCred] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: "",
    });
    const password = useRef(null);
    const cPassword = useRef(null);
    const navigate = useNavigate();
    const passwordDisplay = () => {
        if (passwordShow === "Show") {
            setPassword("Hide");

            password.current.type = "text";
        } else {
            setPassword("Show");

            password.current.type = "password";
        }
    };

    const cPasswordDisplay = () => {
        if (cPasswordShow === "Show") {
            setCPassword("Hide");

            cPassword.current.type = "text";
        } else {
            setCPassword("Show");

            cPassword.current.type = "password";
        }
    };

    const getCreds = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    };

    const createUser = async (e) => {
        e.preventDefault();
        // const url = "http://localhost:5000/auth/signin";

        try {
            const response = await fetch(signupApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: cred.name,
                    email: cred.email,
                    password: cred.password,
                }),
            });
            const res = await response.json();

            if (res.status) {
                navigate("/Login");
                changeAlert({
                    alertType: "success",
                    alertMsg: "Login here",
                });
            } else {
                alert(res.error);
                changeAlert({
                    alertType: "danger",
                    alertMsg: res.error,
                });
            }
        } catch (error) {
            changeAlert({
                alertType: "danger",
                alertMsg: "Internal Error",
            });
        }
    };

    return (
        <>
            <div className="f-container">
                <div className="form-container">
                    <div className="head">
                        <h3>SIGN UP</h3>
                    </div>
                    <form onSubmit={createUser}>
                        <div className="info">
                            <div className="email">
                                <input
                                    placeholder="name"
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="off"
                                    onChange={getCreds}
                                />
                            </div>
                            <div className="email">
                                <input
                                    placeholder="Email"
                                    type="text"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    onChange={getCreds}
                                />
                            </div>
                            <div className="password">
                                <input
                                    ref={password}
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="off"
                                    onChange={getCreds}
                                />

                                <span
                                    className="secure password"
                                    onClick={passwordDisplay}
                                >
                                    {passwordShow}
                                </span>
                            </div>

                            <div className="password">
                                <input
                                    ref={cPassword}
                                    placeholder="Confirm Password"
                                    type="password"
                                    id="cpassword"
                                    name="cpassword"
                                    autoComplete="off"
                                    onChange={getCreds}
                                />

                                <span
                                    className="secure cpassword"
                                    onClick={cPasswordDisplay}
                                >
                                    {cPasswordShow}
                                </span>
                            </div>

                            <div className="btns">
                                <div className="log-btn">
                                    <button>SIGN UP</button>
                                </div>
                                <div className="tip">
                                    <span>Existing User</span>
                                    <Link
                                        to="/Login"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
