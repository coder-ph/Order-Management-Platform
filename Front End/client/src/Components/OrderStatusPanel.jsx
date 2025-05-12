import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, useTheme, CircularProgress, Divider } from "@mui/material";
import { tokens } from "../theme";
import { fetchOrders, selectAllOrders, selectOrdersStatus, selectOrdersError } from '../Redux/Orders/ordersSlice';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusPanel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

  // Prepare data for chart: count orders by status
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // Use theme colors for chart
  const getChartColors = () => {
    return {
      backgroundColor: [
        colors.greenAccent[500],
        colors.blueAccent[400],
        colors.orangeAccent[500],
        colors.redAccent[500],
      ],
      borderColor: [
        colors.greenAccent[400],
        colors.blueAccent[300],
        colors.orangeAccent[400],
        colors.redAccent[400],
      ]
    };
  };

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Orders by Status',
        data: Object.values(statusCounts),
        backgroundColor: getChartColors().backgroundColor,
        borderColor: getChartColors().borderColor,
        borderWidth: 1,
      },
    ],
  };

  // Chart options with themed colors
  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: colors.grey[100],
          font: {
            family: "'Source Sans Pro', sans-serif",
            size: 12
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: colors.primary[700],
        titleColor: colors.grey[100],
        bodyColor: colors.grey[100],
        bodyFont: {
          family: "'Source Sans Pro', sans-serif"
        },
        titleFont: {
          family: "'Source Sans Pro', sans-serif",
          weight: 'bold'
        },
        padding: 10,
        borderColor: colors.primary[500],
        borderWidth: 1
      }
    },
    maintainAspectRatio: false,
    cutout: '65%'
  };

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="600"
        color={colors.grey[100]}
        mb={2}
      >
        Order Status
      </Typography>

      {status === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress size={24} color="secondary" />
        </Box>
      )}

      {status === 'failed' && (
        <Typography color={colors.redAccent[500]} variant="body2">
          Error: {error}
        </Typography>
      )}

      {status === 'succeeded' && orders.length === 0 && (
        <Typography color={colors.grey[300]} variant="body2">
          No orders found.
        </Typography>
      )}

      {status === 'succeeded' && orders.length > 0 && (
        <>
          <Box 
            height="180px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <Doughnut data={data} options={chartOptions} />
          </Box>
          
          <List 
            sx={{ 
              maxHeight: "160px", 
              overflowY: "auto",
              mt: 2,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: colors.primary[400],
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.grey[700],
                borderRadius: '8px',
              },
            }}
          >
            {orders.map((order, index) => (
              <React.Fragment key={order.order_id}>
                <ListItem 
                  sx={{
                    py: 1,
                    flexDirection: "column",
                    alignItems: "flex-start"
                  }}
                >
                  <Box 
                    display="grid" 
                    gridTemplateColumns="repeat(2, 1fr)" 
                    width="100%"
                    gap={1}
                  >
                    <OrderDetail 
                      label="Order Reference" 
                      value={order.order_reference} 
                      colors={colors} 
                      highlight
                    />
                    <OrderDetail 
                      label="Client ID" 
                      value={order.client_id} 
                      colors={colors} 
                    />
                    <OrderDetail 
                      label="Status" 
                      value={order.status} 
                      colors={colors}
                      status={true} 
                    />
                    <OrderDetail 
                      label="Priority" 
                      value={order.priority} 
                      colors={colors} 
                    />
                    <OrderDetail 
                      label="Total Weight" 
                      value={`${order.total_weight} kg`} 
                      colors={colors} 
                    />
                  </Box>
                </ListItem>
                {index < orders.length - 1 && (
                  <Divider 
                    sx={{ 
                      borderColor: colors.primary[300],
                      width: "100%",
                      my: 0.5
                    }} 
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

// Helper component for order details
const OrderDetail = ({ label, value, colors, highlight = false, status = false }) => {
  // Get status color based on value
  const getStatusColor = (statusValue) => {
    const statusLower = statusValue.toLowerCase();
    if (statusLower.includes('complete') || statusLower.includes('delivered')) {
      return colors.greenAccent[500];
    } else if (statusLower.includes('transit') || statusLower.includes('processing')) {
      return colors.blueAccent[400];
    } else if (statusLower.includes('pending') || statusLower.includes('scheduled')) {
      return colors.orangeAccent[500];
    } else if (statusLower.includes('cancel') || statusLower.includes('fail') || statusLower.includes('return')) {
      return colors.redAccent[500];
    }
    return colors.grey[100];
  };

  return (
    <Box>
      <Typography 
        variant="body2" 
        fontWeight="bold"
        color={colors.blueAccent[400]}
        display="inline"
      >
        {label}:
      </Typography>{" "}
      <Typography 
        variant="body2" 
        fontWeight={highlight || status ? "600" : "400"}
        color={status ? getStatusColor(value) : highlight ? colors.orangeAccent[500] : colors.grey[100]}
        display="inline"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default OrderStatusPanel;