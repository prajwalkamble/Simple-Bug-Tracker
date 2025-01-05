import React, { useState, useEffect } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const UpdateBug = ({bugId}) => {
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    applicationImpacted: "",
    assignedTo: "",
    createdOn: "",
    createdBy: "",
    status: "",
    description: "",
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch bug details based on bugId if available
    if (bugId) {
      const fetchBugDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:8091/api/v1/bugs/${bugId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch bug details");
          }

          const data = await response.json();
          setFormData(data);
        } catch (error) {
          setErrorMessage(error.message);
          setShowErrorToast(true);
        }
      };

      fetchBugDetails();
    }
  }, [bugId]);

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
      // Simulate API call to update the bug
      const response = await fetch(
        `http://localhost:8091/api/v1/bugs`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update bug");
      }

      setSuccessMessage("Bug details updated successfully");
      setShowSuccessToast(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorToast(true);
    } finally {
      setLoading(false);
    };
  };

  const handleDismissSuccessToast = () => {
    setShowSuccessToast(false);
  };

  const handleDismissErrorToast = () => {
    setShowErrorToast(false);
  };

  return (
    <div className="container">
      <h2>Update Bug</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBugId">
          <Form.Label style={{fontWeight: "bold"}}>Bug ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Bug ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formBugType">
          <Form.Label style={{fontWeight: "bold"}}>Bug Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Bug Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formBugApplicationImpacted">
          <Form.Label style={{fontWeight: "bold"}}>Application Impacted</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Application Impacted"
            name="applicationImpacted"
            value={formData.applicationImpacted}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formBugAssignedTo">
          <Form.Label style={{fontWeight: "bold"}}>Assigned To</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter whom the bug is assigned"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formBugCreatedOn">
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

        <Form.Group controlId="formBugCreatedBy">
          <Form.Label style={{fontWeight: "bold"}}>Created By</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter who created the bug"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formBugStatus">
          <Form.Label style={{fontWeight: "bold"}}>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formBugDescription">
          <Form.Label style={{fontWeight: "bold"}}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Bug"}
        </Button>
      </Form>

      <Toast
        show={showSuccessToast}
        onClose={handleDismissSuccessToast}
        className="success-toast"
      >
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">Success.</strong>
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
        Back to Bug Management
      </Button>
    </div>
  )
}

export default UpdateBug
