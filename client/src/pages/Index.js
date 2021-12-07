import { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

import GitHubIcon from "../icons/GitHubIcon";
import LinkinIcon from "../icons/LinkinIcon";
import TwitterIcon from "../icons/TwitterIcon";

const Index = () => {
  return (
    <Fragment>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand className='bg-light rounded py-1 px-3'>
            <Link to='/'>
              <h2>BurnAfterLinking</h2>
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className='mt-4' style={{ width: "50%" }}>
        <div className='d-flex justify-content-between my-3'>
          <h4>Share one time pics to links </h4>
          <h4>
            <Link to='/auth'>
              <Badge bg='primary'>Signup / Login</Badge>
            </Link>
          </h4>
        </div>
        <hr />
        <div className='my-3'>
          <p style={{ textIndent: "30px" }}>
            It can be quite nerve racking sending confidential files over the
            internet. Have you ever tried transferring a copy of your social
            security card over the internet? While one could transfer it over
            Google drive, you now have trusted Google with your social security
            card. Is there a safe trustless way to transfer these scans?
          </p>
          <p style={{ textIndent: "30px" }}>
            BurnAfterLinking is a file uploading site that stores pictures which
            are encrypted client side and can only be accessed through the use
            of a link. At no point will the server be able to decrypt the files.
          </p>
          <p>
            Created by <em>Benjamin Reilly</em>
          </p>
          <div>
            <span className='p-2'>
              <a
                className='link-dark'
                href='https://github.com/ben-jamming-reilly'
              >
                <GitHubIcon />
              </a>
            </span>
            <span className='p-2'>
              <a
                className='link-dark'
                href='https://www.linkedin.com/in/benjamin-reilly-18b58619a/'
              >
                <LinkinIcon />
              </a>
            </span>
            <span className='p-2'>
              <a className='link-dark' href='https://twitter.com/Ben_Jammings'>
                <TwitterIcon />
              </a>
            </span>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Index;
