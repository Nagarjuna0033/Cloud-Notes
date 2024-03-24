import React, { useState } from "react";

import UserContext from "./UserContext";

const UserState = (props) => {
    const [user, setUser] = useState(false);
    const [alertMsg, setAlert] = useState(null);
    const [username, setUsername] = useState(null);

    const getUsernameAPI = process.env.REACT_APP_GET_USER;

    const userUpdate = (e) => {
        setUser(e);
    };

    const changeAlert = (e) => {
        setAlert(e);
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    const changeUsername = (e) => {
        setUsername(e);
    };

    const getUsername = async () => {
        if (localStorage.getItem("token")) {
            try {
                const response = await fetch(getUsernameAPI, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authToken: localStorage.getItem("token"),
                    },
                });

                const res = await response.json();

                changeUsername(res.name);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                userUpdate,
                alertMsg,
                changeAlert,
                username,
                changeUsername,
                getUsername,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
