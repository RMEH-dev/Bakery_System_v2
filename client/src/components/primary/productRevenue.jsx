import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import Chart from "chart.js/auto";
import axiosInstance from "../../utils/axios";

const ProductRevenue = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue Generated",
        data: [],
        fill: true,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBackgroundColor: "#36A2EB",
        pointBorderColor: "#36A2EB",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#36A2EB",
        tension: 0.4,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get("/analytics/categories")
      .then((response) => {
        if (response.data) {
          setCategories(response.data);
        } else {
          setError("No categories found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const fetchChartData = () => {
    setLoading(true);
    axiosInstance
      .get(`/analytics/revenue/${selectedCategory}`, {
        params: { startDate, endDate },
      })
      .then((response) => {
        if (response.data) {
          setChartData({
            labels: response.data.labels,
            datasets: [
              {
                label: "Revenue Generated",
                data: response.data.datasets[0].data,
                fill: true,
                borderColor: "#36A2EB",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                pointBackgroundColor: "#36A2EB",
                pointBorderColor: "#36A2EB",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#36A2EB",
                tension: 0.4,
              },
            ],
          });
        } else {
          setError("No data found for the selected category");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const dataExists = chartData.datasets.length > 0 && Array.isArray(chartData.datasets[0].data);
      const minY = dataExists ? Math.min(...chartData.datasets[0].data) - 1 : 0;
      const maxY = dataExists ? Math.max(...chartData.datasets[0].data) + 1 : 10;

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                font: {
                  size: 14,
                  family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                },
                color: "#333",
              },
              grid: {
                display: false,
              },
            },
            y: {
              suggestedMin: minY,
              suggestedMax: maxY,
              beginAtZero: true,
              ticks: {
                font: {
                  size: 14,
                  family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                },
                color: "#333",
              },
              grid: {
                color: "rgba(200, 200, 200, 0.2)",
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 16,
                  family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                },
                color: "#333",
              },
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              titleFont: {
                size: 16,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
              bodyFont: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
              footerFont: {
                size: 12,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5" className="font-[Montserrat] text-c1 font-bold text-xl pb-5" gutterBottom>
        Product Revenue based on Category
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={fetchChartData}>
            Fetch Data
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Revenue Generated per Product (LKR)</Typography>
          <div style={{ position: "relative", height: "400px" }}>
            <canvas id="myChart" ref={canvasRef} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductRevenue;
