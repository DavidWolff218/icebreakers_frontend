import React from "react";
import { Modal } from "react-bootstrap"

function ErrorModal() {
  return ( <div>
<Modal show={true} onHide={false}>
        <Modal.Header closeButton>
          <Modal.Title>{}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </div>  );
}

export default ErrorModal;