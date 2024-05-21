import axios from 'axios';

const token = localStorage.getItem('token');

const updateUserRoleAndBranch = async (userID, userTypeID, branchID) => {
  try {
    const response = await axios.put('/api/updateUserRoleAndBranch', {
      userID,
      userTypeID,
      branchID
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

// Call the function with appropriate parameters
updateUserRoleAndBranch('user123', 2, 1); // Example: Updating userID 'user123' to userTypeID 2 and branchID 1
