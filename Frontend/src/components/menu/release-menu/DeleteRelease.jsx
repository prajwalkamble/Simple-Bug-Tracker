import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const DeleteRelease = () => {
  const [releaseId, setReleaseId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseConfirmation = () => setShowConfirmation(false);

  const handleShowConfirmation = () => setShowConfirmation(true);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8091/api/v1/releases?id=${releaseId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete release");
      }

      // eslint-disable-next-line
      const data = await response.text();
      setErrorMessage(
        `Release ID ${releaseId} and its details have been successfully deleted`
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
        <h2>Delete Release</h2>
        <Button variant="danger" onClick={() => console.log("Sign Out")}>
          Sign Out
        </Button>
      </div>
      <Form>
        <Form.Group controlId="formReleaseId">
          <Form.Label style={{fontWeight: "bold"}}>Release ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter release ID"
            value={releaseId}
            onChange={(e) => setReleaseId(e.target.value)}
            required
            style={{ width: "800px", border: "solid" }}
          />
          {releaseId && (
            <p className="text-danger">
              Are you sure you want to delete Release ID {releaseId}?
              This action cannot be undone.
            </p>
          )}
        </Form.Group><br/>
        <Button variant="danger" onClick={handleShowConfirmation}>
          Delete Release
        </Button>
      </Form>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete Release ID {releaseId}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
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
            <strong className="mr-auto">Success!</strong>
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

export default DeleteRelease;
