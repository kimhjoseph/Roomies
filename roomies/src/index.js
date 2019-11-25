import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/ShoppingListAddItemModal";

ReactDOM.render(<App />, document.getElementById("root"));
