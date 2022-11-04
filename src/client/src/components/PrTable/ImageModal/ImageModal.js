import React from "react";
import { Button, Image, Modal } from "semantic-ui-react";
import "./ImageModal.css";

function ImageModal({ prIdImageModal, setPrIdImageModalOpen }) {
  return (
    <Modal
      onClose={() => setPrIdImageModalOpen(false)}
      open={!!prIdImageModal}
      size="small"
      id="modal-pr"
    >
      <Modal.Header id="modal-header">
        <h1>Pull request Image</h1>
        <span>Id number {prIdImageModal}</span>
      </Modal.Header>

      <Modal.Content image id="content">
        <Image
          size="large"
          src={`http://0.0.0.0:8000/api/pic/${prIdImageModal}`}
          wrapped
          id="image-modal"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setPrIdImageModalOpen(false)} positive>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ImageModal;
