import React, { memo } from "react";
import { Link } from "react-router-dom";

import "./noMatch.css";
import { LOCATIONS } from "constants/index";

function NoMatch() {
  return (
    <div className="content">
      <h1>404 Not Found!!!</h1>
      <Link to={LOCATIONS.PRODUCTS}>
        <button>Go Home</button>
      </Link>
    </div>
  );
}

export default memo(NoMatch);
