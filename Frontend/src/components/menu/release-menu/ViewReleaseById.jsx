import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";

const ViewReleaseById = () => {
  const [releaseId, setReleaseId] = useState("");
  const [release, setRelease] = useState({
    id: "",
    name: "",
    releaseDate: "",
    status: "",
    comments: "",
  });
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(true);

  const handleInputChange = (event) => {
    setReleaseId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowTable(false);
    fetch(`http://localhost:8091/api/v1/releases/${releaseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch release");
        }
        return response.json();
      })
      .then((data) => {
        setRelease(data);
        setShowTable(true);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>View Release Details by ID</h2>
        <Link to="/" className="btn btn-danger">
          Sign Out
        </Link>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formReleaseId">
          <Form.Label style={{fontWeight: "bold"}}>Enter Release ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter release ID"
            value={releaseId}
            onChange={handleInputChange}
            required
            style={{border: "solid"}}
          />
        </Form.Group><br/>
        <Button variant="primary" type="submit">
          View Release
        </Button>
      </Form><br/>
      {error && <p className="text-danger">{error}</p>}
      {showTable && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Release Date</th>
              <th>Status</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{release.id}</td>
              <td>{release.name}</td>
              <td>{release.releaseDate}</td>
              <td>{release.status}</td>
              <td>{release.comments}</td>
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

export default ViewReleaseById;
