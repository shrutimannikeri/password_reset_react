  import logo from "./logo.svg";
  import "./App.css";
  import React from "react";

  import { Alert } from "react-bootstrap";
  import * as yup from "yup";
  import { Routes, Route, Navigate } from "react-router-dom";
  import { Register } from "./Register.js";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { Login } from "./Login";
  import { Forgetpassword } from "./Forgetpassword";
import { Restpassword } from "./Restpassword";
import { SuccessMessage } from "./SuccessMessage";
import { SuccessRedirect } from "./SuccessRedirect";

  export const formvalidationSchema = yup.object({
    password: yup
      .string()
      .min(7, "please enter at least 7 char")
      .max(10, "Too much password")
      .required("why not fill th password"),
    password1: yup
      .string()
      .min(7, "please enter at least 7 char")
      .max(10, "Too much password")
      .required("why not fill th password"),
  });
  function App() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forget-password" element={<Forgetpassword />} />
          <Route path="/successEmail" element={<SuccessMessage />} />
          <Route path="/successredirect" element={<SuccessRedirect />} />
          <Route path="/resetPassword/:id" element={<Restpassword />} />
        </Routes>
      </div>
    );
  }

  const Home = () => {
    return <div>Weilcome to page</div>;
  };
  export default App;
