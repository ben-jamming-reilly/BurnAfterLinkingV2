import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

import TrashIcon from "../icons/TrashIcon";
import GearIcon from "../icons/GearIcon";

const Link = ({ desc, expireDate, passHash }) => {
  function prettyDate(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleDateString();
  }
  function prettyTime(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleTimeString();
  }

  return (
    <Card style={{ minWidth: "18rem" }} className='m-2' border='secondary'>
      <Card.Header className='p-0'>
        <Stack direction='horizontal' gap={3}>
          <Button variant='outline-secondary' className='ms-auto m-1'>
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
      <Card.Footer className='text-muted'>{passHash}</Card.Footer>
    </Card>
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
            style={{ height: "16rem" }}
          >
            {links &&
              links.map((link) => (
                <Link
                  key={link.id}
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
