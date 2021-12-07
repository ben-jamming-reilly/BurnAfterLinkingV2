import { Fragment, useState, useEffect } from "react";
// import { useStoreState } from "easy-peasy";
import { useStoreActions, useStoreState } from "easy-peasy";

import ReCAPTCHA from "react-google-recaptcha";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

const File = () => {
  const [captcha, setCaptcha] = useState(null);

  const { getFile } = useStoreActions((actions) => actions.file);
  const { url, loading } = useStoreState((state) => state.file);

  useEffect(() => {
    if (captcha !== null) {
      const password = window.location.hash.substring(1);
      console.log(password);
      getFile(password);
    }
  }, [captcha, getFile]);

  return (
    <Fragment>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand>
            <h2>Burn After Linking</h2>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <div className='d-flex justify-content-center align-items-stretch flex-grow-1 mt-5'>
          {!captcha ? (
            <ReCAPTCHA
              sitekey='6LfkPCEaAAAAAErMd08ve2nZ48ZSqhMMuJurQxH3'
              onChange={(value) => setCaptcha(value)}
            />
          ) : loading ? (
            <Spinner animation='border' />
          ) : url ? (
            <Image src={url} style={{ maxHeight: "20rem" }} />
          ) : (
            "No Link"
          )}
        </div>
      </Container>
    </Fragment>
  );
};

export default File;
