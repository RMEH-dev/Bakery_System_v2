
import { Children, PropsWithChildren } from "react";
import React from "react";
import { MegaMenuWithHover } from "./navbar";
import { FooterWithSocialLinks } from "./footer";


export default function PageLayout({ children, logoSrc }) {
  return (
    <div className="PageLayout">
      <MegaMenuWithHover logoSrc={logoSrc}/>
      {children}
      <FooterWithSocialLinks/>
    </div>
  );
}








