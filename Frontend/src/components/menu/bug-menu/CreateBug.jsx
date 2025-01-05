import React, { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const CreateBug = () => {
  const [formData, setFormData] = useState({
    type: "",
    applicationImpacted: "",
    assignedTo: "",
    createdBy: "",
    status: "",
    description: "",
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

    try{
      // Simulate API call to create new bug
      const response = await fetch(
        "http://localhost:8091/api/v1/bugs",
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

      if(!response.ok){
        throw new Error("Failed to create bug");
      }

      const data = await response.json();
      setSuccessMessage(
        `Bug "${data.type}" created successfully with ID ${data.id} on ${data.createdOn}`
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
      <h2>Create New Bug</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBugType">
          <Form.Label style={{fontWeight: "bold"}}>Bug Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bug type"
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
            placeholder="Enter application impacted"
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

        <Form.Group controlId="formBugCreatedBy">
          <Form.Label style={{fontWeight: "bold"}}>Created By</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bug created by"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>

        <Form.Group controlId="formBugStatus">
          <Form.Label style={{fontWeight: "bold"}}>Bug Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bug status"
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
            placeholder="Enter bug description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{width:"800px", border: "solid"}}
          />
        </Form.Group><br/>
        
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Bug"}
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
        Back to Bug Management
      </Button>
    </div>
  );
};

export default CreateBug;
