import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "../../Common/Services/AuthService";
import { useNavigate } from "react-router-dom";
import backgroundImageUrl from "../Image/food.jpeg";  // Ensure the path is correct

const AuthLogin = () => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({
        email: "",
        password: ""
    });

    const [add, setAdd] = useState(false);

    useEffect(() => {
        if (checkUser()) {
            alert("You are already logged in");
            navigate("/home");
        }
    }, [navigate]);

    useEffect(() => {
        if (currentUser && add) {
            loginUser(currentUser).then(userLoggedIn => {
                if (userLoggedIn) {
                    alert(`${userLoggedIn.get("firstName")} you successfully logged in.`);
                    navigate("/");
                }
                setAdd(false);
            });
        }
    }, [navigate, currentUser, add]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setAdd(true);
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <form onSubmit={onSubmitHandler} style={{
                textAlign: 'center',
                width: '400px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '5px',
                backdropFilter: 'blur(10px)'
            }} className="card">
                <h2 style={{ color: '#006400', marginBottom: '20px' }}>Login</h2>
                <div className="form-group">
                    <label htmlFor="email-input">Email</label>
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
                <div className="form-group">
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

