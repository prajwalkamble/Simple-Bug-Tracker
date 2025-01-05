import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    // Simulate login process (replace with actual authentication logic)
    if (username === "admin" && password === "tHe.mR_J0KeR") {
      // If login successful, clear error, set loggedIn to true, and call onLogin callback
      setError("");
      setLoggedIn(true);
      onLogin(username);
    } else {
      setError("Invalid username or password");
    }
  };

  // Redirect to MenuManager if loggedIn is true
  if (loggedIn) {
    return <Navigate to="/menu-manager" />;
  }

  return (
    <div className={styles.loginbackground}>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Bug Tracking System
              </h2>
              <p className="text-muted text-center">
                We are more than just a management system. A bug tracking system
                is an application that lets you keep track of bugs (and often
                suggestions) for your software project in a database. An
                efficient bug tracking system that can be mapped well to your
                development and quality processes is an invaluable tool.
              </p>
              <p className="text-muted text-center">
                Bug tracking is the process of logging and monitoring bugs or
                errors during software testing. It is also referred to as defect
                tracking or issue tracking. Large systems may have hundreds or
                thousands of defects. Each needs to be evaluated, monitored and
                prioritized for debugging.
              </p>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary btn-block"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
