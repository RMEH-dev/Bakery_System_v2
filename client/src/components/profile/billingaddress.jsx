import React from 'react'
import CustomerProfile from "../../pages/customer/profile";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

function BillingAddress() {
  return (
      <CustomerProfile>
      <div className="z-100 -mt-[300px] ml-[350px] h-[750px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[1150px] mb-6 rounded-2xl bg-c4 text-c3 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[750px] sm:w-auto bg-gradient-to-bl from-white to-c4 rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
            <Typography className="-mb-3 text-xl text-black font-bold font-[Montserrat]">
                Billing Address
              </Typography>
            <div className="grid flex grid-cols-2 gap-5">
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                First Name
              </Typography>
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Last Name
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="firstName"
                className="-mb-3 w-[400px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c1 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}required
              />
               <Input
                type="text"
                size="md"
                placeholder="lastName"
                className="-mb-3 w-[400px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}required
              />
              </div>
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Street Address
              </Typography>
              <div className="grid flex grid-cols-2 gap-5">
              <Input
                type="text"
                size="md"
                placeholder="xxxxx/xx xxxx"
                className="-mb-3 w-[960px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} required
              />
              </div>
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Town / City 
              </Typography>
              <Input
                type="tel"
                size="md"
                placeholder="Colombo 03"
                className="-mb-3 w-[895px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} required
              />
             
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
               Postcode / ZIP
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="12010"
                className="-mb-3 w-[895px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} required
              />
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Contact No.
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="077XXXXXX"
                className="-mb-3 w-[895px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} required
              />
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Email Address
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="name@gmail.com"
                className="-mb-3 w-[895px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} required
              />
              <Button
                className="mt-1 w-[300px] hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-xl font-[Montserrat]"
              >
                Save Address
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </CustomerProfile>
  )
}

export default BillingAddress
