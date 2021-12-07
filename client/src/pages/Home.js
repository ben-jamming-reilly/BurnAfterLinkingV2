import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import MyLinks from "../components/MyLinks";
import CreateLink from "../components/CreateLink";
import LinksViewed from "../components/LinksViewed";
import LinksExpired from "../components/LinksExpired";
import Settings from "../components/Settings";

const Home = () => {
  const [menuState, setMenuState] = useState("create");
  const history = useHistory();

  const { logout } = useStoreActions((actions) => actions.user);

  const out = () => {
    logout();
    history.push("/");
  };

  return (
    <Container fluid>
      <Row className='vh-100'>
        <Col
          xs='4'
          md='3'
          lg='3'
          xl='2'
          className='bg-primary py-2 align-middle d-flex'
          style={{
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Stack style={{ marginTop: "auto", marginBottom: "auto" }}>
            <ListGroup defaultActiveKey='#create'>
              <ListGroup.Item
                action
                variant='primary'
                className='text-center'
                href='#create'
                onClick={() => setMenuState("create")}
              >
                Create
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant='primary'
                className='text-center'
                href='#settings'
                onClick={() => setMenuState("settings")}
              >
                Settings
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant='primary'
                className='text-center'
                href='#logout'
                onClick={() => out()}
              >
                Logout
              </ListGroup.Item>
            </ListGroup>
          </Stack>
        </Col>
        <Col xs='8' md='9' lg='9' xl='10'>
          <Stack>
            <MyLinks />
            <div>
              {menuState === "create" ? (
                <CreateLink />
              ) : menuState === "links-views" ? (
                <LinksViewed />
              ) : menuState === "links-expired" ? (
                <LinksExpired />
              ) : (
                <Settings />
              )}
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
