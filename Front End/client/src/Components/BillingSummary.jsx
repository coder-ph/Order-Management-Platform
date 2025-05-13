import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBilling, selectAllBilling, selectBillingStatus, selectBillingError } from '../Redux/Billing/billingSlice';
import { 
  Box, Typography, Paper, Chip, useTheme, 
  CircularProgress, Alert, TableContainer,
  Table, TableHead, TableBody, TableRow, TableCell,
  Grid
} from '@mui/material';
import { Receipt, CalendarToday, AccountBalance, Paid, Pending, Warning } from '@mui/icons-material';
import { tokens } from '../theme';

const BillingSummary = () => {
  // Redux state and dispatch
  const dispatch = useDispatch();
  const billing = useSelector(selectAllBilling);
  const status = useSelector(selectBillingStatus);
  const error = useSelector(selectBillingError);
  
  // Theme and colors
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch billing data on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBilling());
    }
  }, [status, dispatch]);

  // Helper function to get status styling
  const getStatusStyle = (status) => {
    const statusLower = (status || '').toLowerCase();
    const styles = {
      paid: {
        icon: <Paid fontSize="small" />,
        color: colors.greenAccent[500],
        bgColor: `${colors.greenAccent[500]}20`
      },
      overdue: {
        icon: <Warning fontSize="small" />,
        color: colors.redAccent[500],
        bgColor: `${colors.redAccent[500]}20`
      },
      pending: {
        icon: <Pending fontSize="small" />,
        color: colors.orangeAccent[500],
        bgColor: `${colors.orangeAccent[500]}20`
      }
    };
    
    return styles[statusLower] || {
      icon: null,
      color: colors.blueAccent[500],
      bgColor: `${colors.blueAccent[500]}20`
    };
  };

  // Calculate billing metrics
  const calculateMetrics = () => {
    const totalAmount = billing.reduce((sum, invoice) => sum + invoice.total_amount, 0).toFixed(2);
    const paidAmount = billing
      .filter(invoice => invoice.status.toLowerCase() === 'paid')
      .reduce((sum, invoice) => sum + invoice.total_amount, 0)
      .toFixed(2);
    const overdueAmount = billing
      .filter(invoice => invoice.status.toLowerCase() === 'overdue')
      .reduce((sum, invoice) => sum + invoice.total_amount, 0)
      .toFixed(2);

    return {
      totalInvoices: billing.length,
      totalAmount,
      paidAmount,
      overdueAmount
    };
  };

  const metrics = calculateMetrics();

  // Loading state
  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <Alert severity="error" sx={{ 
        backgroundColor: colors.redAccent[900], 
        color: colors.grey[100],
        mb: 3
      }}>
        Error loading billing data: {error}
      </Alert>
    );
  }

  // Empty state
  if (status === 'succeeded' && billing.length === 0) {
    return (
      <Alert severity="info" sx={{ 
        backgroundColor: colors.blueAccent[900], 
        color: colors.grey[100],
        mb: 3
      }}>
        No billing records found.
      </Alert>
    );
  }

  // Main content
  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        mb={3} 
        color={colors.grey[100]}
        sx={{ 
          borderBottom: `2px solid ${colors.primary[300]}`,
          pb: 1.5
        }}
      >
        Billing Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            title="Total Invoices" 
            value={metrics.totalInvoices} 
            icon={<Receipt />}
            iconColor={colors.blueAccent[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            title="Total Amount" 
            value={`$${metrics.totalAmount}`} 
            icon={<Paid />}
            iconColor={colors.greenAccent[500]}
            valueColor={colors.greenAccent[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            title="Paid Amount" 
            value={`$${metrics.paidAmount}`} 
            icon={<Paid />}
            iconColor={colors.greenAccent[400]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            title="Overdue Amount" 
            value={`$${metrics.overdueAmount}`} 
            icon={<Warning />}
            iconColor={colors.redAccent[500]}
            valueColor={colors.redAccent[500]}
          />
        </Grid>
      </Grid>

      {/* Recent Invoices Table */}
      <Paper sx={{ 
        p: 3, 
        backgroundColor: colors.primary[500], 
        borderRadius: '12px',
        boxShadow: theme.shadows[4]
      }}>
        <Typography 
          variant="h5" 
          mb={3} 
          color={colors.grey[100]}
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <Receipt fontSize="large" sx={{ color: colors.blueAccent[400] }} />
          Recent Invoices
        </Typography>
        
        <TableContainer sx={{ 
          maxHeight: '500px',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: colors.primary[500],
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.blueAccent[600],
            borderRadius: '4px',
          },
        }}>
          <Table size="medium" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600], 
                  color: colors.grey[100],
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  Invoice #
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600], 
                  color: colors.grey[100],
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  Client
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600], 
                  color: colors.grey[100],
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  Amount
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600], 
                  color: colors.grey[100],
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  Due Date
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600], 
                  color: colors.grey[100],
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billing.map((invoice) => {
                const statusStyle = getStatusStyle(invoice.status);
                return (
                  <TableRow 
                    key={invoice.invoice_id} 
                    hover
                    sx={{
                      '&:nth-of-type(even)': {
                        backgroundColor: colors.primary[400],
                      },
                      '&:hover': {
                        backgroundColor: colors.primary[300],
                      }
                    }}
                  >
                    <TableCell sx={{ color: colors.grey[100], fontWeight: '500' }}>
                      #{invoice.invoice_id}
                    </TableCell>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <AccountBalance sx={{ color: colors.grey[400] }} />
                        {invoice.client_id}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ 
                      color: colors.grey[100],
                      fontWeight: 'bold'
                    }}>
                      ${invoice.total_amount.toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <CalendarToday sx={{ color: colors.orangeAccent[400] }} />
                        {invoice.due_date}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={statusStyle.icon}
                        label={invoice.status}
                        sx={{
                          backgroundColor: statusStyle.bgColor,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.color}`,
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          px: 1,
                          minWidth: '90px'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

// SummaryCard component
const SummaryCard = ({ title, value, icon, iconColor, valueColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper sx={{ 
      p: 2.5, 
      backgroundColor: colors.primary[500], 
      height: '100%',
      borderRadius: '10px',
      boxShadow: theme.shadows[2],
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: theme.shadows[6]
      }
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography 
            variant="subtitle1" 
            color={colors.grey[400]}
            sx={{ mb: 0.5 }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            color={valueColor || colors.grey[100]}
            sx={{ lineHeight: 1.2 }}
          >
            {value}
          </Typography>
        </Box>
        <Box sx={{ 
          backgroundColor: `${iconColor}20`, 
          p: 1.75, 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {React.cloneElement(icon, { 
            sx: { 
              color: iconColor,
              fontSize: '28px'
            } 
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default BillingSummary;