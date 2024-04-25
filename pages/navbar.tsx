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
                    <button onClick={() => handleNavigation("/user")}>User</button>
                </li>
            </ul>

            <style jsx>{`
                nav {
                    background-color: #333;
                    padding: 5px;
                    height: px;
                }
                .navbar {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                .navbar-item {
                    margin-right: 20px;
                }
                .navbar-item:last-child {
                    margin-right: 0;
                }
                button {
                    background: none;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    font-size: 16px;
                    text-align: left;
                }
                button:hover {
                    text-decoration: underline;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
