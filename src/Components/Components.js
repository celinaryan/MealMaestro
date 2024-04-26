import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainModule from "./Main/Main";
import AuthModule from "./Auth/Auth.js"
import AuthRegister from "./Auth/AuthRegister.js"
import ProtectedRoute from "../Common/ProtectedRoute";
import AuthLogin from "./Auth/AuthLogin";
import LogOut from "./LogOut/LogOut";
import Navbar from './Navbar/Navbar';
import SearchModule from "./Main/Search";


/* Routing */
/* TODO: re-navigate logout to home and load current user on login */
/* TODO: refresh components on login */
export default function Components() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/auth" element={<AuthModule />} />
                <Route path="/login" element={<AuthLogin />} />
                <Route path={"/register"} element={<AuthRegister />} />
                <Route path="/home" element={<ProtectedRoute element={MainModule} />} />
                <Route path="/search" element={<ProtectedRoute element={SearchModule} />} />
                <Route path="*" element={<Navigate to="/auth" replace/>} />
            </Routes>
            <div>
                <LogOut/>
            </div>

        </Router>
    );
}
