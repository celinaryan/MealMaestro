import React from "react";

const AuthForm = ({ user, onChange, onSubmit }) => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url("/images/food.jpeg/")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <form onSubmit={onSubmit} autoComplete="off" style={{
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
            }}>
                <h2 style={{
                    color: '#006400',
                    marginBottom: '20px'
                }}>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="first-name-input" style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem"
                }}>
                    <label htmlFor="first-name-input">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="first-name-input"
                        name="firstName"
                        placeholder="first name"
                        value={user.firstName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name-input" style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="last-name-input"
                        name="lastName"
                        placeholder="last name"
                        value={user.lastName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email-input" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email-input"
                        name="email"
                        placeholder="email"
                        value={user.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="password-input" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-input"
                        name="password"
                        placeholder="password"
                        value={user.password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" style={{
                        width: '100%',
                        backgroundColor: '#006400',
                        color: '#FFFFFF'
                    }}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;

