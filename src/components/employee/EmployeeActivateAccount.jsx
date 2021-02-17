import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Illustration from "../../assets/illustration.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const EmployeeActivateAccount = () => {
    const successNotify = () => toast.success("Account Activated successfully");
    const ErrorNotify = (message) => toast.error(message);
    
    const history = useHistory();

    useEffect(() => {
        const activateAccount = async (event) => {
            // setLoading(true);
            const url = `https://devvishal-invoice-server.herokuapp.com/api/employee/activate_account`;
            let urlWithParams = "";
            urlWithParams = window.location.href;    
            // event.preventDefault();
            console.log("parameters are :" + urlWithParams);
            let urlId = urlWithParams.split("?id=")[1].split("&ac=")[0];
            let urlRandomString = urlWithParams.split("?id=")[1].split("&ac=")[1];
            const response = { objectId: urlId, randomString: urlRandomString };
            axios({
                url: url,
                method: "POST",
                data: response,
            })
                .then((response) => {
                    successNotify();
                    setTimeout(async () => {
                        history.push('/employeelogin');
                    }, 5000);
                })
                .catch((err) => {
                console.log(err);
                ErrorNotify("Unauthorized Access. Account activation Failed");                
                setTimeout(async () => {
                    history.push('/#Login');
                }, 5000);
                });
        };
        activateAccount();
      }, [history]);
      

    return (
        <React.Fragment>
        <ToastContainer />
        <div className="login-container">
          <div className="flexbox">
            <div className="illustrator">
              <img src={Illustration} alt="illustration" />
            </div>
            <div className="login">
                <div className="headliner">Account Activation Page</div>
            </div>
          </div>
        </div>   
        </React.Fragment>
    );
    };

export default EmployeeActivateAccount;
