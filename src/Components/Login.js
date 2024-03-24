import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context/User/UserContext";
import "../Login.css";
export default function Login() {
    const loginApi = process.env.REACT_APP_LOGIN;

    const alertContext = useContext(UserContext);
    const { changeAlert, userUpdate, getUsername } = alertContext;

    const [show, setShow] = useState("Show");
    const [cred, setCred] = useState({ email: "", password: "" });
    const input = useRef(null);
    const navigate = useNavigate();
    const display = (e) => {
        if (show === "Show") {
            setShow("Hide");

            input.current.type = "text";
        } else {
            setShow("Show");

            input.current.type = "password";
        }
    };

    const getCreds = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    };

    const getUser = async (e) => {
        e.preventDefault();
        // const url = "http://localhost:5000/auth/login";

        try {
            const response = await fetch(loginApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: cred.email,
                    password: cred.password,
                }),
            });
            const res = await response.json();

            if (res.status) {
                localStorage.setItem("token", res.authToken);
                navigate("/");
                changeAlert({
                    alertType: "success",
                    alertMsg: "Logged in",
                });
                userUpdate(true);

                getUsername();
            } else {
                changeAlert({
                    alertType: "danger",
                    alertMsg: res.error,
                });
                userUpdate(false);
            }
        } catch (error) {
            changeAlert({
                alertType: "danger",
                alertMsg: "Internal Error",
            });
            userUpdate(false);
        }
    };

    return (
        <>
            <div className="f-container">
                <div className="form-container">
                    <div className="head">
                        <h3>LOGIN</h3>
                    </div>
                    <form onSubmit={getUser}>
                        <div className="info">
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
                                    ref={input}
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="off"
                                    onChange={getCreds}
                                />

                                <span className="secure" onClick={display}>
                                    {show}
                                </span>
                            </div>

                            <div className="btns">
                                <div className="log-btn">
                                    <button>Login</button>
                                </div>
                                <div className="tip">
                                    <span>Don't have an account</span>
                                    <Link
                                        to="/Signup"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Sign up
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
