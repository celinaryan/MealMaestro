import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkUser } from "../services/authService";
import Navbar from "./navbar";


/* Home Page */
const MainModule = () => {

    const router = useRouter();
    // Check if the user is logged in
    useEffect(() => {
        if (!checkUser()) {
            router.push("/");
        }
    }, [router]);

    const [files, setFiles] = useState([]);
    const handleFileChange = (e: any) => {
        setFiles(e.target.files);
    };

    const handleLogout = async () => {
        router.push("/");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        Array.from(files).forEach((file, index) => {
            formData.append('photos', file);
        });

        /*
         * TODO:
         * Commenting this stuff for now bc UI doesn't support it
         *
        formData.append('cookingTime', cookingTime.join('-'));
        formData.append('cuisineType', selectedCuisines.join(', '));
        formData.append('cookingLevel', selectedLevels.join(', '));
        */

        // POST to your Next.js API route
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        

        // Handle the response from your API route
        const data = await response.json();
        if (response.ok) {
            alert('Recipes fetched successfully!');
            console.log(data)
            // Process and display the recipes data
        } else {
            alert(`Failed to fetch recipes: ${data.error}`);
            console.log(data)
        }

    };

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div style={{ textAlign: "center", width: "80%" }}> 
                    <Image src="/images/logo.png"
                        width={500}
                        height={500}
                        className="logo" alt="Logo" />
                    <h1 className="login_button">Welcome! Talk to an AI</h1>

                    
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input multiple type="file" onChange={handleFileChange} accept="image/*" />
                    

                        <label htmlFor="textbox">Type anything:</label><br />
                        <textarea id="textbox" name="textbox" rows="10" cols="50" placeholder="Type anything..."></textarea>
                        <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>

                        <style>
                            {`
                                .logo {
                                    display: block; /* Center the logo above the text */
                                    margin: 0 auto 10px; /* Center horizontally and add space below */
                                    width: 90px;
                                    height: 90px;
                                }

                                .login_button {
                                    margin-bottom: 20px; /* Space below the header */
                                }

                                button {
                                    display: block;
                                    margin: 20px auto; /* Vertical space and centering */
                                    padding: 10px 20px; /* Button padding for better touch */
                                    background-color: #4CAF50; /* A nice shade of green */
                                    color: white; /* Text color */
                                    border: none; /* Remove default border */
                                    border-radius: 5px; /* Rounded corners */
                                    cursor: pointer; /* Pointer cursor on hover */
                                }

                                button:hover {
                                    background-color: #45a049; /* Darker shade on hover */
                                }
                            `}
                        </style>
                        <div className="button-container">
                            <button className="submit-button" type="submit">Get Recipes</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
};

export default MainModule;
