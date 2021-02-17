import React, { useState } from "react";
import Sidenav from "../Sidenav";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DelUser = () => {
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");
  const history = useHistory();

  const successNotify = () => toast.success("Succesfully Deleted User");
  const failedNotify = () => toast.error("Failed to Delete User");


  const delUser = () => {
    console.log("delete");
    const request = {
      email: email,
    };
    console.log(request);
    axios.delete("https://devvishal-invoice-server.herokuapp.com/api/admin/deleteuser", request, {
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((response) => {
        console.log("response received in delete on allUser in admin is: ",response);
        setLoading(false);
        if(response.data === "deleted succesfully"){
          successNotify();
        }
        else  failedNotify();
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        failedNotify();
      });
    window.location.reload();
  };
  return (
    <React.Fragment>
      <div className="grid">
        <div className="navbar-container">
          <Sidenav />
        </div>
        <div className="card-container">
          <div className="add-form">
            <h3>Delete User</h3>
            <input
              type="text"
              name="email"
              placeholder="enter email id to delete to user "
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={(e) => delUser(e)}>Delete User</button>
            <button
              onClick={() => {
                history.goBack();
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

export default DelUser;
