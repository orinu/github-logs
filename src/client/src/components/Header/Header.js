import React from "react";
import "./Header.css";

import auditechLogo from "./AuditechLogo.svg";

const Header = () => {
  return (
    <div className="header">
      <h1> GitHub monitor integration</h1>
      <div className="mid-header">
        <h2 className="upper-mid-header">
          <span>Ori Nahum </span>
        </h2>
        <h3 className="bottom-mid-header">
          <a href="https://github.com/orinu/github-logs/tree/main/src/server"> Api Server </a>
          <a href="https://github.com/orinu/github-logs/tree/main/src/client"> Client</a>
          <a href="https://github.com/orinu/github-logs-demo-repo"> Demo Repo</a>
        </h3>
      </div>
      <img src={auditechLogo} alt="logo" />
    </div>
  );
};

export default Header;
