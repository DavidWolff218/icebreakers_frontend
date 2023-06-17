import React from "react";
import { Link } from "react-router-dom";
import icebreakersv8 from "../logo/icebreakersv8.png";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row className="boot-home-logo">
        <img className="img-fluid" src={icebreakersv8} alt="icebreakers logo" />
      </Row>
      <Row>
        <Col className="col-2" />
        <Col className="col align-self-center">
          <Link to="/create_room">
            <button className="homeCreateBtn">
              <h3 className="homeCreateBtnText">Create a Room</h3>
            </button>
          </Link>
        </Col>
        <Col className="col-2" />
      </Row>
      <Row>
        <Col className="col-2" />
        <Col className="col align-self-center">
          <Link to="/Login">
            <button className="homeJoinBtn">
              <h3 className="homeJoinBtnText">Join a Room</h3>
            </button>
          </Link>
        </Col>
        <Col className="col-2" />
      </Row>
      <Row className="boot-home-row" />
    </Container>
  );
};

export default Home;
