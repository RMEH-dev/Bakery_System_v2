import "./../index.css";
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { LogInForm } from "../components/loginform";
export default function LogIn() {
//   const [showSignUp, setShowSignUp] = useState(true);

  return (
    <Fragment>
      <LogInForm className="z-80" />
    </Fragment>
  );
}
