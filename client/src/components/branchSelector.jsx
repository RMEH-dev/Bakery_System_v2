import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { Typography } from '@material-tailwind/react';

const BranchSelector = ({ selectedBranch, setSelectedBranch, userType }) => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // Fetch the logged-in user's role and branch assignment
    axiosInstance.get("/getUserRoleAndBranch")
      .then(response => {
        const { userType, userBranchID } = response.data;

        if (userType === "Admin") {
          // Fetch all branches if the user is an Admin
          axiosInstance.get("/getBranches")
            .then(branchResponse => {
              setBranches(branchResponse.data);
            })
            .catch(error => {
              console.error("Error fetching branches:", error);
            });
        } else if (userType === "Staff") {
          // Fetch only the assigned branch if the user is Staff
          axiosInstance.get(`/getBranch/${userBranchID}`)
            .then(branchResponse => {
              setBranches([branchResponse.data]); // Wrap in an array to maintain consistency
              setSelectedBranch(branchResponse.data.branchID); // Set the branch for staff
            })
            .catch(error => {
              console.error("Error fetching branch:", error);
            });
        }
      })
      .catch(error => {
        console.error("Error fetching user role and branch:", error);
      });
  }, [setSelectedBranch]);

  return (
    <div className="grid grid-cols-3 gap-10 mb-6">
      <Typography className="hover:transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-deep-orange-900 hover:text-white cursor-pointer text-center w-[200px] h-[200px] pt-2  justify-items-center bg-c5 rounded-2xl text-black font-bold text-lg font-[Montserrat]">
        Select Branch
      
      <select
        className="w-[200px] 2xl:w-[200px]  hover:text-white text-c1 font-semibold font-[Montserrat] border-deep-orange-200 focus:!border-deep-orange-900 bg-c2 rounded-[30px]"
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
        disabled={userType === "Staff"}
        required
      >
        {branches.map((branch) => (
          <option key={branch.branchID} value={branch.branchID}>
            {branch.branchName} - {branch.branchLocation}
          </option>
        ))}
      </select>
      </Typography>
    </div>
  );
};

export default BranchSelector;
