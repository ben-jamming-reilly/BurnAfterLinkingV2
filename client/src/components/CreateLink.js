import { useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import ImageIcon from "../icons/ImageIcon";

const CreateLink = () => {
  const [previewFile, setPreviewFile] = useState(null);
  const [formData, setFormData] = useState({
    expireDate: null,
    desc: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fileOnChange = (e) => {
    setPreviewFile(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Card className='m-3' border='secondary'>
      <Card.Body>
        <Row>
          <Col>
            <div className='m-2'>
              <h5>Create a Link</h5>
            </div>
            <Form className='m-2'>
              <Row>
                <Form.Group controlId='formFileSm' className='mb-2'>
                  <FloatingLabel
                    controlId='floatingTextarea'
                    label='Expiration Date'
                    className='mb-1'
                  >
                    <Form.Control
                      type='date'
                      size='sm'
                      name='expireDate'
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row>
                <FloatingLabel
                  controlId='floatingTextarea'
                  label='Description'
                  className='mb-2'
                >
                  <Form.Control
                    as='textarea'
                    placeholder='Leave a comment here'
                    name='desc'
                    required
                  />
                </FloatingLabel>
              </Row>
              <Row>
                <Form.Group controlId='formFileSm' className='mb-3'>
                  <Form.Label>Picture</Form.Label>
                  <Form.Control
                    id='image'
                    type='file'
                    size='sm'
                    onChange={fileOnChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className='mx-0'>
                <Button
                  type='submit'
                  variant='success'
                  size='lg'
                  className='py-1'
                >
                  Create
                </Button>
              </Row>
            </Form>
          </Col>
          <Col className='text-center my-auto'>
            {previewFile ? (
              <Image
                style={{
                  maxHeight: "18rem",
                  maxWidth: "36rem",
                }}
                rounded
                src={previewFile}
              />
            ) : (
              <ImageIcon />
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CreateLink;
