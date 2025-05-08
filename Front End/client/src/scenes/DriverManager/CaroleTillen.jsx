import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Select, MenuItem, TextField, CircularProgress,
  Alert, FormControl, InputLabel, TableContainer, Paper, Table,
  TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import dayjs from 'dayjs';

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
      const apiUrl = 'https://eci-jsons-myf8.vercel.app/drivers';
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch driver data');
      const data = await response.json();
      setDriverData(Array.isArray(data) ? data : []);
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
      )}
    </Box>
  );
};

export default CaroleTillen;