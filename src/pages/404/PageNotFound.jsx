import React from "react";
import { Link } from "react-router-dom";

function pageNotFound() {
  return (
    <div>
      <h1>Error 404 Page not found</h1>
      <Link to={"/"}>Back to Home Page</Link>
    </div>
  );
}

export default pageNotFound;
