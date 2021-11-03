import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <Row className='vh-100'>
        <Col lg='2'>Sidebar</Col>
        <Col>
          <Row>Links</Row>
          <Row>Create Link</Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
