import React from "react";
import icebreakersv8 from "../logo/icebreakersv8.png";
import { Row, Col } from "react-bootstrap";

const navBar = (props) => {
  //Do we need to have this as a function or can it be a variable 
  const logOutBtn = () => {
    if (props.currentUser === props.host) {
      return (
        <button className="LogoutBtn" onClick={props.endGameBtn}>
          End Game
        </button>
      );
    } else {
      return (
        <button className="LogoutBtn" onClick={props.logoutBtn}>
          Logout
        </button>
      );
    }
  };

  return (
    <Row className="nav-bar">
      <Col className="col-3">{logOutBtn()}</Col>
      <Col className="col-6 ">
        <img className="nav-logo" src={icebreakersv8} alt="icebreakers logo" />
      </Col>
      <Col className="col-3 nav-bar-info">
        <Row>
          <Col>
            <span className="nav-bar-info-room-bar">Room</span>
          </Col>
        </Row>
        <Row>
          <Col>{props.room}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default navBar;
