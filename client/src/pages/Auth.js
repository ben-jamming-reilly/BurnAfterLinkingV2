import React, { useState, Fragment } from "react";
import { Redirect, useParams } from "react-router-dom";

import Login from "../components/Login";
import SignUp from "../components/SignUp";

// Styling
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Auth = ({ isAuthenticated }) => {
  const { type } = useParams();

  const [isLogin, setAuthType] = useState(type === "signup" ? false : true);

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <br />
      <Col />
      <Col sm='10' md='8' lg='6' xl='6' className='mx-auto'>
        <Row
          style={{
            justifyContent: "center",
          }}
          className='float-center'
        >
          <ButtonGroup toggle>
            <Button
              variant={!isLogin ? "secondary" : "primary"}
              onClick={() => setAuthType(true)}
            >
              Login
            </Button>
            <Button
              variant={isLogin ? "secondary" : "primary"}
              onClick={() => setAuthType(false)}
            >
              Signup
            </Button>
          </ButtonGroup>
        </Row>
        <Row
          style={{
            justifyContent: "center",
          }}
        >
          {isLogin ? <Login /> : <SignUp />}
        </Row>
      </Col>
      <Col />
    </Fragment>
  );
};

export default Auth;
