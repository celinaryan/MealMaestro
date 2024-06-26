import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkUser, loginUser } from "../services/authService";

const AuthLogin = () => {
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState({
        email: "",
        password: ""
    });

    const [add, setAdd] = useState(false);

    useEffect(() => {
        if (checkUser()) {
            router.push("/home");
        }
    }, [router]);

    useEffect(() => {
        if (currentUser && add) {
            loginUser(currentUser).then(userLoggedIn => {
                if (userLoggedIn) {
                    router.push("/home");
                }
                setAdd(false);
            });
        }
    }, [router, currentUser, add]);

    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        setAdd(true);
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url('/images/food.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <form onSubmit={onSubmitHandler} style={{
                textAlign: 'center',
                width: '400px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '5px',
                backdropFilter: 'blur(10px)',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem"
            }} className="card">
                <h2 style={{ color: '#006400', marginBottom: '20px' }}>Login</h2>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem"
                }}>
                    <label htmlFor="email-input" style={{
                        width: "73px"
                    }}>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email-input"
                        name="email"
                        value={currentUser.email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem"
                }}>
                    <label htmlFor="password-input">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-input"
                        name="password"
                        value={currentUser.password}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <button type="submit" className="btn" style={{
                    width: '100%',
                    backgroundColor: '#006400',
                    color: '#FFFFFF'
                }}>Login</button>
            </form>
        </div>
    );
};

export default AuthLogin;

