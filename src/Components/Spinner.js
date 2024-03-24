import React from "react";

export default function Spinner() {
    return (
        <div>
            <div className="d-flex justify-content-center align-content-center my-3">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}
