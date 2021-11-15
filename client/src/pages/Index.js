import { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Index = () => {
  return (
    <Fragment>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand>
            <h2>BurnAfterLinking</h2>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className='mt-4'>
        <h4>one time links for pics</h4>
        <Link to='/auth'>Signup / Login</Link>
      </Container>
      ;
    </Fragment>
  );
};

export default Index;
