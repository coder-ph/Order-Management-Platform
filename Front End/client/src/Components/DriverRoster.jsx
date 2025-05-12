import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrivers, selectAllDrivers, selectDriversStatus, selectDriversError } from '../Redux/Drivers/driversSlice';
import { Box, Typography, useTheme, Paper, Grid, CircularProgress, Alert, Card, CardContent, Avatar } from '@mui/material';
import { tokens } from '../theme';
import PersonIcon from '@mui/icons-material/Person';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  RadialLinearScale
);

const DriverRoster = () => {
  const dispatch = useDispatch();
  const drivers = useSelector(selectAllDrivers);
  const status = useSelector(selectDriversStatus);
  const error = useSelector(selectDriversError);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDrivers());
    }
  }, [status, dispatch]);

  // Data analysis
  const statusCounts = drivers.reduce((acc, driver) => {
    acc[driver.status] = (acc[driver.status] || 0) + 1;
    return acc;
  }, {});

  // Driver experience categories
  const experienceData = drivers.reduce((acc, driver) => {
    // Assuming driver has years_experience field, otherwise adjust accordingly
    const exp = driver.years_experience || Math.floor(Math.random() * 10) + 1; // Fallback for demo
    
    if (exp < 3) acc['Junior'] = (acc['Junior'] || 0) + 1;
    else if (exp < 7) acc['Mid-level'] = (acc['Mid-level'] || 0) + 1;
    else acc['Senior'] = (acc['Senior'] || 0) + 1;
    
    return acc;
  }, {});

  // Chart configurations
  const statusChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Drivers by Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          colors.greenAccent[500],
          colors.redAccent[500],
          colors.blueAccent[500],
          colors.orangeAccent[500],
        ],
        borderColor: [
          colors.greenAccent[400],
          colors.redAccent[400],
          colors.blueAccent[400],
          colors.orangeAccent[400],
        ],
        borderWidth: 1,
      },
    ],
  };

  const experienceChartData = {
    labels: Object.keys(experienceData),
    datasets: [
      {
        label: 'Drivers by Experience',
        data: Object.values(experienceData),
        backgroundColor: [
          colors.blueAccent[300],
          colors.blueAccent[500],
          colors.blueAccent[700],
        ],
        borderColor: colors.grey[100],
        borderWidth: 2,
      },
    ],
  };

  // Options for charts
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.grey[100],
        },
      },
      title: {
        display: true,
        text: 'Driver Analytics',
        color: colors.grey[100],
      },
    },
    scales: {
      y: {
        ticks: { color: colors.grey[100] },
        grid: { color: colors.grey[700] },
      },
      x: {
        ticks: { color: colors.grey[100] },
        grid: { color: colors.grey[700] },
      },
    },
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
        return colors.greenAccent[500];
      case 'inactive':
        return colors.redAccent[500];
      case 'on leave':
        return colors.orangeAccent[500];
      default:
        return colors.blueAccent[500];
    }
  };

  const getNameInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Box
      // sx={{
      //   backgroundColor: colors.primary[400],
      //   p: 3,
      //   borderRadius: 2,
      //   boxShadow: 4,
      // }}
    >
      <Typography variant="h3" fontWeight="bold" mb={3} color={colors.grey[100]}>
        Driver Roster
      </Typography>
      
      {status === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      
      {status === 'failed' && (
        <Alert severity="error" sx={{ backgroundColor: colors.redAccent[900], color: colors.grey[100] }}>
          Error: {error}
        </Alert>
      )}
      
      {status === 'succeeded' && drivers.length === 0 && (
        <Alert severity="info" sx={{ backgroundColor: colors.blueAccent[900], color: colors.grey[100] }}>
          No drivers found.
        </Alert>
      )}
      
      {status === 'succeeded' && drivers.length > 0 && (
        <Grid container spacing={3}>
          {/* Analytics Section */}
          <Grid item xs={12}>
            <Typography variant="h4" color={colors.greenAccent[500]} mb={2}>
              Driver Analytics
            </Typography>
          </Grid>
          
          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                backgroundColor: colors.primary[500], 
                p: 2,
                height: 300,
                boxShadow: 3 
              }}
            >
              <Bar data={statusChartData} options={chartOptions} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                backgroundColor: colors.primary[500], 
                p: 2,
                height: 300,
                boxShadow: 3 
              }}
            >
              <Doughnut 
                data={experienceChartData} 
                options={{
                  ...chartOptions,
                  cutout: '70%',
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: 'Experience Distribution'
                    }
                  }
                }} 
              />
            </Paper>
          </Grid>
          
          {/* Drivers Grid */}
          <Grid item xs={12}>
            <Typography variant="h4" color={colors.greenAccent[500]} mb={2} mt={2}>
              Driver Details
            </Typography>
            
            <Box sx={{ maxHeight: "500px", overflowY: "auto", pr: 1 }}>
              <Grid container spacing={2}>
                {drivers.map((driver) => (
                  <Grid item xs={12} sm={6} md={4} key={driver.driver_id}>
                    <Paper
                      sx={{
                        backgroundColor: colors.primary[500],
                        borderLeft: `4px solid ${getStatusColor(driver.status)}`,
                        p: 2,
                        height: '100%',
                        boxShadow: 3,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 5,
                        }
                      }}
                    >
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar 
                          sx={{ 
                            bgcolor: getStatusColor(driver.status),
                            color: colors.grey[900],
                            mr: 2
                          }}
                        >
                          {getNameInitials(driver.first_name, driver.last_name)}
                        </Avatar>
                        <Box>
                          <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
                            {driver.first_name} {driver.last_name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: getStatusColor(driver.status),
                              fontWeight: 'bold'
                            }}
                          >
                            {driver.status}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box display="flex" alignItems="center" mb={1}>
                        <BadgeIcon sx={{ color: colors.blueAccent[500], mr: 1, fontSize: "18px" }} />
                        <Typography color={colors.grey[100]}>
                          License: {driver.license_number}
                        </Typography>
                      </Box>
                      
                      <Box display="flex" alignItems="center">
                        <PhoneIcon sx={{ color: colors.greenAccent[500], mr: 1, fontSize: "18px" }} />
                        <Typography color={colors.grey[100]}>
                          {driver.contact_phone}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DriverRoster;