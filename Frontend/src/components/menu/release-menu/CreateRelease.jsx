import React, { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const CreateRelease = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    comments: "",
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call to create new application
      const response = await fetch(
        "http://localhost:8091/api/v1/releases",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            releaseDate: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create release");
      }

      const data = await response.json();
      setSuccessMessage(
        `Release "${data.name}" created successfully with ID ${data.id} on ${data.releaseDate}`
      );
      setShowSuccessToast(true);
      setTimeout(() => {setShowSuccessToast(false); setSuccessMessage(false)}, 2000);

    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorToast(true);
      setTimeout(() => {setShowErrorToast(false)}, 2000);

    } finally {
      setLoading(false);
    }
  };

  const handleDismissSuccessToast = () => {
    setShowSuccessToast(false);
  };

  const handleDismissErrorToast = () => {
    setShowErrorToast(false);
  };

  return (
    <div className="container">
      <h2>Create New Release</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRelName">
          <Form.Label style={{fontWeight: "bold"}}>Release Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter release name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formRelStatus">
          <Form.Label style={{fontWeight: "bold"}}>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter release status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>
        
        <Form.Group controlId="formRelComments">
          <Form.Label style={{fontWeight: "bold"}}>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Release"}
        </Button>
      </Form><br/>
      <Toast
        show={showSuccessToast}
        onClose={handleDismissSuccessToast}
        className="success-toast"
      >
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">Success!</strong>
        </Toast.Header>
        <Toast.Body>{successMessage}</Toast.Body>
      </Toast>
      <Toast
        show={showErrorToast}
        onClose={handleDismissErrorToast}
        className="error-toast"
      >
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <Button variant="secondary" onClick={() => window.history.back()}>
        Back to Release Management
      </Button>
    </div>
  );
};

export default CreateRelease;
