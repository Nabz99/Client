import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory(); // Access the history object

  // State to track whether the client is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to store the client's name
  const [clientnom, setClientNom] = useState('');
  const [clientprenom, setClientPrenom] = useState('');

  useEffect(() => {
    // Check if the client is logged in by looking at the local storage
    const storedToken = localStorage.getItem('token');
    const storedClient = localStorage.getItem('client');

    if (storedToken && storedClient) {
      // If both token and client are present, the client is logged in
      const parsedClient = JSON.parse(storedClient);
      setClientNom(parsedClient.nom); // Replace 'nom' with the actual property name of the client's name
      setClientPrenom(parsedClient.prenom);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setClientNom('');
      setClientPrenom('');
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('client');
    setIsLoggedIn(false);
    setClientNom('');
    setClientPrenom('');
    history.push('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+213 7 96 37 41 73</p>
              <p>mcpub.dz@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form className="input-group">
                  <div className="col-12 d-flex align-items-center">
                    <h3>Bienvenue Sur Notre Site Web McPub</h3>
                  </div>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {isLoggedIn ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {clientnom} {clientprenom}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout} style={{ color: 'red' }}>
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
