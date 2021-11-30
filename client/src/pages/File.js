import { Fragment, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useStoreState } from "easy-peasy";

import ReCAPTCHA from "react-google-recaptcha";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import terryBear from "../images/terryBear.jpg";

const File = () => {
  const [captcha, setCaptcha] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (captcha !== null) {
      setShowButton(true);
    }
  }, [captcha]);

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
          {!showButton ? (
            <ReCAPTCHA
              sitekey='6LfkPCEaAAAAAErMd08ve2nZ48ZSqhMMuJurQxH3'
              onChange={(value) => setCaptcha(value)}
            />
          ) : !showImage ? (
            <Button
              variant='primary'
              onClick={(e) => {
                setShowImage(true);
              }}
            >
              Reveal Image
            </Button>
          ) : (
            <Image src={terryBear} />
          )}
        </div>
      </Container>
    </Fragment>
  );
};

export default File;
