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
                <h2>User Details</h2>
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
                <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 20px;
                        background-color: white; // Set background to white
                        border-radius: 8px; // Added border-radius for a softer edge
                        box-shadow: 0 2px 12px rgba(0,0,0,0.1); // Added subtle shadow for depth
                        width: 80%; // Increase width for a larger form
                        max-width: 800px; // Maximum width to avoid overly wide forms on large screens
                        margin: 20px auto; // Center the form horizontally
                    }

                    .user-form {
                        width: 100%; // Make the form take full container width
                        padding: 20px;
                        border: none; // Remove border
                        background-color: #f9f9f9;
                    }

                    .form-group {
                        margin-bottom: 15px;
                    }

                    label {
                        display: block;
                        font-weight: bold;
                        margin-bottom: 5px; // Space between label and input/paragraph
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

                    button {
                        width: 100%;
                        padding: 10px;
                        border: none;
                        border-radius: 3px;
                        background-color: #007bff;
                        color: #fff;
                        cursor: pointer;
                    }

                    button:hover {
                        background-color: #0056b3;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default User;
