import "./../index.css";
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { SignUpForm } from "../components/signupform";
import Home from "./customer/home";
export default function SignUp() {
//   const [showSignUp, setShowSignUp] = useState(true);

  return (
    <Fragment>
      <SignUpForm className="z-80" />
    </Fragment>
  );
}
