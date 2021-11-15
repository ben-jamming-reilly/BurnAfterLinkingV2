import { useEffect, useState, Fragment } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

import TrashIcon from "../icons/TrashIcon";
import GearIcon from "../icons/GearIcon";

const Link = ({ id, desc, expireDate, passHash }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id,
    desc,
    expireDate,
    passHash,
  });

  const { editLink, deleteLink } = useStoreActions((actions) => actions.links);

  const [isLinkUploading, setIsLinkUploading] = useState(false);
  const [isLinkDeleting, setIsLinkDeleting] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function prettyDate(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleDateString();
  }
  function prettyTime(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleTimeString();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLinkUploading(true);

    if (await editLink(formData)) {
      await editLink(formData);
    } else {
    }
    setShowModal(false);
    setIsLinkUploading(false);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    setIsLinkDeleting(true);
    if (await deleteLink(formData)) {
      await editLink(formData);
    } else {
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <Fragment>
      <Modal show={showModal} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit this Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Row className='mx-0'>
              <Button
                type='submit'
                variant='success'
                size='lg'
                className='py-1'
                disabled={isLinkUploading}
              >
                {!isLinkUploading ? "Update" : <Spinner animation='border' />}
              </Button>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      <Card
        style={{ minWidth: "18rem", maxWidth: "20rem" }}
        className='m-2'
        border='secondary'
      >
        <Card.Header className='p-0'>
          <Stack direction='horizontal' gap={3}>
            <Button
              variant='outline-danger'
              className='m-1'
              onClick={onDelete}
              disabled={isLinkUploading}
            >
              {!isLinkDeleting ? <TrashIcon /> : <Spinner animation='border' />}
            </Button>
            <Button
              variant='outline-secondary'
              className='ms-auto m-1'
              onClick={() => setShowModal(true)}
            >
              <GearIcon />
            </Button>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Card.Title>{prettyDate(expireDate)}</Card.Title>
          <Card.Subtitle className='text-muted mb-2 px-1'>
            {prettyTime(expireDate)}
          </Card.Subtitle>
          <Card.Text>
            <b>Description:</b> {desc}
          </Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted p-0'>{passHash}</Card.Footer>
      </Card>
    </Fragment>
  );
};

const MyLinks = () => {
  const { links, loading } = useStoreState((state) => state.links);
  const getLinks = useStoreActions((actions) => actions.links.getLinks);

  // Gets the links data on render
  useEffect(() => getLinks(), []);

  return (
    <Card className='m-3' border='secondary'>
      <Card.Body className='p-2 mx-2'>
        <Stack direction='horizontal' gap={3}>
          <h4 className='p-0 mb-0'>
            <Badge bg='primary'>My Links</Badge>
          </h4>
        </Stack>
      </Card.Body>
      <Card.Body className='p-2'>
        {loading ? (
          <div
            className='row align-items-center justify-content-center'
            style={{ height: "16rem" }}
          >
            <Spinner animation='border' />
          </div>
        ) : (
          <div
            className='d-flex flex-row flex-nowrap overflow-auto'
            style={{ height: "18rem" }}
          >
            {links &&
              links.map((link) => (
                <Link
                  key={link.id}
                  id={link.id}
                  desc={link.desc}
                  expireDate={link.expireDate}
                  passHash={link.passHash}
                />
              ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MyLinks;
