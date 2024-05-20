import { Typography } from "@material-tailwind/react";
import React from "react";

const LINKS = [
  {
    title: "Information",
    items: ["About", "Contact Us", "Outlets"],
  },
  {
    title: "My Account",
    items: ["My Orders", "Lost Password", "Track Order"],
  },
  {
    title: "Get in Touch",
    items: ["Terms & Conditions"],
  },
];

const currentYear = new Date().getFullYear();

export function FooterWithSocialLinks() {

  const [logoSrc, setLogoSrc] = React.useState(""); // State to hold logo source

  React.useEffect(() => {
    // Dynamically import the logo image
    import("./../assets/logos/logo.jpg")
      .then((module) => {
        // Set the logo source once it's loaded
        setLogoSrc(module.default);
      })
      .catch((error) => {
        console.error("Error loading logo image:", error);
      });
  }, []);

  return (
    <footer className="relative w-full h-full pt-[50px] bg-c2">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-2 justify-between gap-5 md:grid-cols-1">
          <img src={logoSrc} class="w-20 h-20" alt="logo" />
          <Typography
            variant="h5"
            className="mb-2 font-extrabold font-[Montserrat]"
          >
            PERERA BAKERS
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-medium justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="medium"
                  color="blue-gray"
                  className=" font-bold opacity-60 font-[Montserrat]"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-medium transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full h-full flex-col items-center justify-center  py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className=" text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="https://material-tailwind.com/">Perera Bakers</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-x-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                  clip-rule="evenodd"
                />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}
