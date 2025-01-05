import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const DeleteApplication = () => {
  const [applicationId, setApplicationId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseConfirmation = () => setShowConfirmation(false);

  const handleShowConfirmation = () => setShowConfirmation(true);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8091/api/v1/applications?id=${applicationId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      // eslint-disable-next-line
      const data = await response.text();
      setErrorMessage(
        `Application ID ${applicationId} and its details have been successfully deleted`
      );
      setShowSuccessToast(true);
      setApplicationId("");
    } catch (error) {
      setErrorMessage(error.message);
      setShowSuccessToast(false);
    }
    setShowConfirmation(false);
  };

  return (
    <div style={{margin: "10px"}}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Delete Application</h2>
        <Button variant="danger" onClick={() => console.log("Sign Out")}>
          Sign Out
        </Button>
      </div>
      <Form>
        <Form.Group controlId="formApplicationId">
          <Form.Label style={{fontWeight: "bold"}}>Application ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter application ID"
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
            required
            style={{ width: "800px", border: "solid" }}
          />
          {applicationId && (
            <p className="text-danger">
              Are you sure you want to delete Application ID {applicationId}?
              This action cannot be undone.
            </p>
          )}
        </Form.Group><br/>
        <Button variant="danger" onClick={handleShowConfirmation}>
          Delete Application
        </Button>
      </Form>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete Application ID {applicationId}?
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

export default DeleteApplication;
