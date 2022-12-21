import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AdminModal({ data, show, handleToggle}) {

  return(
    <Modal show={show} onHide={handleToggle(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleToggle(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}