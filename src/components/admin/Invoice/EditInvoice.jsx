import React, { useState } from "react";
import Sidenav from "../Sidenav";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderTemplate from "../templates/LoaderTemplate";

const EditService = () => {
  const history = useHistory();
  const [isloading, setIsLoading] = useState(false);
  const successNotify = () => toast.success("Succesfully Edited");
  const failedNotify = () =>
    toast.error("Oops..! Failed to Update");

  
  const senderEmail = localStorage.getItem("email");

  const id = localStorage.getItem("key");
  const results = useSelector((state) => state.service);
  const services = results.filter((result) => result._id === id);
  console.log("services in particular invoce in EditInvoice is: ", services);

  const [invoice, setInvoice] = useState({
    clientName: services[0].clientName,
    clientAddress: services[0].clientAddress,
    clientNumber: services[0].clientNumber,
    clientEmail: services[0].clientEmail,
    dueDate: services[0].dueDate,
    products: services[0].products,
    invoiceNumber: services[0].invoiceNumber,
    senderEmail
  });

  const onChangeNormalParameters = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  }

  const addProduct = (e) => {
    e.preventDefault();
    var newProduct = { name: '', quantity: '', price: ''};
    setInvoice({
        ...invoice,
        products : [...invoice.products, newProduct]
    });
  }
  const handleProductChange = (e, index) => {
    let nameValue = e.target.name;
    
    invoice.products[index][nameValue] = e.target.value;
    setInvoice({
        ...invoice,
        products : invoice.products
    }); 
  }

  const removeProduct = (e, index) => {
    e.preventDefault();

    invoice.products.splice(index,1);

    setInvoice({
        ...invoice,
        products: invoice.products
    }); 

  }
  const editInvoice = () => {
    
    setIsLoading(true);
    const request = invoice;
    axios
      .put(
        `http://localhost:4050/api/admindashboard/invoice/${id}`,
        request
      )
      .then((res) => {
        setIsLoading(false);
        successNotify();
      })
      .catch((error) => {
        console.log(error);
        failedNotify();
      });
  };
  return (
    <React.Fragment>
      {isloading && (
        <LoaderTemplate
          title={`Add Service Request`}
          isAdd={false}
          link={`/admindashboard/invoice/add`}
          content={`Adding`}
        />
      )}
      {!isloading && (
        <React.Fragment>
          <ToastContainer />
          <div className="dashboard">
            <div className="sidebar">
              <Sidenav />
            </div>
            <div className="main-content">
              <div className="header">
                <div className="title">Invoice</div>
                <button
                    type="button"
                    onClick={() => history.push("/admindashboard/invoice")}
                  >
                    Back
                    <i className="material-icons"> &#xe5c4;</i>
                </button>
              </div>
              <hr/>
              <div className="content">
                <form className="add-form" onSubmit={editInvoice}>
                  <div className='row'>
                    <div className="half">
                     <h4>{invoice.invoiceNumber}</h4>
                     
                     <input type="text" value={invoice.clientName} name="clientName" onChange={onChangeNormalParameters}  placeholder="Enter Client Name" id="clientName" required/>
                    <input type="text" value={invoice.clientEmail} name="clientEmail" onChange={onChangeNormalParameters}  placeholder="Enter Client Email" id="clientEmail" required/>
                     <input type="text" value={invoice.clientNumber} name="clientNumber" onChange={onChangeNormalParameters}  placeholder="Enter Client Number" id="clientNumber" required/>
                   </div>
                    <div className="half pt30">
                   
                    <label>Due Date</label>
                    <input type="date" value={invoice.dueDate} name="dueDate" onChange={onChangeNormalParameters}  placeholder="Enter dueDate" id="dueDate" required/>
                    <input type="text" value={invoice.clientAddress} name="clientAddress" onChange={onChangeNormalParameters}  placeholder="Enter Client Address" id="clientAddress" required/>
                    </div>
                  </div>
                  <div className="row flwrp ">
                    <h3>Add Products <button onClick={(e) => addProduct(e)}  className="addproduct">+</button></h3>
                    
                    
                        {
                            invoice.products.map( ( prod, index ) => {
                                return (
                                    <div className="row" key={index}>
                                        <h4>Product {index + 1}
                                          <button onClick={(e) => removeProduct(e, index)} className="addproduct rmvproduct">x</button>
                                        </h4>
                                        <div className="row">
                                                <input type="text" name="name" value={prod.name}  placeholder="Enter Product name" id="name" onChange={e => handleProductChange(e, index)} />
                                                <input type="text" name="quantity" value={prod.quantity}  placeholder="Enter Quantity " id="quantity" onChange={e => handleProductChange(e, index)} />
                                                <input type="text" name="price" value={prod.price}  placeholder="Enter Price " id="price" onChange={e => handleProductChange(e, index)} />
                                            
                                        </div>
                                        
                                        
                                    </div>
                                    
                                )
                            })
                        }
                </div>
                  <div className="button-container">
                    <button type="submit">
                      Update Invoice
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EditService;
