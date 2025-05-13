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
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register core Chart.js components and plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ProfitRevenueRates = () => {
  const [profitData, setProfitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const mockData = [
      { name: "John Doe", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "Jane Smith", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "Michael Johnson", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "Emily Davis", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "Sarah Brown", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "David Lee", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "Sophia Wilson", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "James Garcia", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "Olivia Martinez", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
      { name: "William Rodriguez", profit: getRandom(5000, 15000), revenue: getRandom(10000, 30000), rates: getRandom(5, 15) },
    ];

    const timer = setTimeout(() => {
      setProfitData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

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
        data: profitData.map(item => item.rates * 1000), // scaled up for same y-axis
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: (context) => context.dataset.data[context.dataIndex] > 0,
        color: '#fff',
        anchor: 'end',
        align: 'top',
        formatter: (value) => value.toLocaleString(),
        font: {
          weight: 'bold',
        },
      },
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
        ticks: {
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value (Profit/Revenue in $ | Rates x1000)',
        },
      },
    },
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Profit, Revenue, and Rates
      </Typography>

      <Box height={500} mt={4}>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default ProfitRevenueRates;
