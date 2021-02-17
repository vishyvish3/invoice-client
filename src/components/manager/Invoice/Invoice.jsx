import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { DelService } from "../../actions/index";
import { Link, useHistory } from "react-router-dom";
import Sidenav from "../Sidenav";
import EditInvoice from "./EditInvoice";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invoice = ({ match }) => {
  const history = useHistory();
  const results = useSelector((state) => state.service);
  // console.log("results in particular invoce is: ", results);
  const services = results.filter((result) => result._id === match.params.id);

  const successNotify = (msg) => toast.success(msg);
  const failedNotify = (msg) => toast.error(msg);


  console.log("services in particular invoce is: ", services);
  const [view, setView] = useState("noedit");

  const dispatch = useDispatch();

  const generatePDF = ()=>{ 
    const token = localStorage.getItem("token");
    const generatePdfURL = "https://devvishal-invoice-server.herokuapp.com/api/managerdashboard/genearatePDF";
    
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const request = services[0];
    axios
      .post(generatePdfURL, request, {
        headers: headers,
      })
      .then((response) => {
        console.log("response in generatePDF is: ",response);
        window.open(response.data, "_blank")
        successNotify("Succesfully Generated Pdf");
      })
      .catch((err) => {
        console.log(err);
        failedNotify(" Failed to Generated Pdf");
      });
  };
  

  const url = "https://devvishal-invoice-server.herokuapp.com/api/managerdashboard/invoice";

  const delInvoice = (id) => {
    const token = localStorage.getItem("token");
    const response = {
      _id: id,
    };
    fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(response),
    })
      .then((data) => {
        console.log(data);
        successNotify("Succesfully Deleted Invoice");
      })
      .catch((error) => {
        console.log(error);
        failedNotify("Failed to Delete Invoice");
      });
    dispatch(DelService(id));
  };
  const convertDate = (date) => {
    const dates = new Date(date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(dates);
    return formattedDate;
  };

  return (
    <React.Fragment>
      <ToastContainer />
      {view === "noedit" && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">Invoice</div>
              <button
                  type="button"
                  onClick={() => history.push("/managerdashboard/invoice")}
                >
                  Back
                  <i className="material-icons"> &#xe5c4;</i>
              </button>
            </div>
            <hr/>
            <div className="content">
              {services.map((result) => (
                <div key={result._id} className="cards">
                  <ul>
                    <li>
                      <b>Invoice Number</b>
                      <p>{result.invoiceNumber}</p>
                    </li>
                    <li>
                      <b>Client Name</b>
                      <p>{result.clientName}</p>
                    </li>
                    <li>
                      <b>Client Email</b>
                      <p>{result.clientEmail}</p>
                    </li>
                    <li>
                      <b>Client Number</b>
                      <p>{result.clientNumber}</p>
                    </li>
                    <li>
                      <b>Due Date</b>
                      <p>{convertDate(result.dueDate)}</p>
                    </li>
                    
                    <li>
                      <b>Total Balance</b>
                      <p>{result.totalPrice}</p>
                    </li>
                    
                  </ul>
                  <div className="button-container">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem("key", result._id);
                        setView("edit");
                      }}
                    >
                      Update
                      <i className="material-icons">&#xe3c9;</i>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem("key", result._id);
                        generatePDF();
                      }}
                    >
                      Generate Pdf
                      <i className="material-icons">picture_as_pdf</i>
                    </button>

                    <Link
                      onClick={() => delInvoice(result._id)}
                    >
                      <button type="button">
                        Delete
                        <i className="material-icons">&#xe872;</i>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {view === "edit" && <EditInvoice />}
    </React.Fragment>
  );
};

export default Invoice;
