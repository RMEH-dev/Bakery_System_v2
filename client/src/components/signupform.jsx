import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//TODO: Try to change the client side validation behavior of signUp

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (event, email, contact, setError, addUser) => {
    event.preventDefault();

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        toast.error("Passwords do not match");
        return;
      }

      if (firstName.length < 3) {
        setError("First name must be at least 3 characters long");
        toast.error("First name must be at least 3 characters long");
        return;
      }

      if (lastName.length < 3) {
        setError("Last name must be at least 3 characters long");
        toast.error("Last name must be at least 3 characters long");
        return;
      }

      if (userName.length < 5) {
        setError("User name must be at least 3 characters long");
        toast.error("User name must be at least 3 characters long");
        return;
      }

      if (userName.length < 5) {
        setError("User name must be at least 3 characters long");
        toast.error("User name must be at least 3 characters long");
        return;
      }

      if (!isChecked) {
        setError("Agree the terms and conditions");
        toast.error(
          "Please agree to the Terms & Conditions by checking the checkbox."
        );
        return; // Prevent further processing if checkbox is not checked
      }

      // Check if email or contact already exists in the database
      const existingUser = await checkExistingUser(email, contact);
      if (existingUser) {
        setError("Account with this email or contact already exists");
        toast.error("Account with this email or contact already exists");
        return;
      }
      // If everything is fine, proceed with signup
      await addUser();
      console.log("Account created successfully!");
      toast.success("Account created successfully!");
    } catch (error) {
      console.error(error);
      setError("Error creating Account!");
      toast.error("Error creating Account!");
    }
  };

  const checkExistingUser = async (email, contact) => {
    // Make a request to the backend to check if the user already exists
    const response = await Axios.post(
      "http://localhost:5000/api/routes/checkExistingUser",
      {
        email,
        contact,
      }
    );
    return response.data.exists; // Assuming the backend returns whether the user exists
  };

  const addUser = async () => {
    // Send a request to your backend to save the user data
    await Axios.post("http://localhost:5000/api/routes/signUp", {
      firstName,
      lastName,
      userName,
      email,
      contact,
      password,
      confirmPassword,
    });
  };

  useEffect(() => {
    let timer;
    if (isButtonClicked) {
      timer = setTimeout(() => {
        // Redirect to /logIn after 5 seconds if the button was clicked
        window.location.href = "/logIn"; // or use history.push('/logIn') if you are using useHistory hook
      }, 5000);
    }

    // Clear the timer when the component unmounts or when button is clicked again
    return () => clearTimeout(timer);
  }, [isButtonClicked]); // Run this effect whenever isButtonClicked changes

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <div
      className="inset-0 flex justify-center items-center bg-gradient-to-br from-deep-orange-800 to-deep-orange-200 backdrop-blur-sm"
      //   onClick={() => onClose(handleClose)}
    >
      <ToastContainer />
      <div className="p-5 w-[600px] flex flex-col">
        <Card
          className="w-[565px] h-[900px] bg-white rounded-2xl z-80"
          shadow={false}
        >
          <Typography className="pl-12 pt-5 text-2xl text-black font-bold font-[Montserrat]">
            Sign Up
          </Typography>
          <Typography className="text-black mt-0 font-medium font-[Montserrat] pl-12 pt-2">
            Register to explore more!
          </Typography>
          <Typography className=" mt-3 w-[450px] h-2 rounded-r-2xl bg-deep-orange-900"></Typography>
          <form
            onSubmit={(event) =>
              handleSubmit(event, email, contact, setError, addUser)
            }
            id="signUp-Form"
            className="ml-[50px] mt-5 mb-2 w-80 h-150 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <div className="grid flex grid-cols-2 gap-5">
                <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                  First Name
                </Typography>
                <Typography className="-mb-3 ml-16 text-black font-semibold font-[Montserrat]">
                  Last Name
                </Typography>
                <Input
                  name="firstName"
                  type="text"
                  size="md"
                  placeholder="abc"
                  className="-mb-3 text-black font-semibold font-[Montserrat]  border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-100  rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                  required
                />

                <Input
                  name="lastName"
                  type="text"
                  size="md"
                  placeholder="xyz"
                  className="-mb-3 ml-16 text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-100  rounded-[30px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                  required
                />
              </div>
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Username
              </Typography>
              <Input
                name="userName"
                type="text"
                size="md"
                placeholder="firstName12"
                className="-mb-3 w-[470px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-100 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                required
              />
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Email Address
              </Typography>
              <Input
                name="email"
                type="email"
                size="md"
                placeholder="name@mail.com"
                className="-mb-3 w-[470px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-100 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Contact No.
              </Typography>
              <Input
                name="contact"
                type="tel"
                size="md"
                placeholder="077xxxxxxx"
                className="-mb-3 w-[470px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-100 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(event) => {
                  setContact(event.target.value);
                }}
                required
              />
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Password
              </Typography>
              <Input
                name="password"
                type="password"
                size="md"
                placeholder="********"
                className="-mb-3 w-[470px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-100 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
              <Typography className="-mb-3 text-black font-semibold font-[Montserrat]">
                Confirm Password
              </Typography>
              <Input
                name="confirmPassword"
                type="password"
                size="md"
                placeholder="********"
                className="-mb-3 w-[470px] text-black font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-deep-orange-100 rounded-[30px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                required
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-3 text-gray font-[Montserrat] flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="text-gray font-[Montserrat] flex items-center font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "mt-3 -ml-2.5 " }}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <Link to="/logIn" onClick={handleButtonClick}>
              <Button
                className="ml-10 mt-6 hover:bg-deep-orange-900 bg-deep-orange-500 rounded-3xl text-white text-xl font-[Montserrat]"
                fullWidth
                onClick={(event) =>
                  handleSubmit(event, email, contact, setError, addUser)
                }
              >
                sign up
              </Button>
            </Link>
            <Typography
              color="gray"
              className=" ml-14 text-gray font-[Montserrat] mt-4 text-center font-normal"
            >
              Already have an account?{" "}
              <Link
                to="/logIn"
                className=" text-gray font-[Montserrat] font-medium text-gray-900"
              >
                Log In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}
