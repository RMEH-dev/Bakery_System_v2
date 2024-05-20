import React from "react";
import { ProductGallery } from "../../components/productgallery";
import { MegaMenuWithHover } from "../../components/navbar";
import { FooterWithSocialLinks } from "../../components/footer";

export default function Products() {
  return (
    <div>
      <MegaMenuWithHover className="fixed top-0 left-0 z-2" />{" "}
      <ProductGallery/>,
      <FooterWithSocialLinks className="z-10"/> {/* Implicit z-index of 0 or default */}
    </div>
  );
}
