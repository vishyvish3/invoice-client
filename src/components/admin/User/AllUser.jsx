import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidenav from "../Sidenav";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AllUsers = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const successNotify = (msg) => toast.success(msg);
  const failedNotify = (msg) => toast.error(msg);


  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getUsers = async () => {
      const token = localStorage.getItem("token");
      const url = `https://devvishal-invoice-server.herokuapp.com/api/admindashboard/users`;
      axios({
        url: url,
        method: "get",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        cancelToken: source.token,
      })
        .then((response) => {
          setLoading(false);
          setUsers(response.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getUsers();
    return () => {
      source.cancel();
    };
  }, []);

  const delUser = (email) => {
    setUsers(users.filter((user) => user.email !== email));
    console.log("delete");
    const request = {
      email: email,
    };
    console.log(request);

    axios.delete("https://devvishal-invoice-server.herokuapp.com/api/admin/deleteuser", {
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        email: email
      }
    })
      .then((response) => {
        console.log("response received in delete on allUser in admin is: ",response);
        setLoading(false);
        successNotify("Succesfully Deleted User");
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        failedNotify("Failed to delete User");
      });
  };
  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      {isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">All Users</div>
              <Link to="/admindashboard/addUser">
                <button type="button">
                  Add <i className="material-icons">&#xe147;</i>
                </button>
              </Link>
            </div>
            <hr />
            <div className="content">
              <div className="loading">
                <Loader type="Audio" color="#897eff" height={100} width={100} />
                <p>Loading All Users...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">All Users</div>
              <Link to="/admindashboard/addUser">
                <button type="button">
                  Add <i className="material-icons">&#xe147;</i>
                </button>
              </Link>
            </div>
            <hr />
            <div className="content">
              {users.map((result) => (
                <div
                  key={result._id}
                  className="cards"
                  style={{
                    marginBottom: "1rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <ul>
                    <li>
                      <b>Name:</b>
                      <p>
                        {result.fname} {result.lname}
                      </p>
                    </li>
                    <li>
                      <b>Email: </b>
                      <p>{result.email}</p>
                    </li>
                    <li>
                      <b>Type: </b>
                      <p>{result.type}</p>
                    </li>
                  </ul>
                  <div
                    className="button-container"
                    style={{ paddingBottom: "0.2rem" }}
                  >
                    <button type="button" onClick={() => delUser(result.email)}>
                      Delete
                      <i className="material-icons">&#xe872;</i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AllUsers;
