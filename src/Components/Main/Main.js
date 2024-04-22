import React from "react";
import logo from "../Image/logo.png"; // Ensure this path is correct

/* Home Page */
const MainModule = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ textAlign: "center", width: "80%" }}> {/* Centered container with text alignment */}
            <img src={logo} className="logo" alt="Logo" />
            <h1 className="login_button">Welcome! Talk to an AI</h1>
            <div>Upload a photo here</div>
            <form>
                <label htmlFor="textbox">Type anything:</label><br />
                <textarea id="textbox" name="textbox" rows="10" cols="50" placeholder="Type anything..."></textarea>
            </form>

            <style>
                {`
                .logo {
                    display: block; /* Center the logo above the text */
                    margin: 0 auto 10px; /* Center horizontally and add space below */
                    width: 30px;
                    height: auto;
                }

                .login_button {
                    margin-bottom: 20px; /* Space below the header */
                }
                `}
            </style>
        </div>
    </div>
  )
};

export default MainModule;
