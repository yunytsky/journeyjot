import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const {user} = useContext(UserContext);

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
                    <a className="nav-link" href="/journeys">Journeys</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/map">Map</a>
                  </li>
                </>
              )}
            </ul>
            {user ? (
              <button className="btn text-primary">Log out</button>
            ) : (
              <>
                <NavLink to="/auth" className="btn btn-link" style={{color: "grey"}}>Sign up</NavLink>
                <NavLink to="/auth" className="btn btn-link" style={{color: "grey"}}>Log in</NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
    );
  };

export default Header;