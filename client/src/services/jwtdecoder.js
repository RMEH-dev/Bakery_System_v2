import jwtDecode from 'jwt-decode';

// Example function to decode JWT
const getDecodedToken = () => {
  const token = localStorage.getItem('token'); // Or however you store your JWT
  return jwtDecode(token);
};

module.exports = getDecodedToken;