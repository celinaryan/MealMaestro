import React from "react"
import {useNavigate} from "react-router-dom"
import { checkUser } from "./Services/AuthService"

const ProtectedRoute = ({element: Component, ...rest}) => {
    const navigate = useNavigate()
    // Navigate to Auth in case of unauthorized user
    const goBackHandler = () => {
        navigate("/auth");
    };
    console.log("rest: ", rest);

    // return requested component if user is valid
    if (checkUser()) {
        return <Component />
    } else {
        return (
            <div>
                <p>Unauthorized!</p> <button onClick={goBackHandler}>Go Back.</button>
            </div>
        );
    };
};

    export default ProtectedRoute;
