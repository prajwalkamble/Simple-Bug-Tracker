import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";

const ViewApplicationById = () => {
  const [applicationId, setApplicationId] = useState("");
  const [application, setApplication] = useState({
    id: "",
    name: "",
    createdOn: "",
    description: "",
    owner: "",
  });
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(true);

  const handleInputChange = (event) => {
    setApplicationId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowTable(false);
    fetch(`http://localhost:8091/api/v1/applications/${applicationId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch application");
        }
        return response.json();
      })
      .then((data) => {
        setApplication(data);
        setShowTable(true);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>View Application Details by ID</h2>
        <Link to="/" className="btn btn-danger">
          Sign Out
        </Link>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formApplicationId">
          <Form.Label style={{fontWeight: "bold"}}>Enter Application ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter application ID"
            value={applicationId}
            onChange={handleInputChange}
            required
            style={{border: "solid"}}
          />
        </Form.Group><br/>
        <Button variant="primary" type="submit">
          View Application
        </Button>
      </Form><br/>
      {error && <p className="text-danger">{error}</p>}
      {showTable && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created On</th>
              <th>Description</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{application.id}</td>
              <td>{application.name}</td>
              <td>{application.createdOn}</td>
              <td>{application.description}</td>
              <td>{application.owner}</td>
            </tr>
          </tbody>
        </Table>
      )}
      <Button variant="secondary" onClick={() => window.history.back()}>
        Back to Previous Menu
      </Button>
    </div>
  );
};

export default ViewApplicationById;
