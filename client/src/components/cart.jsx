import React, { Children } from 'react'
import PageLayout from './pagelayout';
import {
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Cart({children}) {
  return (
    <PageLayout>
       <Typography>
          <div className=" items-center justify-center flex font-bold font-[Montserrat] text-2xl pl-10 pt-10">
            <Link to="/shoppingCart">
              1. Shopping Cart &nbsp; {">"}
              {">"}{" "}
            </Link>
            <Link to="/checkout">
              &nbsp; 2. Checkout&nbsp; {">"}
              {">"}{" "}
            </Link>
            <Link to="/orderSuccess">&nbsp; 3. Order Complete &nbsp;</Link>
          </div>
        </Typography>
        {children}
    </PageLayout>
  )};
