import React from "react";
import { NavLink, Link } from "react-router-dom";

const delToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
};
const Sidenav = () => {
  return (
    <React.Fragment>
      <nav className="nav">
        <ul>
        <li>
            <NavLink
              to="/employeedashboard/dashboardMain"
              className="nav-items"
              activeClassName={`nav-items active`}
            >
              <i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employeedashboard/invoice"
              className="nav-items"
              activeClassName={`nav-items active`}
            >
                <i className="fa fa-ticket" aria-hidden="true"></i> Invoice
            </NavLink>
          </li>
          
          <li>
            <Link
              onClick={() => delToken()}
              to="/employeelogin"
              className="nav-items"
            >
             <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Sidenav;
