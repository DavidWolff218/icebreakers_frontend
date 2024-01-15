import React from "react";
import { Row, Col } from "react-bootstrap";


const WaitingRoom = (props) => {
  const startButton = () => {
    return (
      <div>
        <button className="startBtn" onClick={props.handleStartClick}>
          <h3 className="mainBtnText">START GAME</h3>
        </button>
      </div>
    );
};

  const waitingRoomText = () => {
    if (
      props.currentUserId === props.hostID
    ) {
      return (
        <h2 className="welcomeTextHost">
          As the <span className="welcomeTextHostSpan">host</span>, you can
          start the game whenever your party is ready!
          <Row className="seventy-five-row-seperator" />
          {startButton()}
        </h2>
        
      );
    } else {
      return (
        <h2 className="welcomeTextUser">
          The host,{" "}
          <span className="welcomeTextUserSpan">{props.hostName}</span>,
          will start the game soon!
        </h2>
      );
    }
  }
  return ( <div>
    {waitingRoomText()}
  </div>  );
}

export default WaitingRoom;