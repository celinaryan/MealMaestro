import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "../../Common/Services/AuthService";
import backgroundImageUrl from "../Image/food.jpeg"; 

const AuthModule = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (checkUser()) {
            navigate("/home");
        }
    }, [navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center',
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '0 10%' 
        }}>
            <h1 style={{
                color: '#FFFFFF', 
                fontSize: '64px', 
                maxWidth: '40%', 
                textAlign: 'left' 
            }}>
                Welcome.
            </h1>
            <div className="card p-4" style={{
                textAlign: 'center',
                width: '400px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button className="btn" style={{
                            width: '100%',
                            backgroundColor: '#006400',
                            color: '#FFFFFF'
                        }}>Login</button>
                    </Link>
                </div>
                <div style={{ fontSize: 'small', marginBottom: '20px' }}>OR</div>
                <div>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-secondary" style={{ width: '100%' }}>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthModule;

