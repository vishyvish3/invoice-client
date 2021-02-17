import React, { useState } from "react";
import ErrorMsg from '../ErrorMsg';
import { useHistory } from "react-router-dom";

// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AdminChangePassword = () => {
    const [email, setEmail] = useState("");
    // const [isLoading, setLoading] = useState(false);

    const successNotify = () => toast.success("Succesfully Sent email to reset Password");

    const history = useHistory();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    const [validEmail, setValidEmail] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    
    const url = `http://localhost:4050/api/admin/changePassword`;

    const validateAndSetEmail = (v) => {
        if (emailPattern.test(v)) {
          setValidEmail(true);
          setShowEmailError(false);
        } else {
          setValidEmail(false);
          setShowEmailError(true);
        }
        setEmail(v);
      };
      const ErrorNotify = (message) => toast.error(message);

    const sendPasswordResetLink = async (event) => {
            // setLoading(true);
            event.preventDefault();
            const response = { email: email };
            axios({
                url: url,
                method: "PUT",
                data: response,
            })
                .then((response) => {
                // setLoading(false);
                successNotify();
                if (response.data.message) {
                    ErrorNotify(response.data.message);
                } else {
                    // setLoading(false);
                }
                })
                .catch((err) => {
                console.log(err);
                // setLoading(false);
                ErrorNotify("Incorrect Credentials");
                });
    };
      
    

    return (
        <React.Fragment>
        <ToastContainer />
        <div className="login-container">
          <div className="flexbox">
            
            <div className="login form_main">
                <div className="headliner">Change Password</div>
              <input
                type="text"
                placeholder="enter email"
                onChange={(e) => validateAndSetEmail(e.target.value)}
              />
              <ErrorMsg show={showEmailError} msg={'Invalid e-mail!'} />
              
             <div className="d-flex">
             <button type="button" onClick={(e) => sendPasswordResetLink(e)} disabled={!validEmail}>
                Confirm Email
              </button>
              <button
                type="button"
                style={{ marginLeft: "2rem" }}
                onClick={(event) => {
                  event.preventDefault();
                  history.push("/#Login");
                }}
              >
                Back
              </button>
             </div>
            </div>
          </div>
        </div>     
        </React.Fragment>
    );
    };

export default AdminChangePassword;
