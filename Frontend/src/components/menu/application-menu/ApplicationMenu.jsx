import React from "react";
import { Link } from "react-router-dom";

const ApplicationMenu = () => {
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
          <h4 className="card-title">Application Management</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link
                to="/applications-view-all"
                className="btn btn-primary btn-block"
              >
                View All Applications
              </Link>
              <p>
                View all existing applications registered in the system. This
                comprehensive list provides detailed insights into each
                application, including its name, version, status, and any
                associated metadata. Use this view to gain a holistic
                understanding of your application ecosystem.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/applications-create"
                className="btn btn-success btn-block"
              >
                Create New Application
              </Link>
              <p>
                Create a new application to expand your system's capabilities.
                By registering a new application, you can track its development,
                deployment, and usage. Provide essential information such as the
                application name, version, description, and other pertinent
                details to ensure accurate record-keeping and management.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/applications-update"
                className="btn btn-warning btn-block"
              >
                Update Application
              </Link>
              <p>
                Update an existing application's details to keep your records
                current and accurate. Whether correcting a typo in the
                application name or updating its version number, this feature
                ensures that your system's information remains up-to-date and
                reflective of the latest developments.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/applications-delete"
                className="btn btn-danger btn-block"
              >
                Delete Application
              </Link>
              <p>
                Permanently remove an application from the system. Exercise
                caution when using this option, as it irreversibly deletes all
                associated data and configurations. Ensure that the application
                being deleted is no longer required and that its removal will
                not impact other system functionalities.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/applications-view-by-id"
                className="btn btn-info btn-block"
              >
                View Application Details by ID
              </Link>
              <p>
                View the details of a specific application by providing its
                unique identifier (ID). This option allows you to retrieve
                comprehensive information about a particular application,
                including its name, version, description, owner, and other
                relevant data.
              </p>
            </li>
            <li className="list-group-item">
              <Link
                to="/applications-view-by-name"
                className="btn btn-secondary btn-block"
              >
                View Application Details by Name
              </Link>
              <p>
                View the details of a specific application by providing its
                name. This option allows you to retrieve comprehensive
                information about a particular application, including its ID,
                creation date, description, owner, and other relevant data.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApplicationMenu;
