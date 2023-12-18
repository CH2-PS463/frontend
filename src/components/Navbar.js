import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const Navbar = () => {
  const [isActive, setisActive] = useState(false);

  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_HOST}/auth/logout`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const Predict = () => {
    navigate("/predict");
  }

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/dashboard">
            <h1>Satria Sayur</h1>
          </Link>

          <button onClick={() => {
            setisActive(!isActive);
          }} className={`navbar-burger burger ${isActive ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <Link to="/dashboard" className="navbar-item">
              Home
            </Link>
            <Link to="/satwa" className="navbar-item">
              Satwa
            </Link>
            <Link to="/donasi" className="navbar-item">
              Donasi
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={Predict} className="button is-link">
                  Predict
                </button>
                <button onClick={Logout} className="button is-light">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
