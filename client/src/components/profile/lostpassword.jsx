import React from 'react'
import CustomerProfile from "../../pages/customer/profile";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

function LostPassword() {
  return (
    <CustomerProfile>
      <div className="z-100 -mt-[300px] ml-[350px] h-[350px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[1150px] mb-6 rounded-2xl text-c3 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[350px] sm:w-auto bg-gradient-to-r from-white to-c2 rounded-2xl z-80"
          shadow={true}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
            <Typography className="-mb-3 text-xl text-black font-bold font-[Montserrat]">
                Reset your password
              </Typography>
              <Typography className="-mb-3 text-black font-medium font-[Montserrat]">
              Lost your password? Please enter your registered email address. You will receive a link to create a new password via email.
              </Typography>
              <Typography className="-mb-3 text-black font-bold font-[Montserrat]">
                Account Email 
              </Typography>
               <Input
                type="text"
                size="md"
                placeholder="name@gmail.com"
                className="-mb-3 w-[400px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}required
              />
              </div>
              <Button
                className="mt-5 w-[300px] hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-xl font-[Montserrat]"
              >
                Reset Password
              </Button>
          </form>
        </Card>
      </div>
    </CustomerProfile>
  );
}

export default LostPassword
