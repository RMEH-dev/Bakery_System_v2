import React, { Children, useEffect, useState } from 'react'
import PageLayout from './pagelayout';
import {
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


const getDecodedToken = () => {
  const token = localStorage.getItem("token"); // Or however you store your JWT
  if (!token) return null;
  try {
    return jwtDecode(token);
    const user = data
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export function Cart({children}) {
  const decodedToken = getDecodedToken();
  const [userId, setUserId] = useState(decodedToken?.id);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (decodedToken?.id) {
      setUserId(decodedToken.id); // Ensure userId is set only once
    }
  }, [decodedToken?.id]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


  return (
    <PageLayout>
       <Typography>
          <div className=" items-center justify-center flex font-bold font-[Montserrat] text-2xl pl-10 pt-10">
            <Link to={`/shoppingCart/${userId}`}>
              1. Shopping Cart &nbsp; {">"}
              {">"}{" "}
            </Link>
            <Link to="/checkout/:id">
              &nbsp; 2. Checkout&nbsp; {">"}
              {">"}{" "}
            </Link>
            <Link to="/orderSuccess">&nbsp; 3. Order Complete &nbsp;</Link>
          </div>
        </Typography>
        {children}
    </PageLayout>
  )};
