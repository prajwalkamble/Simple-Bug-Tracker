import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Button } from "react-bootstrap";

const ViewAllApplicationDetails = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:8091/api/v1/applications")
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, []);

  // Get current applications
  const indexOfLastApp = currentPage * applicationsPerPage;
  const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
  const currentApps = applications.slice(indexOfFirstApp, indexOfLastApp);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{margin: "10px"}}>
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Application Details</h2>
        <Link to="/" className="btn btn-danger">
          Sign Out
        </Link>
      </div>
      <table className="table">
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
          {currentApps.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td>{app.createdOn}</td>
              <td>{app.description}</td>
              <td>{app.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="secondary" onClick={() => window.history.back()}>
          Back to Previous Menu
        </Button>
        <Pagination>
          {Array.from(
            { length: Math.ceil(applications.length / applicationsPerPage) },
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                onClick={() => paginate(index + 1)}
                active={index + 1 === currentPage}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default ViewAllApplicationDetails;
