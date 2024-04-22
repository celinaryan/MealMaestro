import React from 'react';
import { Link } from "react-router-dom";
import Parse from "parse";

const Navbar = () => {
    const user = Parse.User.current();

    return (
        
        <nav style={{ backgroundColor: "#f8f9fa", padding: "10px 20px" }}>
            <ul style={{
                listStyleType: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div> {/* Wrapper div for the first three list items */}
                    <li style={{ display: "inline", marginRight: "20px" }}>
                        <Link to="/">Home</Link>
                    </li>
                    <li style={{ display: "inline", marginRight: "20px" }}>
                        <Link to="/search">Search</Link>
                    </li>
                    <li style={{ display: "inline", marginRight: "20px" }}>
                        <Link to="/user">Discover</Link>
                    </li>
                </div>
                <li style={{ display: "inline" }}> 
                    Current User: {user?.get("firstName")} {user?.get("lastName")}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

