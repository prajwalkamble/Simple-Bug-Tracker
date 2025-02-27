import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";

const ViewBugByStatus = () => {
  const [bugStatus, setBugStatus] = useState("");
  const [bug, setBug] = useState({
    id: "",
    type: "",
    applicationImpacted: "",
    assignedTo: "",
    createdOn: "",
    createdBy: "",
    status: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(true);

  const handleInputChange = (event) => {
    setBugStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowTable(false);
    try {
      const response = await fetch(`http://localhost:8091/api/v1/bugs?status=${bugStatus}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bug");
      }
      const data = await response.json();
      setBug(data);
      setShowTable(true);
      console.log(data);
    } catch (error) {
      console.error("Error occurred:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>View Bug Details by Status</h2>
        <Link to="/" className="btn btn-danger">
          Sign Out
        </Link>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBugStatus">
          <Form.Label style={{fontWeight: "bold"}}>Enter Bug Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Bug Status"
            value={bugStatus}
            onChange={handleInputChange}
            required
            style={{border: "solid"}}
          />
        </Form.Group><br/>
        <Button variant="primary" type="submit">
          View Bug
        </Button>
      </Form><br/>

      {error && <p className="text-danger">{error}</p>}
      {showTable && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Application Impacted</th>
              <th>Assigned To</th>
              <th>Created On</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bug.id}</td>
              <td>{bug.type}</td>
              <td>{bug.applicationImpacted}</td>
              <td>{bug.assignedTo}</td>
              <td>{bug.createdOn}</td>
              <td>{bug.createdBy}</td>
              <td>{bug.status}</td>
              <td>{bug.description}</td>
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

export default ViewBugByStatus;
