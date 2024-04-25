import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();

    const handleNavigation = (route) => {
        router.push(route);
    };

    return (
        <nav>
            <ul className="navbar">
                <li className="navbar-item">
                    <button onClick={() => handleNavigation("/home")}>Home</button>
                </li>
                <li className="navbar-item">
                    <button onClick={() => handleNavigation("/user")}>Profile</button>
                </li>
            </ul>

            <style jsx>{`
                nav {
                    background-color: #333;
                    padding: 5px;
                    height: 50px; // Set a fixed height for the navbar
                }
                .navbar {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    align-items: center; // Ensure items are vertically centered
                }
                .navbar-item {
                    margin-right: 20px;
                    height: 40px;
                    width: 60px;
                    display: flex;
                    align-items: center; // Vertically center the content of navbar items
                }
                .navbar-item:last-child {
                    margin-right: 0;
                }
                button {
                    display: block; 
                    margin: 20px auto; /* Vertical space and centering */
                    padding: 10px 20px; /* Button padding for better touch */
                    background-color: #333; /* A nice shade of green */
                    color: white; /* Text color */
                    border: none; /* Remove default border */
                    border-radius: 5px; /* Rounded corners */
                    cursor: pointer; /* Pointer cursor on hover */
                }
                button:hover {
                    background-color: #28a745; // Make button background green on hover
                    color: #fff; // Keep text color white on hover
                }
            `}</style>

        </nav>
    );
};

export default Navbar;
