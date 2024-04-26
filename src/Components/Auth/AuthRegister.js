import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {checkUser, createUser} from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm"

const AuthRegister = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:"",
    });

    const [add, setAdd] = useState(false);

    useEffect(() => {
        if (checkUser()) {
            alert("You are already logged in");
            navigate("/home");
        }
    }, [navigate])

    useEffect(() => {
        if (newUser && add) {
            createUser(newUser).then((userCreated) => {
                if (userCreated) {
                    alert(
                        `${userCreated.get("firstName")}, you successfully registered`
                    );
                    navigate("/")
                }
                setAdd(false);
            });
        }
    }, [navigate, newUser, add]);

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        const { name, value: newValue} = e.target;
        console.log(newValue);
        setNewUser({ ...newUser, [name]: newValue})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("submitted: ", e.target);
        setAdd(true);
    }

    return (
        <div>
            <AuthForm
                user={newUser}
                onChange={onChangeHandler}
                onSubmit={onSubmitHandler}
            />
        </div>
    );
};

    export default AuthRegister;
