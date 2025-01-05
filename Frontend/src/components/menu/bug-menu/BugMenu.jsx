import React from 'react';
import { Link } from 'react-router-dom';

const BugMenu = () => {
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
          <h4 className="card-title">Bug Management</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to="/bugs-view-all" className="btn btn-primary btn-block">
                View All Bugs
              </Link>
              <p>
                View all existing bugs registered in the system. This
                comprehensive list provides detailed insights into each
                bug, including its name, version, status, and any
                associated metadata. Use this view to gain a holistic
                understanding of your bug ecosystem.
              </p>
            </li>
            <li className="list-group-item">
              <Link to="/bugs-create" className="btn btn-success btn-block">
                Create New Bug
              </Link>
              <p>
                Create a new bug to expand your system's capabilities.
                By registering a new bug, you can track its development,
                deployment, and usage. Provide essential information such as the
                bug name, version, description, and other pertinent
                details to ensure accurate record-keeping and management.
              </p>
            </li>
            <li className="list-group-item">
              <Link to="/bugs-update" className="btn btn-warning btn-block">
                Update Bug
              </Link>
              <p>
                Update an existing bug's details to keep your records
                current and accurate. Whether correcting a typo in the
                bug name or updating its version number, this feature
                ensures that your system's information remains up-to-date and
                reflective of the latest developments.
              </p>
            </li>
            <li className="list-group-item">
              <Link to="/bugs-delete" className="btn btn-danger btn-block">
                Delete Bug
              </Link>
              <p>
                Permanently remove a bug from the system. Exercise
                caution when using this option, as it irreversibly deletes all
                associated data and configurations. Ensure that the bug
                being deleted is no longer required and that its removal will
                not impact other system functionalities.
              </p>
            </li>
            <li className="list-group-item">
              <Link to="/bugs-view-by-id" className="btn btn-info btn-block">
                View Bug Details by ID
              </Link>
              <p>
                View the details of a specific bug by providing its
                unique identifier (ID). This option allows you to retrieve
                comprehensive information about a particular bug,
                including its name, version, description, owner, and other
                relevant data.
              </p>
            </li>
            <li className="list-group-item">
              <Link to="/bugs-view-by-status" className="btn btn-secondary btn-block">
                View Bug Details by Status
              </Link>
              <p>
                View the details of a specific bug by providing its
                name. This option allows you to retrieve comprehensive
                information about a particular bug, including its ID,
                creation date, description, owner, and other relevant data.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default BugMenu
