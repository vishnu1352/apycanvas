import React, { useState } from "react";
import Header from "../Header";
import { Card, Button, Form } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const onInputChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };
  const redirectToDashBoard = () => {
    if (
      loginDetails.username === "apycanvas" &&
      loginDetails.password === "apycanvas@2024"
    ) {
      navigate("/addInventory");
    } else {
      toast.error("Login failed, Incorrect details");
    }
  };
  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="container">
        <Card className="p-3 shadow mt-3 ">
          <Card.Title>Login</Card.Title>
          <Form className="mt-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={loginDetails.username}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginDetails.password}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => redirectToDashBoard()}
          >
            Submit
          </Button>
          <Button
            className="py-1 mt-2 w-100"
            variant="secondary"
            onClick={() => navigate("/")}
          >
            <IoArrowBackOutline /> Back to Home Page
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Login;
