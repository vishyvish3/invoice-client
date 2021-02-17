import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidenav from "../Sidenav";
import { useSelector, useDispatch } from "react-redux";
import { LoadService } from "../../actions/index";
import LoaderTemplate from "../templates/LoaderTemplate";
import TitleTemplate from "../templates/TitleTemplate";

const Invoice = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const [searchSuccessful, setsSarchSuccessful] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [searchText, setSearchText] = useState("");

  const results = useSelector((state) => state.service);
  const dispatch = useDispatch();
  

  useEffect(() => {
    
    const url = "http://localhost:4050/api/admindashboard/invoice";
    const getInvoice = async () => {
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
          console.log("response in get AllInvoice is: ", response);
          dispatch(LoadService(response.data));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getInvoice();
  }, [dispatch]);

  const searchHandler = (e) => {
    e.preventDefault();
    
    const text = searchText;
    setSearchText("");
    const url = "http://localhost:4050/api/admindashboard/searchInvoice";
    axios({
      url: url,
      method: "post",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      data: { "invoiceNumber": text }
    })
      .then((response) => {
        console.log("response in searchHandler is: ", response);
        setsSarchSuccessful(true);
        setSearchID(response.data[0]._id);
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }

  return (
    <React.Fragment>
      {isLoading && (
        <LoaderTemplate
          title={`Invoice`}
          isAdd={true}
          link={`/admindashboard/invoice/add`}
          content={`Loading`}
        />
      )}
      {!isLoading && !searchSuccessful && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <TitleTemplate
              title={`Invoice`}
              link={`/admindashboard/invoice/add`}
              isAdd={true}
            />
            <div className="searchmaindiv">
              <input type="text" onChange={(e) => setSearchText(e.target.value)} className="searchinput"  />
              <button onClick={searchHandler} className="searchinputbutton">Search</button>
            </div>
            <div className="content">
              <ul>
                {results.map((result) => (
                  <li key={result._id}>
                    <p>{result.invoiceNumber}</p>
                    <Link to={`/admindashboard/invoice/${result._id}`}>
                    - View Invoice
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {
        searchSuccessful && (

          <div className="dashboard">
            <div className="sidebar">
              <Sidenav />
            </div>
            <div className="main-content">
              <TitleTemplate
                title={`Invoice`}
                link={`/admindashboard/invoice/add`}
                isAdd={true}
              />

              <div className="content">
                <Link to={`/admindashboard/invoice/${searchID}`}>
                  <p>Click to open the searched Invoice</p>
                  {/* <i className="material-icons">&#xe872;</i> */}
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </React.Fragment>
  );
};

export default Invoice;
