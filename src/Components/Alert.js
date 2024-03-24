import React, { useContext } from "react";

import UserContext from "../Context/User/UserContext";

export default function Alert() {
    const alertContext = useContext(UserContext);

    const { alertMsg } = alertContext;

    return (
        <div>
            {alertMsg ? (
                <div
                    key="unique"
                    className={`alert alert-${alertMsg.alertType} alert-dismissible fade show`}
                    role="alert"
                >
                    <strong>
                        {alertMsg.alertType === "danger" ? "Error  " : ""}
                    </strong>
                    {alertMsg.alertMsg}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
