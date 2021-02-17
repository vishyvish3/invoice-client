import React from "react";
import Logo from "../assets/logo@2x.png";
import banner from "../assets/banner.webp";

import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="navbar-container">
          <nav>
            <div className="logo-container">
              
            </div>
            <div className="navlist-container">
            
              <div class="dropdown">
            <button class="dropbtn">Login</button>
            <div class="dropdown-content">
            <Link to="/employeelogin">
            Employee 
            </Link>
            <Link to="/managerlogin">
            Manager 
            </Link>
            <Link to="/adminlogin">
            Admin 
            </Link>
            </div>
          </div>

            </div>
          </nav>
        </div>
        <div className="img-container">
          <img src={Logo} alt="logo"/>
        </div>
        <div >
          <img src={banner} alt="logo"/>
        </div>
      </div>



     
    </React.Fragment>
  );
};

export default LandingPage;
