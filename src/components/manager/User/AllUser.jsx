import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidenav from "../Sidenav";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const AllUsers = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getUsers = async () => {
      const token = localStorage.getItem("token");
      const url = `https://devvishal-invoice-server.herokuapp.com/api/managerdashboard/users`;
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

  
  return (
    <React.Fragment>
      {isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">All Users</div>
              <Link to="/managerdashboard/addUser">
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
              <Link to="/managerdashboard/addUser">
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
