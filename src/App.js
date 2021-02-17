import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//ROUTES
import LandingPage from "./components/LandingPage";
import "./styles/style.css";

//ADMIN ROUTES
import AdminLogin from "./components/admin/AdminLogin";

import AdminInvoice from "./components/admin/Invoice/AllInvoice";
import AdminService from "./components/admin/Invoice/Invoice";
import AdminAddInvoice from "./components/admin/Invoice/AddForm";

import AdminAddUser from "./components/admin/User/AddUser";
import AdminAllUsers from "./components/admin/User/AllUser";

//MANAGER ROUTES
import ManagerLogin from "./components/manager/ManagerLogin";

import ManagerInvoice from "./components/manager/Invoice/AllInvoice";
import ManagerAddService from "./components/manager/Invoice/AddForm";
import ManagerService from "./components/manager/Invoice/Invoice";

import ManagerAddUser from "./components/manager/User/AddUser";
import ManagerAllUsers from "./components/manager/User/AllUser";


//EMPLOYEE ROUTES
import EmployeeLogin from "./components/employee/EmployeeLogin";

import EmployeeInvoice from "./components/employee/Invoice/AllInvoice";
import EmployeeAddService from "./components/employee/Invoice/AddForm";
import EmployeeService from "./components/employee/Invoice/Invoice";

import EmployeeChangePassword from "./components/employee/EmployeeChangePassword";
import ManagerChangePassword from "./components/manager/ManagerChangePassword";
import AdminChangePassword from "./components/admin/AdminChangePassword";

import AdminDashboardMain from './components/admin/dashboard/dash';
import ManagerDashboardMain from './components/manager/dashboard/dash';
import EmployeeDashboardMain from './components/employee/dashboard/dash';


import AdminPasswordReset from "./components/admin/AdminPasswordReset";
import ManagerPasswordReset from "./components/manager/ManagerPasswordReset";
import EmployeePasswordReset from "./components/employee/EmployeePasswordReset";

import EmployeeActivateAccount from "./components/employee/EmployeeActivateAccount"
import ManagerActivateAccount from "./components/manager/ManagerActivateAccount"
import AdminActivateAccount from "./components/admin/AdminActivateAccount"

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>

          <Route path="/admindashboard/dashboardMain"  component={AdminDashboardMain} />
          <Route path="/managerdashboard/dashboardMain"  component={ManagerDashboardMain} />
          <Route path="/employeedashboard/dashboardMain"  component={EmployeeDashboardMain} />

          <Route path="/" exact component={() => <LandingPage />} />
          <Route path="/admin/passwordreset" exact component={() => <AdminPasswordReset />} />
          <Route path="/adminlogin" exact component={() => <AdminLogin />} />
          <Route path="/adminchangepassword" exact component={() => <AdminChangePassword />} />
          <Route
            path="/admindashboard/invoice"
            exact
            component={() => <AdminInvoice />}
          />
          <Route
            path="/admindashboard/invoice/add"
            exact
            component={() => <AdminAddInvoice />}
          />
          <Route
            path="/admindashboard/invoice/:id"
            exact
            component={AdminService}
          />
          
          <Route
            path="/admindashboard/allusers"
            exact
            component={AdminAllUsers}
          />
          <Route
            path="/admindashboard/adduser"
            exact
            component={AdminAddUser}
          />
          <Route
            path="/managerlogin"
            exact
            component={() => <ManagerLogin />}
          />
          <Route path="/managerchangepassword" exact component={() => <ManagerChangePassword />} />
          <Route
            path="/managerdashboard/invoice"
            exact
            component={() => <ManagerInvoice />}
          />
          <Route
            path="/managerdashboard/invoice/add"
            exact
            component={ManagerAddService}
          />
          <Route
            path="/managerdashboard/invoice/:id"
            component={ManagerService}
          />
          
          <Route path="/manager/passwordreset" exact component={() => <ManagerPasswordReset />} />
          <Route
            path="/managerdashboard/allusers"
            exact
            component={ManagerAllUsers}
          />
          <Route
            path="/managerdashboard/adduser"
            exact
            component={ManagerAddUser}
          />

          <Route
            path="/employeelogin"
            exact
            component={() => <EmployeeLogin />}
          />
          <Route path="/employeechangepassword" exact component={() => <EmployeeChangePassword />} />
          <Route
            path="/employeedashboard/invoice"
            exact
            component={() => <EmployeeInvoice />}
          />
          <Route
            path="/employeedashboard/invoice/add"
            exact
            component={EmployeeAddService}
          />
          <Route
            path="/employeedashboard/invoice/:id"
            exact
            component={EmployeeService}
          />
          
          <Route path="/employee/passwordreset" exact component={() => <EmployeePasswordReset />} />
          <Route path="/employee/activateAccount" exact component={() => <EmployeeActivateAccount />} />
          <Route path="/manager/activateAccount" exact component={() => <ManagerActivateAccount />} />
          <Route path="/admin/activateAccount" exact component={() => <AdminActivateAccount />} />

        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
