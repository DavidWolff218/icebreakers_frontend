import React from "react";
import { Row } from "react-bootstrap";
import AllUsers from "./allUsers";

const WaitingRoom = ({handleStartClick, currentUserId, hostID, users, hostName }) => {
  const startButton = () => {
    return (
      <div>
        <button className="startBtn" onClick={handleStartClick}>
          <h3 className="mainBtnText">START GAME</h3>
        </button>
      </div>
    );
  };

  const waitingRoomText = () => {
    if (currentUserId === hostID) {
      return (
        <h2 className="welcomeTextHost">
          As the <span className="welcomeTextHostSpan">host</span>, you can
          start the game whenever your party is ready!
          <AllUsers windowText={"Lobby"} users={users} />
          <Row className="seventy-five-row-seperator" />
          {startButton()}
        </h2>
      );
    } else {
      return (
        <div>
          <h2 className="welcomeTextUser">
            The host,{" "}
            <span className="welcomeTextUserSpan">{hostName}</span>, will
            start the game soon!
          </h2>
          <AllUsers windowText={"Lobby"} users={users} />
        </div>
      );
    }
  };
  return <div>{waitingRoomText()}</div>;
};

export default WaitingRoom;
