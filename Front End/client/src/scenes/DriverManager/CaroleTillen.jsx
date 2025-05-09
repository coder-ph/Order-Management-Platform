import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Select, MenuItem, TextField, CircularProgress,
  Alert, FormControl, InputLabel, TableContainer, Paper, Table,
  TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2'; // Import the chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const timePeriods = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'This Month', value: 'thismonth' },
  { label: 'Custom Range', value: 'custom' },
];

const CaroleTillen = () => {
  const [timePeriod, setTimePeriod] = useState('today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [filters, setFilters] = useState({
    deliveryCountMin: '',
    deliveryCountMax: '',
    avgDeliveryTimeMin: '',
    avgDeliveryTimeMax: '',
    customerRatingThreshold: '',
    orderRejectionRateMax: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [driverData, setDriverData] = useState([]);

  const getDateRange = () => {
    const today = dayjs();
    switch (timePeriod) {
      case 'today':
        return { start: today.startOf('day').toISOString(), end: today.endOf('day').toISOString() };
      case 'last7days':
        return { start: today.subtract(7, 'day').startOf('day').toISOString(), end: today.endOf('day').toISOString() };
      case 'thismonth':
        return { start: today.startOf('month').toISOString(), end: today.endOf('month').toISOString() };
      case 'custom':
        return {
          start: customStartDate ? dayjs(customStartDate).toISOString() : null,
          end: customEndDate ? dayjs(customEndDate).toISOString() : null
        };
      default:
        return { start: null, end: null };
    }
  };

  const fetchDriverData = async () => {
    setLoading(true);
    setError(null);
    try {
      const driversResponse = await fetch('https://eci-jsons-myf8.vercel.app/drivers');
      if (!driversResponse.ok) throw new Error('Failed to fetch driver data');
      const driversData = await driversResponse.json();

      const ratingsResponse = await fetch('https://eci-jsons-myf8.vercel.app/driver_ratings');
      if (!ratingsResponse.ok) throw new Error('Failed to fetch driver ratings');
      const ratingsData = await ratingsResponse.json();

      // Create a map of driver_id to rating for quick lookup
      const ratingsMap = {};
      if (Array.isArray(ratingsData)) {
        ratingsData.forEach(rating => {
          ratingsMap[rating.driver_id] = rating.rating;
        });
      }

      const transformedData = Array.isArray(driversData) ? driversData.map(driver => ({
        name: `${driver.first_name} ${driver.last_name}`,
        driver_id: driver.driver_id,
        deliveryCount: 10,  // mock data for deliveries
        avgDeliveryTime: 30, // mock data for average delivery time in minutes
        // Replace customerRating with rating from ratingsMap if available
        customerRating: ratingsMap[driver.driver_id] !== undefined ? ratingsMap[driver.driver_id] : (driver.customerRating || 0),
        orderRejectionRate: 5, // mock data for order rejection rate in percentage
      })) : [];

      setDriverData(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriverData();
  }, [timePeriod, customStartDate, customEndDate]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredDrivers = driverData.filter((driver) => {
    if (filters.deliveryCountMin && driver.deliveryCount < Number(filters.deliveryCountMin)) return false;
    if (filters.deliveryCountMax && driver.deliveryCount > Number(filters.deliveryCountMax)) return false;
    if (filters.avgDeliveryTimeMin && driver.avgDeliveryTime < Number(filters.avgDeliveryTimeMin)) return false;
    if (filters.avgDeliveryTimeMax && driver.avgDeliveryTime > Number(filters.avgDeliveryTimeMax)) return false;
    if (filters.customerRatingThreshold && driver.customerRating < Number(filters.customerRatingThreshold)) return false;
    if (filters.orderRejectionRateMax && driver.orderRejectionRate > Number(filters.orderRejectionRateMax)) return false;
    return true;
  });

  // Prepare chart data
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

      {timePeriod === 'custom' && (
        <Box display="flex" gap={2} mb={2}>
          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
          />
          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
          />
        </Box>
      )}

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField name="deliveryCountMin" label="Min Deliveries" value={filters.deliveryCountMin} onChange={handleFilterChange} />
        <TextField name="deliveryCountMax" label="Max Deliveries" value={filters.deliveryCountMax} onChange={handleFilterChange} />
        <TextField name="avgDeliveryTimeMin" label="Min Avg Time (min)" value={filters.avgDeliveryTimeMin} onChange={handleFilterChange} />
        <TextField name="avgDeliveryTimeMax" label="Max Avg Time (min)" value={filters.avgDeliveryTimeMax} onChange={handleFilterChange} />
        <TextField name="customerRatingThreshold" label="Min Rating" value={filters.customerRatingThreshold} onChange={handleFilterChange} />
        <TextField name="orderRejectionRateMax" label="Max Rejection Rate (%)" value={filters.orderRejectionRateMax} onChange={handleFilterChange} />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {/* Add the Chart.js Bar Chart */}
          <Bar data={chartData} options={{
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
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              }
            }
          }} />
          <TableContainer component={Paper}>
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
        </>
      )}
    </Box>
  );
};

export default CaroleTillen;
