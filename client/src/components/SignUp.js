import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";

// Styling
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const history = useHistory();

  const { signup } = useStoreActions((actions) => actions.user);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Passwords do not match");
      return;
    }

    if (await signup(formData)) {
      history.push("/home");
    } else {
      alert("error");
    }
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
            name='password'
            type={"password"}
            value={formData.password}
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
      <Row className='mb-2'>
        <Form.Group as={Col} className='text-center'>
          <Button block type='submit' className='w-100'>
            Signup
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default SignUp;
