import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Doughnut, Pie } from "react-chartjs-2";
import axiosInstance from "../../utils/axios";

// Helper function to generate random colors
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Helper function to generate a list of colors
const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(getRandomColor());
  }
  return colors;
};

const BranchProductQuantities = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/analytics/branches")
      .then((response) => {
        if (response.data) {
          setBranches(response.data);
        } else {
          setError("No branches found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      setLoading(true);
      axiosInstance
        .get(`/analytics/branch/${selectedBranch}`)
        .then((response) => {
          if (response.data) {
            const totalQuantities = response.data.datasets[0].data;
            const expiredQuantities = response.data.datasets[1].data;
            const nonExpiredQuantities = totalQuantities.map(
              (total, index) => total - expiredQuantities[index]
            );

            const colors = generateColors(totalQuantities.length);

            setChartData({
              labels: response.data.labels,
              datasets: [
                {
                  label: "Total Quantities",
                  data: totalQuantities,
                  backgroundColor: colors,
                  borderColor: "#fff",
                  borderWidth: 5,
                },
                {
                  label: "Non-Expired Quantities",
                  data: nonExpiredQuantities,
                  backgroundColor: "rgba(0, 255, 0, 0.5)",
                  borderColor: "rgba(0, 100, 0, 255)",
                  borderWidth: 5,
                },
                {
                  label: "Expired Quantities",
                  data: expiredQuantities,
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                  borderColor: "rgba(139, 0, 0, 255)",
                  borderWidth: 5,
                },
              ],
            });
          } else {
            setError("No data found for the selected branch");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [selectedBranch]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <Container>
      <Typography variant="h5" className="font-[Montserrat] text-c1 font-bold text-xl pb-5" gutterBottom>
        Branch Product levels
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="branch-select-label">Branch</InputLabel>
            <Select
              labelId="branch-select-label"
              value={selectedBranch}
              label="Branch"
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              {branches.map((branch) => (
                <MenuItem key={branch.branchID} value={branch.branchID}>
                  {branch.branchName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Product Quantities</Typography>
          <div style={{ position: "relative", height: "500px" }}>
            <Pie data={chartData} options={options} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BranchProductQuantities;
