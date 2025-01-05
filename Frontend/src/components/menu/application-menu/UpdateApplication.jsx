import React, { useState, useEffect } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const UpdateApplication = ({ applicationId }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    owner: "",
    createdOn: "",
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch application details based on applicationId if available
    if (applicationId) {
      const fetchApplicationDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:8091/api/v1/applications/${applicationId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch application details");
          }

          const data = await response.json();
          setFormData(data);
        } catch (error) {
          setErrorMessage(error.message);
          setShowErrorToast(true);
        }
      };

      fetchApplicationDetails();
    }
  }, [applicationId]);

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
      // Simulate API call to update the application
      const response = await fetch(
        `http://localhost:8091/api/v1/applications`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      setSuccessMessage("Application details updated successfully");
      setShowSuccessToast(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorToast(true);
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
      <h2>Update Application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAppId">
          <Form.Label style={{fontWeight: "bold"}}>Application ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter application ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

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

        <Form.Group controlId="formAppDate">
          <Form.Label style={{fontWeight: "bold"}}>Created On</Form.Label>
          <Form.Control
            type="date"
            name="createdOn"
            value={formData.createdOn}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Application"}
        </Button>
      </Form>
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
      <br/>
      <Button variant="secondary" onClick={() => window.history.back()}>
        Back to Application Management
      </Button>
    </div>
  );
};

export default UpdateApplication;
