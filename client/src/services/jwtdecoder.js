import { jwtDecode } from "jwt-decode";

const getDecodedToken = () => {
  const token = localStorage.getItem("token"); // Or however you store your JWT
  if (!token) {
    throw new Error("No token found in localStorage");
  }
  return jwtDecode(token);
};

export default getDecodedToken;