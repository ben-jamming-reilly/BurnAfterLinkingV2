import React, { useState, Fragment } from "react";
import { Redirect } from "react-router";
import { useStoreState } from "easy-peasy";

import Login from "../components/Login";
import SignUp from "../components/SignUp";

// Styling
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Auth = () => {
  const [isLogin, setAuthType] = useState(false);
  const isAuthenticated = useStoreState((state) => state.user.isAuthenticated);

  if (isAuthenticated) return <Redirect to='/home' />;

  return (
    <Fragment>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand>
            <h2>Burn After Linking</h2>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Col />
      <Col sm='10' md='8' lg='6' xl='4' className='mx-auto'>
        <div className='bg-light border p-2 rounded mt-5'>
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
        </div>
      </Col>
      <Col />
    </Fragment>
  );
};

export default Auth;
