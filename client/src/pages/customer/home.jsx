import { CarouselCustomNavigation } from "../../components/carousel1";
import { FooterWithSocialLinks } from "../../components/footer";
import { MegaMenuWithHover } from "../../components/navbar";
import "../../index.css";
import React from "react";
import {  Fragment, useState } from "react";
import { SignUpForm } from "../../components/signupform";
export default function Home() {
  // const [showSignUp, setShowSignUp] = useState(true);

  return (
    <Fragment>
    <div>

      <MegaMenuWithHover className="fixed top-0 left-0 z-50" />{" "}
      {/* Set z-index to 2 */}
      <CarouselCustomNavigation className="relative z-10" />
      <FooterWithSocialLinks className="relative z-30"/> {/* Implicit z-index of 0 or default */}
    </div>,
      {/* <SignUpForm isVisible={showSignUp} onClose={() => setShowSignUp(false)} /> */}
      </Fragment>
  );
}
