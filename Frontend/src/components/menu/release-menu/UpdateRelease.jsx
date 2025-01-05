import React, { useState, useEffect } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const UpdateRelease = ({ releaseId }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    releaseDate: "",
    status: "",
    comments: "",
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch application details based on applicationId if available
    if (releaseId) {
      const fetchReleaseDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:8091/api/v1/releases/${releaseId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch release details");
          }

          const data = await response.json();
          setFormData(data);
        } catch (error) {
          setErrorMessage(error.message);
          setShowErrorToast(true);
        }
      };

      fetchReleaseDetails();
    }
  }, [releaseId]);

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
        `http://localhost:8091/api/v1/releases`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update release");
      }

      setSuccessMessage("Release details updated successfully");
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
      <h2>Update Release</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAppId">
          <Form.Label style={{fontWeight: "bold"}}>Release ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter release ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

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

        <Form.Group controlId="formAppDate">
          <Form.Label style={{fontWeight: "bold"}}>Release Date</Form.Label>
          <Form.Control
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formAppOwner">
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

        <Form.Group controlId="formAppDescription">
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
          {loading ? "Updating..." : "Update Release"}
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

export default UpdateRelease;
