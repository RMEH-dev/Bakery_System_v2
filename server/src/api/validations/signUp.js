import * as Constants from "./src/helpers/validEmail";

import connectToDatabase from "./src/api/models/databaseConnection";


const formValidation = (
    firstName,
    lastName,
    userName,
    email,
    contact,
    password,
    confirmPassword,
  ) => {
    let isValid = true;
    let error = [];


    
  if (firstName!== undefined) {
    if (!firstName) {
      error.push({ input: "firstName", message: "First Name is required." });
      isValid = false;
    } else if (firstName.length < 4) {
      error.push({
        input: "firstName",
        message: "First Name must be at least 4 characters long.",
      });
      isValid = false;
    }
  }

  if (lastName!== undefined) {
    if (!lastName) {
      error.push({ input: "lastName", message: "Last Name is required." });
      isValid = false;
    } else if (lastName.length < 4) {
      error.push({
        input: "lastName",
        message: "Last Name must be at least 4 characters long.",
      });
      isValid = false;
    }
  }

  if (userName!== undefined) {
    if (!userName) {
      error.push({ input: "userName", message: "User Last Name is required." });
      isValid = false;
    } else if (userName.length < 4) {
      error.push({
        input: "userName",
        message: "User Name must be at least 4 characters long.",
      });
      isValid = false;
    }
  }
   
    //Validation logic for the signup inputs are below
  if (email !== undefined) {
    if (!email) {
      error.push({ input: "email", message: "Email is required." });
      isValid = false;
    } else if (!email.match(Constants.VALID_EMAIL) && email) {
      error.push({ input: "email", message: "Email format incorrect." });
      isValid = false;
    }
  }

  if (contact !== undefined) {
    if (!contact) {
      error.push({
        input: "contact",
        message: "Contact Number is required.",
      });
      isValid = false;
    }
  }

//   if (password !== undefined) {
//     if (!password) {
//       error.push({ input: "password", message: "Password is required." });
//       isValid = false;
//     } else if (password.length < 8) {
//       error.push({
//         input: "password",
//         message: "Password must be at least 8 characters long.",
//       });
//       isValid = false;
//     }
//   }

if (password !== undefined) {
    if (!password) {
      error.push({ input: "password", message: "Password is required." });
      isValid = false;
    } else {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?`~]/.test(password);
  
      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        error.push({
          input: "password",
          message: "Password must include uppercase, lowercase letters, numbers, and special characters.",
        });
        isValid = false;
      } else if (password.length < 8) {
        error.push({
          input: "password",
          message: "Password must be at least 8 characters long.",
        });
        isValid = false;
      }
    }
  }

  if (confirmPassword !== undefined) {
    if (!confirmPassword) {
      isValid = false;
      error.push({
        input: "confirmPassword",
        message: "Password confirmation is required.",
      });
    } else if (confirmPassword !== password) {
      error.push({
        input: "confirmPassword",
        message: "Passwords dont match.",
      });
      isValid = false;
    }
  }

  return { isValid, error };
};