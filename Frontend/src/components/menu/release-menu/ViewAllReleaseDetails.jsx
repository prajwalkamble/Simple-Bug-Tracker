import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Button } from "react-bootstrap";

const ViewAllReleaseDetails = () => {
  const [releases, setReleases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [releasesPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:8091/api/v1/releases")
      .then((response) => response.json())
      .then((data) => setReleases(data))
      .catch((error) => console.error("Error fetching releases:", error));
  }, []);

  // Get current applications
  const indexOfLastRel = currentPage * releasesPerPage;
  const indexOfFirstRel = indexOfLastRel - releasesPerPage;
  const currentRels = releases.slice(indexOfFirstRel, indexOfLastRel);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{margin: "10px"}}>
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Release Details</h2>
        <Link to="/" className="btn btn-danger">
          Sign Out
        </Link>
      </div>
      <table className="table">
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
          {currentRels.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td>{app.releaseDate}</td>
              <td>{app.status}</td>
              <td>{app.comments}</td>
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
            { length: Math.ceil(releases.length / releasesPerPage) },
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

export default ViewAllReleaseDetails;
