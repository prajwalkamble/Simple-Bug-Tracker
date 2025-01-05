import React from "react";
import { Link } from "react-router-dom";

const ReleaseMenu = () => {
  return (
    <div className="container" style={{"margin-top":"5px"}}>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <Link to="/menu-manager" className="btn btn-secondary">
              Go to Previous Menu
            </Link>
            <Link to="/" className="btn btn-danger">
              Sign Out
            </Link>
          </div>

          <h4 className="card-title">Release Management</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link
                to="/releases-view-all"
                className="btn btn-primary btn-block"
              >
                View All Releases
              </Link>
              <p>
                View all existing releases registered in the system. This
                comprehensive list provides detailed insights into each
                release, including its name, version, status, and any
                associated metadata. Use this view to gain a holistic
                understanding of your release ecosystem.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/releases-create"
                className="btn btn-success btn-block"
              >
                Create New Release
              </Link>
              <p>
                Create a new release in the system. This allows you to
                define and track new releases, manage their lifecycle, and
                ensure smooth release management.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/releases-update"
                className="btn btn-warning btn-block"
              >
                Update Release
              </Link>
              <p>
                Update an existing release in the system. This allows you
                to modify and adjust existing releases, manage their
                lifecycle, and ensure smooth release management.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/releases-delete"
                className="btn btn-danger btn-block"
              >
                Delete Release
              </Link>
              <p>
                Delete an existing release from the system. This allows
                you to remove releases from the system, manage their
                lifecycle, and ensure smooth release management.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/releases-view-by-id"
                className="btn btn-info btn-block"
              >
                View Release By ID
              </Link>
              <p>
                View a specific release by its ID in the system. This
                allows you to retrieve detailed information about a
                specific release, including its name, version, status, and
                any associated metadata.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/releases-view-by-name"
                className="btn btn-secondary btn-block"
              >
                View Release By Name
              </Link>
              <p>
                View a specific release by its name in the system. This
                allows you to retrieve detailed information about a
                specific release, including its name, version, status, and
                any associated metadata.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReleaseMenu;
