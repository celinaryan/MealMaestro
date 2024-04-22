import React from "react";
import {logOutUser} from "../../Common/Services/AuthService";

/* Logs Out the user on button click */
const LogOut = () => {
    return (
        <button onClick={logOutUser}>
            Log Out
        </button>
    )
}

export default LogOut;
