import React from "react";
import { Link } from "react-router-dom";

const MenuManager = () => {
  const modules = [
    {
      title: "Application Management",
      description:
        "Manage applications, view by ID, create, modify, and delete applications. Keep track of your applications' lifecycle and ensure smooth operation.",
      image: "https://picsum.photos/id/1/350/200",
      route: "/application-management",
    },
    {
      title: "Bug Management",
      description:
        "Track and manage bugs, view by ID, create, modify, and delete bugs. Ensure the quality of your software by resolving issues efficiently.",
      image: "https://picsum.photos/id/26/350/200",
      route: "/bug-management",
    },
    {
      title: "Release Management",
      description:
        "Manage releases, view by ID, create, modify, and delete releases. Control the deployment process and streamline software releases.",
      image: "https://picsum.photos/id/60/350/200",
      route: "/release-management",
    },
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/" className="btn btn-danger" style={{"marginTop": "5px"}}>
          Sign Out
        </Link>
      </div>
      <h2>I can help you with :</h2>
      <div className="row">
        {modules.map((module, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={module.image}
                className="card-img-top"
                alt={module.title}
              />{" "}
              {/* Add image */}
              <div className="card-body">
                <h5 className="card-title">{module.title}</h5>
                <p className="card-text">{module.description}</p>
                <Link to={module.route} className="btn btn-primary">
                  Go to {module.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManager;
