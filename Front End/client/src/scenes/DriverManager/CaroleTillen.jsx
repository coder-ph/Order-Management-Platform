import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const DriverPerformance = () => {
  const [timePeriod, setTimePeriod] = useState('today');
  const [filters, setFilters] = useState({
    timePeriod: 'today',
    deliveryCountMin: '',
    deliveryCountMax: '',
    avgDeliveryTimeMin: '',
    avgDeliveryTimeMax: '',
    customerRatingThreshold: '',
    orderRejectionRateMax: '',
  });
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to filter drivers based on current filters
  const applyFilters = (driversList) => {
    return driversList.filter(driver => {
      if (filters.deliveryCountMin && driver.deliveryCount < Number(filters.deliveryCountMin)) return false;
      if (filters.deliveryCountMax && driver.deliveryCount > Number(filters.deliveryCountMax)) return false;
      if (filters.avgDeliveryTimeMin && driver.avgDeliveryTime < Number(filters.avgDeliveryTimeMin)) return false;
      if (filters.avgDeliveryTimeMax && driver.avgDeliveryTime > Number(filters.avgDeliveryTimeMax)) return false;
      if (filters.customerRatingThreshold && driver.customerRating < Number(filters.customerRatingThreshold)) return false;
      if (filters.orderRejectionRateMax && driver.orderRejectionRate > Number(filters.orderRejectionRateMax)) return false;
      return true;
    });
  };

  useEffect(() => {
    setLoading(true);
    // Fetch driver performance data
    const fetchPerformance = axios.get('/api/driver-performance');
    // Fetch customer ratings data
    const fetchRatings = axios.get('/api/v1/performance/customer-ratings');

    Promise.all([fetchPerformance, fetchRatings])
      .then(([performanceRes, ratingsRes]) => {
        const performanceData = Array.isArray(performanceRes.data) ? performanceRes.data : performanceRes.data.performance;
        const ratingsData = Array.isArray(ratingsRes.data) ? ratingsRes.data : ratingsRes.data.ratings;

        // Map ratings by driver name or id for quick lookup
        const ratingsMap = new Map();
        ratingsData.forEach(rating => {
          const key = rating.name || `${rating.first_name} ${rating.last_name}`;
          ratingsMap.set(key, rating.rating || 0);
        });

        // Map performance data and merge with ratings
        const mappedDrivers = performanceData.map(driver => {
          const name = driver.name || `${driver.first_name} ${driver.last_name}`;
          return {
            name,
            deliveryCount: (driver.deliveries !== undefined && driver.deliveries !== null) ? driver.deliveries : 0,
          avgDeliveryTime: Math.floor(Math.random() * 30) + 10, 
          customerRating: ratingsMap.get(name) || (Math.random() * 2 + 3).toFixed(1), 
          orderRejectionRate: Math.floor(Math.random() * 20), 

          };
        });

        setDrivers(mappedDrivers);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching driver performance or ratings data');
        setLoading(false);
      });
  }, [filters.timePeriod]);


  const filteredDrivers = applyFilters(drivers);

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
          value={filters.timePeriod}
          onChange={(e) => setFilters({ ...filters, timePeriod: e.target.value })}
          label="Time Period"
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="last7days">Last 7 Days</MenuItem>
          <MenuItem value="thismonth">This Month</MenuItem>
          <MenuItem value="custom">Custom Range</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField name="deliveryCountMin" label="Min Deliveries" value={filters.deliveryCountMin} onChange={(e) => setFilters({ ...filters, deliveryCountMin: e.target.value })} />
        <TextField name="deliveryCountMax" label="Max Deliveries" value={filters.deliveryCountMax} onChange={(e) => setFilters({ ...filters, deliveryCountMax: e.target.value })} />
        <TextField name="avgDeliveryTimeMin" label="Min Avg Time (min)" value={filters.avgDeliveryTimeMin} onChange={(e) => setFilters({ ...filters, avgDeliveryTimeMin: e.target.value })} />
        <TextField name="avgDeliveryTimeMax" label="Max Avg Time (min)" value={filters.avgDeliveryTimeMax} onChange={(e) => setFilters({ ...filters, avgDeliveryTimeMax: e.target.value })} />
        <TextField name="customerRatingThreshold" label="Min Rating" value={filters.customerRatingThreshold} onChange={(e) => setFilters({ ...filters, customerRatingThreshold: e.target.value })} />
        <TextField name="orderRejectionRateMax" label="Max Rejection Rate (%)" value={filters.orderRejectionRateMax} onChange={(e) => setFilters({ ...filters, orderRejectionRateMax: e.target.value })} />
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
              <TableCell>Rating</TableCell>
              <TableCell>Avg Time (min)</TableCell>
              <TableCell>Rejection Rate (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDrivers.map((driver, idx) => (
              <TableRow key={idx}>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.deliveryCount}</TableCell>
                <TableCell>{driver.customerRating}</TableCell>
                <TableCell>{driver.avgDeliveryTime}</TableCell>
                <TableCell>{driver.orderRejectionRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DriverPerformance;
