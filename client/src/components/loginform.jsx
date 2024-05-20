import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from 'jwt-decode';

export function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return;
      }

      const response = await Axios.post(
        "http://localhost:5000/api/routes/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        const { userType } = jwtDecode(token);
        localStorage.setItem("token", token);

        setIsButtonClicked(true);
        toast.success(`${userType} Login Successful`);
        
        setTimeout(() => {
          if (userType === "Admin") {
            navigate("/adminDashboard");
          } else if (userType === "Staff") {
            navigate("/staffDashboard");
          } else {
            navigate("/");
          }
        }, 3000); // Set a delay of 3 seconds before navigating
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during Login");
    }
  };

  useEffect(() => {
    let timer;
    if (isButtonClicked) {
      timer = setTimeout(() => {
        // Redirect to home page after 5 seconds if the button was clicked
        navigate("/"); // Redirect to homepage
      }, 3000);
    }
    // Clear the timer when the component unmounts or when button is clicked again
    return () => clearTimeout(timer);
  }, [isButtonClicked, navigate]); // Include history in dependencies array


  return (
    <div className="inset-0 flex justify-center items-center bg-gradient-to-br from-c3 to-c2 backdrop-blur-sm">
      <div className="p-5 w-[600px] h-screen ">
        <Card
          className="flex flex-col w-[565px] h-[500px] sm:w-auto bg-white rounded-2xl z-80"
          shadow={false}
        >
          <Typography className="pl-12 pt-5 text-2xl text-black font-bold font-[Montserrat]">
            Log In
          </Typography>
          <Typography className="text-black mt-0 font-medium font-[Montserrat] pl-12 pt-2">
            To taste the flavors of freshness!
          </Typography>
          <Typography className=" mt-3 w-[475px] h-2 rounded-r-2xl bg-c3"></Typography>
          <form onSubmit={handleLogin} className="ml-[50px] mt-5 mb-2 w-80 h-150 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Email
              </Typography>
              <Input
                type="email"
                size="md"
                value={email}
                placeholder="name@mail.com"
                className="-mb-3 w-[470px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-200 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />

              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Password
              </Typography>
              <Input
                type="password"
                size="md"
                placeholder="********"
                value={password}
                className="-mb-3 w-[470px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-100 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <Typography
                color="gray"
                className="text-gray font-[Montserrat] text-left text-sm font-normal"
              >
                Forgot password?{" "}
                <Link className=" text-gray font-[Montserrat] font-medium text-gray-900">
                  Reset Password
                </Link>
              </Typography>
            </div>
            <Button
              type="submit"
              className="w-[300px] ml-20 mt-5 hover:bg-deep-orange-900 bg-c3 rounded-3xl text-white text-xl font-[Montserrat]"
           >
              log in
            </Button>
            <Typography
              color="gray"
              className="ml-20 text-gray font-[Montserrat] mt-5 text-center font-normal"
            >
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className=" text-gray font-[Montserrat] font-medium text-gray-900"
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}
