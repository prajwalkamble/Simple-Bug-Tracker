import React, { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const CreateApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
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
        "http://localhost:8091/api/v1/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            createdOn: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create application");
      }

      const data = await response.json();
      setSuccessMessage(
        // `Application "${data.name}" created successfully with ID ${data.id} on ${data.createdOn}`
        `Application "${data.name}" created successfully`
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
      <h2>Create New Application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAppName">
          <Form.Label style={{fontWeight: "bold"}}>Application Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter application name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formAppDescription">
          <Form.Label style={{fontWeight: "bold"}}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formAppOwner">
          <Form.Label style={{fontWeight: "bold"}}>Owner</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter owner name"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Application"}
        </Button>
      </Form>
      <Toast
        show={showSuccessToast}
        onClose={handleDismissSuccessToast}
        className="success-toast"
        delay={2000}
        autohide
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
        delay={2000}
        autohide
      >
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <br/>
      <Button variant="secondary" onClick={() => window.history.back()}>
        Back to Application Management
      </Button>
    </div>
  );
};

export default CreateApplication;
