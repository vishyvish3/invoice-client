import React, { useState } from "react";
import ErrorMsg from '../ErrorMsg';
import { useHistory } from "react-router-dom";
import Illustration from "../../assets/illustration.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ManagerPasswordReset = () => {
    const [password, setPassword] = useState("");
    const [reEnteredpPassword, setReEnteredpPassword] = useState("");

    const successNotify = () => toast.success("Password updated successfully");

    const history = useHistory();
    const [showPasswordError, setShowPasswordError] = useState(false);
    
    const url = `http://localhost:4050/api/manager/verifyPasswordChange`;
    const updatePasswordurl = `http://localhost:4050/api/manager/updatePassword`;
    


    const ErrorNotify = (message) => toast.error(message);
    let urlWithParams = "";
    urlWithParams = window.location.href;    

    const resetPassword = async (event) => {
            // setLoading(true);
            event.preventDefault();
            if(password !== reEnteredpPassword) {
                ErrorNotify("Passwords did not match");
                return;
            }
            
            console.log("parameters are :" + urlWithParams);
            let urlId = urlWithParams.split("?id=")[1].split("&rs=")[0];
            let urlRandomString = urlWithParams.split("?id=")[1].split("&rs=")[1];
            const response = { objectId: urlId, randomString: urlRandomString };
            axios({
                url: url,
                method: "POST",
                data: response,
            })
                .then((response) => {
                
                if (response.data.message) {
                    const updatePasswordRequest = { objectId: urlId, password: password };
                    axios({
                        url: updatePasswordurl,
                        method: "PUT",
                        data: updatePasswordRequest,
                    }).then((response) => {
                        successNotify(response.data.message);
                    })
                } else {
                }
                })
                .catch((err) => {
                console.log(err);
                ErrorNotify("Incorrect Credentials");
                });
    };
      
    const validateAndSetPassword = (v) => {
        if (v.length < 1) {
        //   setValidPassword(false);
          setShowPasswordError(true);
        } else {
        //   setValidPassword(true);
          setShowPasswordError(false);
        }
        setPassword(v);
      };

    const validateAndSetReEnteredPassword = (v) => {
        if (v.length < 1) {
        //   setValidPassword(false);
          setShowPasswordError(true);
        } else {
        //   setValidPassword(true);
          setShowPasswordError(false);
        }
        setReEnteredpPassword(v);
      };  

    return (
        <React.Fragment>
        <ToastContainer />
        <div className="login-container">
          <div className="flexbox">
            <div className="illustrator">
              <img src={Illustration} alt="illustration" />
            </div>
            <div className="login">
                <div className="headliner">Reset Password</div>
                <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => validateAndSetPassword(e.target.value)}
                />
                <ErrorMsg show={showPasswordError} msg={'Empty password!'} />
                <input
                type="password"
                placeholder="Re-Enter new password"
                onChange={(e) => validateAndSetReEnteredPassword(e.target.value)}
                />
              
              <button type="button" onClick={(e) => resetPassword(e)}>
                Confirm
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
        
                
        </React.Fragment>
    );
    };

export default ManagerPasswordReset;
