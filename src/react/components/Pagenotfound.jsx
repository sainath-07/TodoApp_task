import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <p>
        404 <span>Page not found</span>
      </p>
      <Link to={"/"}>
        <button>back to home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
