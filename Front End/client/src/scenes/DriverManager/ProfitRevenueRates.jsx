import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfitRevenueRates = () => {
  const [profitData, setProfitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mockData = [
      { name: "John Doe", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "Jane Smith", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "Michael Johnson", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "Emily Davis", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "Sarah Brown", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "David Lee", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "Sophia Wilson", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "James Garcia", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "Olivia Martinez", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
      { name: "William Rodriguez", profit: Math.floor(Math.random() * 10000) + 5000, revenue: Math.floor(Math.random() * 20000) + 10000, rates: Math.floor(Math.random() * 10) + 5 },
    ];

    setTimeout(() => {
      setProfitData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const chartData = {
    labels: profitData.map(item => item.name),
    datasets: [
      {
        label: 'Profit ($)',
        data: profitData.map(item => item.profit),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Revenue ($)',
        data: profitData.map(item => item.revenue),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Rates (%)',
        data: profitData.map(item => item.rates),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Profit, Revenue, and Rates Over 10 Drivers',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Profit, Revenue, and Rates
      </Typography>

      <Box mt={4}>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default ProfitRevenueRates;
