import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Select, MenuItem, TextField, CircularProgress,
  Alert, FormControl, InputLabel, TableContainer, Paper, Table,
  TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
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

const timePeriods = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'This Month', value: 'thismonth' },
  { label: 'Custom Range', value: 'custom' },
];

const mockDrivers = [
  { name: 'Alice Johnson', deliveryCount: 15, avgDeliveryTime: 32, customerRating: 4.5, orderRejectionRate: 3 },
  { name: 'Bob Smith', deliveryCount: 12, avgDeliveryTime: 28, customerRating: 4.0, orderRejectionRate: 5 },
  { name: 'Carla Lopez', deliveryCount: 18, avgDeliveryTime: 35, customerRating: 4.8, orderRejectionRate: 2 },
  { name: 'David Kim', deliveryCount: 9, avgDeliveryTime: 25, customerRating: 3.9, orderRejectionRate: 4 },
  { name: 'Ella Wong', deliveryCount: 20, avgDeliveryTime: 40, customerRating: 4.6, orderRejectionRate: 6 },
  { name: 'Frank Lewis', deliveryCount: 11, avgDeliveryTime: 30, customerRating: 4.1, orderRejectionRate: 7 },
  { name: 'Grace Moore', deliveryCount: 16, avgDeliveryTime: 27, customerRating: 4.7, orderRejectionRate: 3 },
  { name: 'Henry Oduor', deliveryCount: 14, avgDeliveryTime: 33, customerRating: 4.2, orderRejectionRate: 5 },
  { name: 'Ivy Patel', deliveryCount: 17, avgDeliveryTime: 29, customerRating: 4.9, orderRejectionRate: 2 },
  { name: 'Jake Turner', deliveryCount: 10, avgDeliveryTime: 36, customerRating: 3.8, orderRejectionRate: 6 },
];

const CaroleTillen = () => {
  const [timePeriod, setTimePeriod] = useState('today');
  const [filters, setFilters] = useState({
    deliveryCountMin: '',
    deliveryCountMax: '',
    avgDeliveryTimeMin: '',
    avgDeliveryTimeMax: '',
    customerRatingThreshold: '',
    orderRejectionRateMax: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredDrivers = mockDrivers.filter((driver) => {
    if (filters.deliveryCountMin && driver.deliveryCount < Number(filters.deliveryCountMin)) return false;
    if (filters.deliveryCountMax && driver.deliveryCount > Number(filters.deliveryCountMax)) return false;
    if (filters.avgDeliveryTimeMin && driver.avgDeliveryTime < Number(filters.avgDeliveryTimeMin)) return false;
    if (filters.avgDeliveryTimeMax && driver.avgDeliveryTime > Number(filters.avgDeliveryTimeMax)) return false;
    if (filters.customerRatingThreshold && driver.customerRating < Number(filters.customerRatingThreshold)) return false;
    if (filters.orderRejectionRateMax && driver.orderRejectionRate > Number(filters.orderRejectionRateMax)) return false;
    return true;
  });

  const chartData = {
    labels: filteredDrivers.map(driver => driver.name),
    datasets: [
      {
        label: 'Deliveries',
        data: filteredDrivers.map(driver => driver.deliveryCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Avg Time (min)',
        data: filteredDrivers.map(driver => driver.avgDeliveryTime),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Rating',
        data: filteredDrivers.map(driver => driver.customerRating),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Rejection Rate (%)',
        data: filteredDrivers.map(driver => driver.orderRejectionRate),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Driver Performance</Typography>

      <FormControl sx={{ minWidth: 200, mr: 2, mb: 2 }}>
        <InputLabel>Time Period</InputLabel>
        <Select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          label="Time Period"
        >
          {timePeriods.map(period => (
            <MenuItem key={period.value} value={period.value}>
              {period.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField name="deliveryCountMin" label="Min Deliveries" value={filters.deliveryCountMin} onChange={handleFilterChange} />
        <TextField name="deliveryCountMax" label="Max Deliveries" value={filters.deliveryCountMax} onChange={handleFilterChange} />
        <TextField name="avgDeliveryTimeMin" label="Min Avg Time (min)" value={filters.avgDeliveryTimeMin} onChange={handleFilterChange} />
        <TextField name="avgDeliveryTimeMax" label="Max Avg Time (min)" value={filters.avgDeliveryTimeMax} onChange={handleFilterChange} />
        <TextField name="customerRatingThreshold" label="Min Rating" value={filters.customerRatingThreshold} onChange={handleFilterChange} />
        <TextField name="orderRejectionRateMax" label="Max Rejection Rate (%)" value={filters.orderRejectionRateMax} onChange={handleFilterChange} />
      </Box>

      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Driver Performance Metrics'
            },
            legend: {
              position: 'top',
            },
          },
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          }
        }}
      />

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Deliveries</TableCell>
              <TableCell>Avg Time (min)</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Rejection Rate (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDrivers.map((driver, idx) => (
              <TableRow key={idx}>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.deliveryCount}</TableCell>
                <TableCell>{driver.avgDeliveryTime}</TableCell>
                <TableCell>{driver.customerRating}</TableCell>
                <TableCell>{driver.orderRejectionRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CaroleTillen;
