import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../Sidenav";
import {  useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Pie } from 'react-chartjs-2';

const Dash = () => {
  const [isLoading, setLoading] = useState(true);

  
  const dispatch = useDispatch();

  
  const [countToday, setCountToday] = useState(0);
  const [countTotal, setCountTotal] = useState(0);


  useEffect(() => {
    const url =
      "http://localhost:4050/api/managerdashboard/getCount";

    const getCount = async () => {
      const token = localStorage.getItem("token");
      axios({
        url: url,
        method: "get",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.data);
          setCountTotal(response.data.invoiceCountTotalRes);
          setCountToday(response.data.invoiceCountTodayRes);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getCount();
  }, [dispatch]);

  return (

    <React.Fragment>
      {isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">DashBoard </div>

            </div>
            <hr />
            <div className="content">
              <div className="loading">
                <Loader type="Audio" color="#897eff" height={100} width={100} />
                <p>Loading Dashboard...</p>
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
          <div className="main-content vh">
            <div className="header">
              <div className="title">DashBoard </div>

            </div>
            <hr />
            <div className="dash-main">
              <div className="countdata">
                <h2>Invoices generated today :  {countToday}</h2>
                <br/>
                <h2>Total invoices generated :  {countTotal}</h2>
              </div>
            </div>
          </div>
        </div>



      )}
    </React.Fragment>
  );
};

export default Dash;