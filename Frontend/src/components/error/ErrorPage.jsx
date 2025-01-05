import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container">
      <h2>Oops, something went wrong!</h2>
      <p>
        We apologize for the inconvenience. Our team has been notified about
        this issue.
      </p>
      <p>
        In the meantime, if you need immediate assistance, please contact our
        support team:
      </p>
      <ul>
        <li>
          Send an email to:{" "}
          <a href="mailto:support@example.com">admin@prajwalbugtracking.com</a>
        </li>
        <li>
          Call us at: <a href="tel:+1234567890">+91 9168348185</a> (24/7 support)
        </li>
      </ul>
      <p>
        Click <Link to="/">here</Link> to go back to the homepage.
      </p>
    </div>
  );
};

export default ErrorPage;
