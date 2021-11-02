import React, { useState } from "react";

// Styling
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          <InputGroup>
            <FormControl
              name='password'
              type='password'
              value={formData.password}
              onChange={(e) => onChange(e)}
              placeholder='Password'
              minLength='6'
              required
            />
            {/*
            <InputGroup.Append>
              <Button onClick={() => setShowPassword(!showPassword)}>Hi</Button>
            </InputGroup.Append>
          </InputGroup> */}
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className='mb-2'>
        <Form.Group as={Col}>
          <Button block type='submit'>
            Login
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default Login;
