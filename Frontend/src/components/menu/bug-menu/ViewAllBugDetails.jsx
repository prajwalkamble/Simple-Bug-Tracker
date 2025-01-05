import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Button } from "react-bootstrap";

const ViewAllBugDetails = () => {
  const [bugs, setBugs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bugsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:8091/api/v1/bugs")
      .then((response) => response.json())
      .then((data) => setBugs(data))
      .catch((error) => console.error("Error Fetching Bugs: ", error));
  }, []);

  // Get Current Bugs
  const indexOfLastBug = currentPage * bugsPerPage;
  const indexOfFirstBug = indexOfLastBug - bugsPerPage;
  const currentBugs = bugs.slice(indexOfFirstBug, indexOfLastBug);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{margin: "10px"}}>
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Bug Details</h2>
        <Link to="/" className="btn btn-danger">
          Sign Out
        </Link>
      </div>
      <table className="table">
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
          {currentBugs.map((bug) => (
            <tr key={bug.id}>
              <td>{bug.id}</td>
              <td>{bug.type}</td>
              <td>{bug.applicationImpacted}</td>
              <td>{bug.assignedTo}</td>
              <td>{bug.createdOn}</td>
              <td>{bug.createdBy}</td>
              <td>{bug.status}</td>
              <td>{bug.description}</td>
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
            { length: Math.ceil(bugs.length / bugsPerPage)},
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

export default ViewAllBugDetails;
