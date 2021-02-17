import React, { useState } from "react";
import Sidenav from "../Sidenav";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const token = localStorage.getItem("token");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spAccessValue, setSpAccessValue] = useState("No");

  const successNotify = () => toast.success("Succesfully User Added");
  const failedNotify = (message) => toast.error(message);

  const history = useHistory();

  //ADD EMPLOYEE
  const addUser = (e) => {
    console.log("inside addUser function in file AddUser.jsx client");
    e.preventDefault();
    
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

  
    const request = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      spAccessValue: spAccessValue
    };

    const url =
      "http://localhost:4050/api/employee/register";
      axios
      .post(url, request, {
        headers: headers,
      })
      .then((response) => {
        if (response.data) {
          console.log("succesfuly got response  in employee/register "+ response);
          successNotify();
        } else {
          failedNotify(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        failedNotify("Failed to Add User");
      });
  
    
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setSpAccessValue("");
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="dashboard">
        <div className="sidebar">
          <Sidenav />
        </div>
        <div className="main-content">
          <div className="header">
            <div className="title">Add Employee</div>
          </div>
          <hr />
          <div className="content">
          <form className="add-form" onSubmit={addUser}>
            <div className="add-form">
              <input
                type="text"
                name="fname"
                value={fname}
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
              />
              <input
                type="text"
                name="lname"
                value={lname}
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
              />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="pwd"
                alue={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              

              <select
                name="type"
                id="type"
              >
                <option value="Employee">Employee</option>
              </select>

              <select
                    name="spAccessValue"
                    id="spAccessValue"
                    onChange={(e) => setSpAccessValue(e.target.value)}
                    required
                  >
                    <option value="">-- Select Special Access Value --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

              <div className="button-container">
                <button >Add User</button>
                <button type="button" onClick={() => history.goBack()}>
                  Back
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddUser;
