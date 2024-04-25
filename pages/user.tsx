import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./navbar";
import Parse from "parse";

const User = () => {
    const router = useRouter();
    const user = Parse.User.current(); 

    const [userDetails, setUserDetails] = useState({
        firstName: user?.get("firstName") || "",
        lastName: user?.get("lastName") || "",
        email: user?.get("email") || "",
        password: user?.get("password") || "",
        allergies: user?.get("allergies") || ""  
    });
    const handleLogout = async () => {
        router.push("/");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
   
        Object.entries(userDetails).forEach(([key, value]) => {
            user.set(key, value);
        });

        try {
            await user.save();
            alert("User details updated successfully!");
            router.push("/user");
        } catch (error) {
            console.error("Failed to update user details:", error);
            alert(`Failed to update user details. Please try again. Error: ${error.message}`);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>User Profile</h2>
                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-group">
                        <label>First Name:</label>
                        <p>{userDetails.firstName}</p>
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <p>{userDetails.lastName}</p>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <p>{userDetails.email}</p>
                    </div>
                    <div className="form-group">
                        <label>Allergies:</label>
                        <input
                            type="text"
                            name="allergies"
                            value={userDetails.allergies}
                            onChange={handleChange}
                            placeholder="Enter allergies"
                        />
                    </div>
                    <button type="submit" className="btn">Save Changes</button>
                    
                </form>
                
            </div>
            <div className="button-container">
                <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
            
            <style jsx global>{`
                html, body, #__next {
                    height: 100%;  
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center; 
                    height: 100%;  
                    padding: 20px;
                    background-color: white; 
                    border-radius: 8px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
                    width: 80%;
                    max-width: 800px;
                    margin: auto; 
                }
                .user-form {
                    width: 100%;
                    padding: 20px;
                    border: none;
                    background-color: #f9f9f9;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                p {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    background-color: #eee;
                }
                input[type="text"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
                .btn {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 3px;
                    background-color: #4CAF50; 
                    color: #fff;
                    cursor: pointer;
                }
                .button-container {
                    display: flex;
                    align-items: center;
                    justify-content: center; // Center the button horizontally
                    margin-top: 20px;
                    width: 200px;
                }
                .btn-primary {
                    width: 200px; 
                    padding: 10px 15px; // Adjust padding if needed
                    background-color: #4CAF50; // Green background
                    color: #fff; // White text
                    border-radius: 3px; // Rounded corners
                    cursor: pointer; // Pointer cursor on hover
                }
                .btn:hover {
                    background-color: #45a049; 
                }
            
            `}</style>
        </div>
    );
};

export default User;
