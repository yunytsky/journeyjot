const Header = () => {
    return (
      <header className="bg-white shadow-sm" style={{padding: "0 2em"}}>
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand font-weight-bold text-primary" href="#home">
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
                <li className="nav-item">
                  <a className="nav-link" href="#journeys">Journeys</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#map">Map</a>
                </li>
              </ul>
              <button className="btn text-danger">Logout</button>
            </div>
          </nav>
      </header>
    );
  };

export default Header;