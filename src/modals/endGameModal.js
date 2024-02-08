import React from "react";
import { Modal } from "react-bootstrap";

function EndGameModal() {
  return ( 
    <Modal show={true} backdrop="static"
    keyboard={false} centered >
        <Modal.Header >
          <Modal.Title>Game Ended</Modal.Title>
        </Modal.Header>
        <Modal.Body>The host has ended the game and you are being redirected back to the homepage. Thanks for playing!</Modal.Body>
      </Modal>
  );
}

export default EndGameModal;