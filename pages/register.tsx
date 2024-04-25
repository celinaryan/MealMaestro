
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkUser, createUser } from "../services/authService";
import AuthForm from "./authForm"

const AuthRegister = () => {
    const router = useRouter()
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [add, setAdd] = useState(false);

    useEffect(() => {
        if (checkUser()) {
            router.push("/home");
        }
    }, [router])

    useEffect(() => {
        if (newUser && add) {
            createUser(newUser).then((userCreated) => {
                if (userCreated) {
                    router.push("/home")
                }
                setAdd(false);
            });
        }
    }, [router, newUser, add]);

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        console.log(e.target);
        const { name, value: newValue } = e.target;
        console.log(newValue);
        setNewUser({ ...newUser, [name]: newValue })
    }

    const onSubmitHandler = (e: any) => {
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
