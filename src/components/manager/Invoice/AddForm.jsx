import React, { useState } from "react";
import Sidenav from "../Sidenav";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderTemplate from "../templates/LoaderTemplate";


const AddForm = () => {
  const history = useHistory();
  const [isloading, setIsLoading] = useState(false);

  const successNotify = () => toast.success("Succesfully Added");
  const failedNotify = (message) => toast.error(message);

  const token = localStorage.getItem("token");
  const url =
    "http://localhost:4050/api/managerdashboard/invoice";

  
  const senderEmail = localStorage.getItem("email");

  let invoiceNumber = "INV"+Date.now();

  const [invoice, setInvoice] = useState({
    clientName: '',
    clientAddress: '',
    clientNumber: '',
    clientEmail: '',
    dueDate: '',
    products: [],
    invoiceNumber,
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


// ON FORM SUBMIT
const onSubmitHandler =  (e) => {
  e.preventDefault();
  console.log(invoice);

  axios({
    url: url,
    method: "POST",
    headers: {
      "auth-token": token,
      "Content-Type": "application/json",
    },
    data: invoice,
  })
    .then((response) => {
      console.log(response);
      if (response.status === 400) {
        failedNotify("Oops! we are facing some issue try again later");
        setIsLoading(false);
      } else if (response.status === 200) {
        
        setIsLoading(false);
        successNotify();

        setTimeout(async () => {
          history.push("/managerdashboard/invoice")
      }, 5000);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });


}

  
  return (
    <React.Fragment>
      {isloading && (
        <LoaderTemplate
          title={`Add Service Request`}
          isAdd={false}
          link={`/managerdashboard/invoice/add`}
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
                    onClick={() => history.push("/managerdashboard/invoice")}
                  >
                    Back
                    <i className="material-icons"> &#xe5c4;</i>
                </button>
              </div>
              <hr/>
              <div className="content">
                <form className="add-form" onSubmit={onSubmitHandler}>
                  <div className='row'>
                    <div className="half">
                     <h4>Client info</h4>
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
                      Add Invoice
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

export default AddForm;

