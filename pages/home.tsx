import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/router';

/* Home Page */
const MainModule = () => {
    const [files, setFiles] = useState([]);
    const router = useRouter();

    const handleFileChange = (e: any) => {
        setFiles(e.target.files);
    };
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
  
    
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
            router.push('/recipes');
            // Process and display the recipes data
        } else {
            // alert(`Failed to fetch recipes: ${data.error}`);
            console.log(data)
            alert(`Failed to fetch recipes: ${data}`);
        }
        // After fetching the data
        
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ textAlign: "center", width: "80%" }}> {/* Centered container with text alignment */}
                <Image src="/images/logo.png"
                    width={500}
                    height={500}
                    className="logo" alt="Logo" />
                <h1 className="login_button">Welcome! Talk to AI and Get Recipes.</h1>

                {/* Button for uploading ingredients */}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    Upload Ingredients: 
                    <input multiple type="file" onChange={handleFileChange} accept="image/*" />
                    
                    <br /><br />
                    <label htmlFor="textbox">Type any other requests:</label><br />
                    <textarea id="textbox" name="textbox" rows="10" cols="50" placeholder="Type anything..."></textarea>

                    <style>
                        {`
                .logo {
                    display: block; /* Center the logo above the text */
                    margin: 0 auto 10px; /* Center horizontally and add space below */
                    width: 100px;
                    height: auto;
                }

                .login_button {
                    margin-bottom: 20px; /* Space below the header */
                }

                button {
                    display: block; /* Center the button */
                    margin: 20px auto; /* Vertical space and centering */
                    padding: 10px 20px; /* Button padding for better touch */
                    background-color: #009cf7; /* mm blue */
                    color: white; /* Text color */
                    border: none; /* Remove default border */
                    border-radius: 5px; /* Rounded corners */
                    cursor: pointer; /* Pointer cursor on hover */
                }

                button:hover {
                    background-color: #009cf7; /* mm blue */
                }
                `}
                    </style>
                    <div className="button-container">
                        <button className="submit-button" type="submit">Get Recipes</button>
                    </div>
                </form>
            </div>

        </div>
    )
};

export default MainModule;
