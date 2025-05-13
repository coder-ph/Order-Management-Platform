import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, selectAllOrders, selectOrdersStatus, selectOrdersError } from '../Redux/Orders/ordersSlice';
import { 
  Box, Typography, Paper, Chip, useTheme, 
  CircularProgress, Alert, TableContainer,
  Table, TableHead, TableBody, TableRow, TableCell,
  Grid, Divider, Card, CardContent
} from '@mui/material';
import { tokens } from '../theme';

const OrderStatusPanel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchOrders());
  }, [status, dispatch]);

  // Filter orders by status
  const filteredOrders = selectedStatus
    ? orders.filter(order => order.status.toLowerCase() === selectedStatus.toLowerCase())
    : orders;

  // Get status color
  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('complete') || statusLower.includes('delivered')) 
      return colors.greenAccent[500];
    if (statusLower.includes('transit') || statusLower.includes('processing')) 
      return colors.blueAccent[400];
    if (statusLower.includes('pending') || statusLower.includes('scheduled')) 
      return colors.orangeAccent[500];
    if (statusLower.includes('cancel') || statusLower.includes('fail')) 
      return colors.redAccent[500];
    return colors.grey[100];
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    const priorityLower = priority.toLowerCase();
    if (priorityLower === 'high') return colors.redAccent[500];
    if (priorityLower === 'medium') return colors.orangeAccent[500];
    return colors.blueAccent[400];
  };

  if (status === 'loading') return (
    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
      <CircularProgress color="secondary" />
    </Box>
  );

  if (status === 'failed') return (
    <Alert severity="error" sx={{ backgroundColor: colors.redAccent[900], color: colors.grey[100] }}>
      Error: {error}
    </Alert>
  );

  if (status === 'succeeded' && orders.length === 0) return (
    <Alert severity="info" sx={{ backgroundColor: colors.blueAccent[900], color: colors.grey[100] }}>
      No orders found.
    </Alert>
  );

  return (
    <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2, height: '100%' }}>
      <CardContent>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={2}>
          Order Status Dashboard
          {selectedStatus && (
            <Chip 
              label={`Filtered: ${selectedStatus}`}
              size="small"
              onDelete={() => setSelectedStatus(null)}
              sx={{ 
                ml: 2,
                backgroundColor: getStatusColor(selectedStatus),
                color: colors.primary[900],
                fontWeight: "600"
              }}
            />
          )}
        </Typography>

        <TableContainer 
          component={Paper} 
          sx={{ 
            maxHeight: "600px",
            backgroundColor: colors.primary[500],
            '&::-webkit-scrollbar': { width: '8px' },
            '&::-webkit-scrollbar-track': { background: colors.primary[400] },
            '&::-webkit-scrollbar-thumb': { backgroundColor: colors.grey[700], borderRadius: '8px' },
          }}
        >
          <Table stickyHeader size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: colors.primary[600], color: colors.blueAccent[300], fontWeight: "bold" }}>
                  Order Reference
                </TableCell>
                <TableCell sx={{ backgroundColor: colors.primary[600], color: colors.blueAccent[300], fontWeight: "bold" }}>
                  Client
                </TableCell>
                <TableCell sx={{ backgroundColor: colors.primary[600], color: colors.blueAccent[300], fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ backgroundColor: colors.primary[600], color: colors.blueAccent[300], fontWeight: "bold" }}>
                  Priority
                </TableCell>
                <TableCell sx={{ backgroundColor: colors.primary[600], color: colors.blueAccent[300], fontWeight: "bold" }}>
                  Weight
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.order_id} hover sx={{ '&:hover': { backgroundColor: colors.primary[700] } }}>
                  <TableCell sx={{ color: colors.orangeAccent[400], fontWeight: "600" }}>
                    {order.order_reference}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {order.client_id}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status}
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusColor(order.status),
                        color: colors.primary[900],
                        fontWeight: "600"
                      }}
                      onClick={() => setSelectedStatus(order.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={order.priority}
                      size="small"
                      sx={{ 
                        backgroundColor: getPriorityColor(order.priority),
                        color: colors.primary[900],
                        fontWeight: "600"
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100], fontWeight: order.total_weight > 50 ? "600" : "400" }}>
                    {`${order.total_weight} kg`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Status Summary */}
        <Grid container spacing={2} mt={2}>
          {['Completed', 'In Transit', 'Pending', 'Cancelled'].map((status) => (
            <Grid item xs={6} md={3} key={status}>
              <Paper sx={{ 
                p: 2, 
                backgroundColor: colors.primary[500],
                textAlign: 'center'
              }}>
                <Typography variant="body2" color={colors.grey[300]}>
                  {status} Orders
                </Typography>
                <Typography 
                  variant="h4" 
                  color={getStatusColor(status)}
                  fontWeight="bold"
                >
                  {orders.filter(o => o.status.toLowerCase() === status.toLowerCase()).length}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderStatusPanel;