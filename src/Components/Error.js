import React from "react";

export default function Error(props) {
    return (
        <>
            <div
                class="d-flex justify-content-center 
                 align-items-center mt-5"
            >
                <div class="col-md-12 text-center">
                    <h1>{props.errName}</h1>
                    <h2>{props.errDesc}</h2>
                </div>
            </div>
        </>
    );
}
