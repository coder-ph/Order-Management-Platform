import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBilling, selectAllBilling, selectBillingStatus, selectBillingError } from '../Redux/Billing/billingSlice';
import { Box, Typography, Grid, Paper, Chip, Divider, useTheme, CircularProgress } from '@mui/material';
import { ReceiptLong, CalendarToday, AccountBalance, AttachMoney } from '@mui/icons-material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { tokens } from '../theme';

ChartJS.register(ArcElement, Tooltip, Legend);

const BillingSummary = () => {
  const dispatch = useDispatch();
  const billing = useSelector(selectAllBilling);
  const status = useSelector(selectBillingStatus);
  const error = useSelector(selectBillingError);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBilling());
    }
  }, [status, dispatch]);

  // Get status color based on invoice status
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return {
          bg: colors.greenAccent[600],
          color: colors.primary[900]
        };
      case 'overdue':
        return {
          bg: colors.redAccent[400],
          color: colors.primary[900]
        };
      case 'pending':
        return {
          bg: colors.orangeAccent[400],
          color: colors.primary[900]
        };
      default:
        return {
          bg: colors.blueAccent[400],
          color: colors.primary[900]
        };
    }
  };

  // Calculate total amounts
  const getTotalAmount = () => {
    return billing.reduce((sum, invoice) => sum + invoice.total_amount, 0).toFixed(2);
  };

  // Prepare data for chart: count invoices by status
  const statusCounts = billing.reduce((acc, invoice) => {
    acc[invoice.status] = (acc[invoice.status] || 0) + 1;
    return acc;
  }, {});

  // Configure chart data with theme colors
  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Invoices by Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          colors.blueAccent[400],
          colors.orangeAccent[400],
          colors.greenAccent[500],
          colors.redAccent[400],
        ],
        borderColor: [
          colors.blueAccent[600],
          colors.orangeAccent[600],
          colors.greenAccent[700],
          colors.redAccent[600],
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: colors.grey[100],
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: colors.primary[400],
        titleColor: colors.grey[100],
        bodyColor: colors.grey[300],
        borderColor: colors.primary[500],
        borderWidth: 1,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box
      // sx={{
      //   backgroundColor: colors.primary[400],
      //   borderRadius: "10px",
      //   boxShadow: theme.shadows[3],
      //   p: 3,
      //   height: "100%",
      // }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 2, color: colors.grey[100] }}
      >
        Billing Summary
      </Typography>
      
      {status === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress color="info" />
        </Box>
      )}
      
      {status === 'failed' && (
        <Typography color={colors.redAccent[500]}>Error: {error}</Typography>
      )}
      
      {status === 'succeeded' && billing.length === 0 && (
        <Typography color={colors.grey[400]}>No billing data found.</Typography>
      )}
      
      {status === 'succeeded' && billing.length > 0 && (
        <Grid container spacing={3}>
          {/* Pie Chart Section */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                backgroundColor: colors.primary[500], 
                p: 2, 
                height: "300px",
                borderRadius: "8px"
              }}
            >
              <Typography variant="h5" mb={1} color={colors.grey[100]}>
                Invoice Status Distribution
              </Typography>
              <Box height="250px">
                <Pie data={chartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
          
          {/* Summary Stats */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                backgroundColor: colors.primary[500], 
                p: 2,
                height: "300px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h5" mb={2} color={colors.grey[100]}>
                Financial Overview
              </Typography>
              
              <Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body1" color={colors.grey[200]}>
                    Total Invoices
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    {billing.length}
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body1" color={colors.grey[200]}>
                    Total Amount
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[400]}>
                    ${getTotalAmount()}
                  </Typography>
                </Box>
                
                <Divider sx={{ bgcolor: colors.primary[400], my: 2 }} />
                
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {Object.keys(statusCounts).map((status) => (
                    <Chip 
                      key={status}
                      label={`${status}: ${statusCounts[status]}`}
                      sx={{ 
                        backgroundColor: getStatusColor(status).bg,
                        color: getStatusColor(status).color,
                        fontWeight: "bold"
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          {/* Recent Invoices */}
          <Grid item xs={12}>
            <Paper 
              elevation={3} 
              sx={{ 
                backgroundColor: colors.primary[500], 
                p: 2,
                borderRadius: "8px"
              }}
            >
              <Typography variant="h5" mb={2} color={colors.grey[100]}>
                Recent Invoices
              </Typography>
              <Box sx={{ maxHeight: "300px", overflowY: "auto", pr: 1 }}>
                <Grid container spacing={2}>
                  {billing.map((invoice) => {
                    const statusColor = getStatusColor(invoice.status);
                    
                    return (
                      <Grid item xs={12} sm={6} md={4} key={invoice.invoice_id}>
                        <Paper 
                          elevation={2}
                          sx={{
                            backgroundColor: colors.primary[400],
                            p: 2,
                            borderRadius: "8px",
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: theme.shadows[6]
                            }
                          }}
                        >
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <ReceiptLong sx={{ color: colors.blueAccent[400] }} />
                              <Typography variant="body1" color={colors.grey[100]} fontWeight="bold">
                                #{invoice.invoice_id}
                              </Typography>
                            </Box>
                            <Chip
                              label={invoice.status}
                              size="small"
                              sx={{
                                backgroundColor: statusColor.bg,
                                color: statusColor.color,
                                fontWeight: "bold"
                              }}
                            />
                          </Box>
                          
                          <Divider sx={{ bgcolor: colors.primary[300], my: 1 }} />
                          
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <AccountBalance fontSize="small" sx={{ color: colors.grey[400] }} />
                            <Typography variant="body2" color={colors.grey[200]}>
                              Client ID: {invoice.client_id}
                            </Typography>
                          </Box>
                          
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <AttachMoney fontSize="small" sx={{ color: colors.greenAccent[400] }} />
                            <Typography variant="body2" color={colors.grey[200]}>
                              ${invoice.total_amount.toFixed(2)}
                            </Typography>
                          </Box>
                          
                          <Box display="flex" alignItems="center" gap={1}>
                            <CalendarToday fontSize="small" sx={{ color: colors.orangeAccent[400] }} />
                            <Typography variant="body2" color={colors.grey[200]}>
                              Due: {invoice.due_date}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default BillingSummary;