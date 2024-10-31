import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <header className="bg-white shadow-sm" style={{ padding: "0 2em" }}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand font-weight-bold text-primary" href="/">
                    journeyjot.
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {user && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/journeys"
                                        className={({ isActive }) => (isActive ? "nav-link fw-medium" : "nav-link")}
                                    >
                                        Journeys
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/map"
                                        className={({ isActive }) => (isActive ? "nav-link  fw-medium" : "nav-link")}
                                    >
                                        Map
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/statistics"
                                        className={({ isActive }) => (isActive ? "nav-link  fw-medium" : "nav-link")}
                                    >
                                        Statistics
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {user ? (
                        <button className="btn text-danger" onClick={handleLogout}>Log out</button>
                    ) : (
                        <>
                            <NavLink
                                to="/auth"
                                className="btn btn-link" 
                                style={{ color: "#2e302f" }}
                            >
                                Sign up
                            </NavLink>
                            <NavLink
                                to="/auth"
                                className="btn btn-link"
                                style={{ color: "#2e302f" }}
                            >
                                Log in
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
