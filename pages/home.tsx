import React, { ChangeEvent } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkUser } from "../services/authService";
import Navbar from "./navbar";
import RecipeCard from "../components/RecipeCard";
import { Grid, Container } from "@mantine/core";

const uploadButtonStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#c0c0c0',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
    transition: 'background-color 0.3s',
    width: '60%'
};

const hiddenFileInputStyle: React.CSSProperties = {
    display: 'none',
};

type FileUploadProps = {
    onFilesSelected: (files: FileList) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFilesSelected(e.target.files);
        }
    };
};

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
    const [preferences, setPreferences] = useState("");
    const [recipes, setRecipes] = useState([]);

    const handleFileChange = (e: any) => {
        setFiles(e.target.files);
    };

    const handlePreferencesChange = (e: any) => {
        setPreferences(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        Array.from(files).forEach((file, index) => {
            formData.append('photos', file);
        });
        formData.append("preferences", preferences);

        // POST to your Next.js API route
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Handle the response from your API route
        try {
            if (response.ok) {
                const data = await response.json();
                const recipesArray = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
                setRecipes(recipesArray);
                console.log(data);
            }
        } catch (error) {
            alert("Received invalid JSON from GPT... please try again!");
            router.push("/home");
        }
    };

    return (
        <>
            <Navbar />
            {recipes.length !== 0 ? (
                <Grid style={{ padding: "2rem" }}>
                    {recipes.map((recipe, index) => (
                        <Grid.Col span={4} key={index}>
                            <RecipeCard recipe={recipe} />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <div style={{ textAlign: "center", width: "80%" }}>
                            <Image src="/images/logo.png"
                                width={500}
                                height={500}
                                className="logo" alt="Logo" />
                            <h1 className="login_button">Welcome! Talk to an AI</h1>


                            <form onSubmit={handleSubmit} encType="multipart/form-data" style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <label
                                    style={uploadButtonStyle}
                                    htmlFor="file-upload"
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#a0a0a0')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#c0c0c0')}
                                >
                                    Input photos
                                </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    multiple
                                    style={hiddenFileInputStyle}
                                    onChange={handleFileChange}
                                />

                                <textarea
                                    style={{
                                        padding: "0.5rem",
                                        width: '60%'
                                    }}
                                    id="textbox" name="textbox" rows="10" cols="50" placeholder="Enter any preferences (cuisine type, cooking time, serving portions, etc.)" onChange={handlePreferencesChange}
                                ></textarea>

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
                                <div className="button-container" style={{ width: '100%' }}>
                                    <button className="submit-button" type="submit" style={{ width: '60%' }}>Get Recipes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default MainModule;
