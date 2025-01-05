import React from "react";
import "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer fixed-bottom bg-dark text-light">
      <div className="container-fluid text-center">
        {/* eslint-disable-next-line */}
        <p>
        <span>Created by </span>
          <a 
            href="https://github.com/prajwalkamble" 
            target="_blank" 
            rel="noopener noreferrer">
            Prajwal Kamble
          </a> 
          <span> &copy; {currentYear}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
