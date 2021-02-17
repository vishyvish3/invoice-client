import invoiceReducer from "./InvoiceReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  service: invoiceReducer,
});

export default rootReducers;
