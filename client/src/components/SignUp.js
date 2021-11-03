import React, { useState } from "react";

// Styling
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// Captcha
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
  });

  const [captcha, setCaptcha] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    console.log(captcha);

    // if (formData.password1 !== formData.password2) {
    //   setAlarm("Passwords do not match", "danger");
    //   console.log("Passwords do not match.");
    //   return;
    // }

    // const userData = {
    //   first_name: formData.first_name,
    //   last_name: formData.last_name,
    //   email: formData.email,
    //   password: formData.password1,
    // };
    // if (captcha) {
    //   console.log(captcha);
    //   signup(userData, captcha);
    // } else {
    //   setAlarm("Captcha is required.", "danger");
    // }
  };

  return (
    <Form
      className='float-center'
      onSubmit={(e) => onSubmit(e)}
      style={{
        padding: "10px",
        width: "100%",
      }}
    >
      <Row className='mb-2'>
        <Form.Group as={Col}>
          <FormControl
            name='email'
            value={formData.email}
            onChange={(e) => onChange(e)}
            placeholder='Email'
            required
          />
        </Form.Group>
      </Row>
      <Row className='mb-2'>
        <Form.Group as={Col}>
          <FormControl
            name='password1'
            type={"password"}
            value={formData.password1}
            onChange={(e) => onChange(e)}
            placeholder='Password'
            minLength='6'
            required
          />
        </Form.Group>
      </Row>
      <Row className='mb-2'>
        <Form.Group as={Col}>
          <FormControl
            name='password2'
            type={"password"}
            value={formData.password2}
            onChange={(e) => onChange(e)}
            placeholder='Confirm Password'
            minLength='6'
            required
          />
        </Form.Group>
      </Row>
      {/* <Row className='mb-2'>
        <Form.Group as={Col}>
          <ReCAPTCHA
            sitekey='6LfkPCEaAAAAAErMd08ve2nZ48ZSqhMMuJurQxH3'
            onChange={(value) => setCaptcha(value)}
          />
        </Form.Group>
      </Row> */}
      <Row className='mb-2'>
        <Form.Group as={Col} className='text-center'>
          <Button block type='submit' className='w-100'>
            Sign Up
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default SignUp;
