import { useState, Fragment } from "react";
import { useStoreActions } from "easy-peasy";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import ImageIcon from "../icons/ImageIcon";

const CreateLink = () => {
  const [previewFile, setPreviewFile] = useState(null);
  const [formData, setFormData] = useState({
    expireDate: null,
    desc: "",
    image: null,
  });
  const [isLinkUploading, setIsLinkUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const saveLink = useStoreActions((actions) => actions.links.saveLink);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fileOnChange = (e) => {
    const file = document.getElementById("image").files[0];

    setPreviewFile(URL.createObjectURL(e.target.files[0]));
    setFormData({ ...formData, image: file });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLinkUploading(true);

    if (await saveLink(formData)) {
      // clear form controls
      setPreviewFile(null);
      document.getElementById("image").value = null;
      document.getElementById("calendar").value = null;

      // reset form data
      setFormData({
        expireDate: null,
        desc: "",
        image: null,
      });

      // Insert modal
      setShowModal(true);
    } else {
      console.error("Shit");
    }

    setIsLinkUploading(false);
  };

  const handleClose = () => setShowModal(false);

  // useEffect(() => {
  //   setIsLinkUploading(true);
  // }, [onSubmit]);

  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Copy this Link</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
      <Card className='m-3' border='secondary'>
        <Card.Body>
          <Row>
            <Col>
              <div className='m-2'>
                <h5>Create a Link</h5>
              </div>
              <Form className='m-2' onSubmit={onSubmit}>
                <Row>
                  <Form.Group className='mb-2'>
                    <FloatingLabel label='Expiration Date' className='mb-1'>
                      <Form.Control
                        id='calendar'
                        onChange={onChange}
                        type='date'
                        size='sm'
                        name='expireDate'
                        value={formData.expireDate}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row>
                  <FloatingLabel label='Description' className='mb-2'>
                    <Form.Control
                      onChange={onChange}
                      as='textarea'
                      placeholder='Leave a comment here'
                      name='desc'
                      value={formData.desc}
                      required
                    />
                  </FloatingLabel>
                </Row>
                <Row>
                  <Form.Group className='mb-3'>
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
                    disabled={isLinkUploading}
                  >
                    {!isLinkUploading ? (
                      "Create"
                    ) : (
                      <Spinner animation='border' />
                    )}
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
    </Fragment>
  );
};

export default CreateLink;
