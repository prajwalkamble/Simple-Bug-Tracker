import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const DeleteBug = () => {
  const [bugId, setBugId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseConfirmation = () => setShowConfirmation(false);

  const handleShowConfirmation = () => setShowConfirmation(true);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8091/api/v1/bugs?id=${bugId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete bug");
      }

      // eslint-disable-next-line
      const data = await response.text();
      setErrorMessage(
        `Bug ID ${bugId} and its details have been successfully deleted`
      );
      setShowSuccessToast(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowSuccessToast(false);
    }
  };

  return (
    <div style={{margin: "10px"}}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Delete Bug</h2>
        <Button variant="danger" onClick={() => console.log("Sign Out")}>
          Sign Out
        </Button>
      </div>
      
      <Form>
        <Form.Group controlId="formBugId">
          <Form.Label style={{fontWeight: "bold"}}>Bug ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bug ID"
            value={bugId}
            onChange={(e) => setBugId(e.target.value)}
            required
            style={{ width: "800px", border: "solid" }}
          />
          {bugId && (
            <p className="text-danger">
              Are you sure you want to delete Bug ID {bugId}?
              This action cannot be undone.
            </p>
          )}
        </Form.Group><br/>
        <Button variant="danger" onClick={handleShowConfirmation}>
          Delete Bug
        </Button>
      </Form>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want ot delete Bug ID {bugId}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {showSuccessToast && (
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="mr-auto">Success</strong>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">{errorMessage}</div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button variant="secondary" onClick={() => window.history.back()}>
          Back to Previous Menu
        </Button>
      </div>
    </div>
  );
};

export default DeleteBug
