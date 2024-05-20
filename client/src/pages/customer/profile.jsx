import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/pagelayout";
import { Typography } from "@material-tailwind/react";
import { ProductList } from "../../components/primary/productlist";
import AccountDetails from "../../components/profile/accountdetails.jsx";
import Address from "../../components/profile/address.jsx";
import LogOut from "../../components/profile/logout.jsx";
import LostPassword from "../../components/profile/lostpassword.jsx";
import MyOrders from "../../components/profile/myorders.jsx";

// const AccountDetails = React.lazy(() => import('../../components/profile/accountdetails.jsx'));
// const MyOrders = React.lazy(() => import('../../components/profile/myorders.jsx'));
// const Addresses = React.lazy(() => import('../../components/profile/address.jsx'));
// const LostPassword = React.lazy(() => import('../../components/profile/lostpassword.jsx'));
// const LogOut = React.lazy(() => import('../../components/profile/logout.jsx'));
// import profile component files as needed

const ProfileToggles = [
  {
    title: "Account Details",
    path: "/profileUser/AccountDetails",
    component: AccountDetails
  },
  {
    title: "Orders",
    path: "/profileUser/MyOrders",
    component: MyOrders
  },
  {
    title: "Addresses",
    path: "/profileUser/Addresses",
    component: Address
  },
  {
    title: "Lost Password",
    path: "/profileUser/LostPassword",
    component:LostPassword
  },
  {
    title: "Log Out",
    path: "/profileUser/LogOut",
    component:LogOut
  },
];

export default function CustomerProfile(props) {
  const children = props.children;

  const logoSrc = "./../assets/logos/logo.jpg"

  return (
    <PageLayout logoSrc={logoSrc}>
      <div className="bg-white bg-opacity-30">
        <Typography>
          <div className="flex font-bold font-[Montserrat] text-2xl pl-10 pt-10 mb-6">
            <Link to="/products">My Profile / </Link>
          </div>
        </Typography>
        <ul className="pl-6 pt-5 pb-5 w-[300px] md:w-[300px] lg:w-[300px] xl:w-[320px] 2xl:w-[330px] my-5 mb-6 rounded-r-2xl bg-gradient-to-r from-c2 to-c4 text-c3 flex flex-col space-y-1">
          {ProfileToggles.map((item) => (
            <li key={item.title} className="px-4 py-2 hover:text-white">
              <Link to={item.path}>
                <span className="text-lg font-bold font-[Montserrat]">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </PageLayout>
  );
}
