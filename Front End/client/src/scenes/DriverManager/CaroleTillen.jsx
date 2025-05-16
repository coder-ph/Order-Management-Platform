import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Select, MenuItem, TextField, CircularProgress,
  Alert, FormControl, InputLabel, TableContainer, Paper, Table,
  TableHead, TableRow, TableCell, TableBody, TablePagination
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

const DriverPerformance = () => {
  const [filters, setFilters] = useState({
    timePeriod: 'today',
    deliveryCountMin: '',
    deliveryCountMax: '',
    avgDeliveryTimeMin: '',
    avgDeliveryTimeMax: '',
    // customerRatingThreshold: '',
    orderRejectionRateMax: '',
  });
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    // Mock data for driver performance (20 drivers)
    const mockPerformanceData = [
      { name: "John Doe", deliveries: 50, avgDeliveryTime: 20, orderRejectionRate: 5 },
      { name: "Jane Smith", deliveries: 40, avgDeliveryTime: 25, orderRejectionRate: 3 },
      { name: "Michael Johnson", deliveries: 60, avgDeliveryTime: 18, orderRejectionRate: 2 },
      { name: "Emily Davis", deliveries: 55, avgDeliveryTime: 22, orderRejectionRate: 4 },
      { name: "Sarah Brown", deliveries: 45, avgDeliveryTime: 24, orderRejectionRate: 6 },
      { name: "David Lee", deliveries: 70, avgDeliveryTime: 19, orderRejectionRate: 1 },
      { name: "Sophia Wilson", deliveries: 65, avgDeliveryTime: 21, orderRejectionRate: 3 },
      { name: "James Garcia", deliveries: 50, avgDeliveryTime: 23, orderRejectionRate: 5 },
      { name: "Olivia Martinez", deliveries: 55, avgDeliveryTime: 20, orderRejectionRate: 2 },
      { name: "William Rodriguez", deliveries: 60, avgDeliveryTime: 22, orderRejectionRate: 4 },
      { name: "Liam Anderson", deliveries: 48, avgDeliveryTime: 21, orderRejectionRate: 3 },
      { name: "Mia Thomas", deliveries: 52, avgDeliveryTime: 19, orderRejectionRate: 2 },
      { name: "Noah Jackson", deliveries: 58, avgDeliveryTime: 20, orderRejectionRate: 4 },
      { name: "Isabella White", deliveries: 47, avgDeliveryTime: 23, orderRejectionRate: 5 },
      { name: "Lucas Harris", deliveries: 53, avgDeliveryTime: 22, orderRejectionRate: 3 },
      { name: "Amelia Martin", deliveries: 49, avgDeliveryTime: 21, orderRejectionRate: 2 },
      { name: "Mason Thompson", deliveries: 55, avgDeliveryTime: 20, orderRejectionRate: 4 },
      { name: "Evelyn Garcia", deliveries: 50, avgDeliveryTime: 22, orderRejectionRate: 3 },
      { name: "Logan Martinez", deliveries: 54, avgDeliveryTime: 19, orderRejectionRate: 2 },
      { name: "Harper Robinson", deliveries: 51, avgDeliveryTime: 21, orderRejectionRate: 4 },
    ];

    // Mock data for customer ratings (20 drivers)
    const mockRatingsData = [
      { name: "John Doe", rating: 4.5 },
      { name: "Jane Smith", rating: 4.2 },
      { name: "Michael Johnson", rating: 4.8 },
      { name: "Emily Davis", rating: 4.3 },
      { name: "Sarah Brown", rating: 4.1 },
      { name: "David Lee", rating: 4.7 },
      { name: "Sophia Wilson", rating: 4.4 },
      { name: "James Garcia", rating: 4.0 },
      { name: "Olivia Martinez", rating: 4.6 },
      { name: "William Rodriguez", rating: 4.3 },
      { name: "Liam Anderson", rating: 4.5 },
      { name: "Mia Thomas", rating: 4.2 },
      { name: "Noah Jackson", rating: 4.8 },
      { name: "Isabella White", rating: 4.3 },
      { name: "Lucas Harris", rating: 4.1 },
      { name: "Amelia Martin", rating: 4.7 },
      { name: "Mason Thompson", rating: 4.4 },
      { name: "Evelyn Garcia", rating: 4.0 },
      { name: "Logan Martinez", rating: 4.6 },
      { name: "Harper Robinson", rating: 4.3 },
    ];

    const ratingsMap = new Map();
    mockRatingsData.forEach(rating => {
      ratingsMap.set(rating.name, rating.rating);
    });

    const mappedDrivers = mockPerformanceData.map(driver => ({
      name: driver.name,
      deliveryCount: driver.deliveries,
      avgDeliveryTime: driver.avgDeliveryTime,
      customerRating: ratingsMap.get(driver.name) || 0,
      orderRejectionRate: driver.orderRejectionRate,
    }));

    setDrivers(mappedDrivers);
    setLoading(false);
  }, [filters.timePeriod]);

  const filteredDrivers = applyFilters(drivers);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

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
            {filteredDrivers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((driver, idx) => (
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

      <TablePagination
        component="div"
        count={filteredDrivers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DriverPerformance;
