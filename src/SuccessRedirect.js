import React from "react";
import { Link } from "react-router-dom";

export const SuccessRedirect = () => {
  return (
    <div>

      <h1>Your Password Rest Password Successfully</h1>
      <Link className="mt-3" to="/login">
        Login
      </Link>
    </div>
  );
};
