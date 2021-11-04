import { useStoreState } from "easy-peasy";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import TrashIcon from "../icons/TrashIcon";
import GearIcon from "../icons/GearIcon";

const Link = ({ desc, createDate, passHash }) => {
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
        <Card.Title>{prettyDate(createDate)}</Card.Title>
        <Card.Subtitle className='text-muted mb-2 px-1'>
          {prettyTime(createDate)}
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

  return (
    <Card className='m-3' border='secondary'>
      <Card.Body className='p-2 mx-2'>
        <Stack direction='horizontal' gap={3}>
          <Button variant='outline-secondary'>
            <GearIcon />
          </Button>
        </Stack>
      </Card.Body>

      <Card.Body className='p-2'>
        <div
          className='d-flex flex-row flex-nowrap overflow-auto'
          style={{ height: "16rem" }}
        >
          {links.map((link) => (
            <Link
              desc={link.desc}
              createDate={link.createDate}
              passHash={link.passHash}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MyLinks;
