import React, { useEffect, useState } from "react";
import CustomerProfile from "../../pages/customer/profile";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import getDecodedToken from "../../services/jwtdecoder";

function AccountDetails() {
  const [userId, setUserId] = useState(null); // Initialize userId as null
  const navigate = useNavigate();

  useEffect(() => {
    const decodedToken = getDecodedToken();
    if (decodedToken && decodedToken.id) {
      setUserId(decodedToken.id);
    }
  }, []);

  return (
    <CustomerProfile>
      <div className="z-100 -mt-[300px] ml-[350px] h-[750px] w-[600px] md:w-[400px] lg:w-[300px] xl:w-[650px] 2xl:w-[1150px] mb-6 rounded-2xl bg-c4 text-c3 hover:text-c1 flex flex-col space-y-1">
        <Card
          className="flex flex-col h-[750px] sm:w-auto bg-gradient-to-bl from-white to-c4 rounded-2xl z-80"
          shadow={false}
        >
          <form className="ml-[50px] mt-5 mb-2 w-[600px] 2xl:w-[1150px] h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
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
                placeholder="lastName"
                className="-mb-3 w-[400px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c1 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
               <Input
                type="text"
                size="md"
                placeholder="firstName"
                className="-mb-3 w-[400px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              
              </div>
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                User Name
              </Typography>
              <div className="grid flex grid-cols-2 gap-5">
              <Input
                type="text"
                size="md"
                placeholder="userName"
                className="-mb-3 w-[400px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 -mt-2 text-black font-normal font-[Montserrat]">
                Note: User Name will be the displayed name on your profile once logged in.
              </Typography>
              </div>
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Contact No. 
              </Typography>
              <Input
                type="tel"
                size="md"
                placeholder="77xxxxxx"
                className="-mb-3 w-[895px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 text-l text-black font-bold font-[Montserrat]">
                CHANGE PASSWORD
              </Typography>
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Current Password (Provide your current password to proceed with a new password)
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="********"
                className="-mb-3 w-[895px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                New Password (Leave blank to keep your old password)
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="********"
                className="-mb-3 w-[895px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Confirm New Password (Leave blank to keep your old password)
              </Typography>
              <Input
                type="text"
                size="md"
                placeholder="********"
                className="-mb-3 w-[895px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c4 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Button
                className="mt-4 w-[895px] hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-xl font-[Montserrat]"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </CustomerProfile>
  );
}

export default AccountDetails;
