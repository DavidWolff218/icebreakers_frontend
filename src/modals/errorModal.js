import React from "react";
import { Modal, Button } from "react-bootstrap"

function ErrorModal({handleClose, errorText}) {
  return ( <div>
<Modal show={true} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>{"Oops!"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorText}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </div>  );
}

export default ErrorModal;