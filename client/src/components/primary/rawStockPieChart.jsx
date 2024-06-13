import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import axiosInstance from "../../utils/axios";

const BranchRawMaterials = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [proStocks, setProStocks] = useState([]);
  const [selectedProStock, setSelectedProStock] = useState("");
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
      axiosInstance
        .get(`/analytics/prostocks/${selectedBranch}`)
        .then((response) => {
          if (response.data) {
            setProStocks(response.data);
          } else {
            setError("No pro stocks found for the selected branch");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedProStock) {
      setLoading(true);
      axiosInstance
        .get(`/analytics/rawmaterials/${selectedBranch}/${selectedProStock}`)
        .then((response) => {
          if (response.data) {
            setChartData({
              labels: response.data.labels,
              datasets: response.data.datasets,
            });
          } else {
            setError("No data found for the selected pro stock");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [selectedBranch, selectedProStock]);

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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = chartData.labels[tooltipItem.dataIndex];
            const value = chartData.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
    cutout: "0%", // Ensures there's no cutout in the middle
  };

  return (
    <Container>
      <Typography variant="h5" className="font-[Montserrat] text-c1 font-bold text-xl pb-5" gutterBottom>
        Branch Raw Materials
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="prostock-select-label">Pro Stock</InputLabel>
            <Select
              labelId="prostock-select-label"
              value={selectedProStock}
              label="Pro Stock"
              onChange={(e) => setSelectedProStock(e.target.value)}
            >
              {proStocks.map((proStock) => (
                <MenuItem key={proStock.proStockID} value={proStock.proStockID}>
                  {proStock.proStockName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Raw Material Quantities</Typography>
          <div style={{ position: "relative", height: "500px" }}>
            <Pie data={chartData} options={options} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BranchRawMaterials;
