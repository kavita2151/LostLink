import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">LostLink</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/report-lost">Report Lost</Link></li>
        <li><Link to="/report-found">Report Found</Link></li>
        <li><Link to="/all-items">All Reported Items</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
