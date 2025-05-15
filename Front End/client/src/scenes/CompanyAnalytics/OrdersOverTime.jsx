import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OrdersOverTime = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [timeframe, setTimeframe] = useState('month');
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetch order data based on timeframe
    fetchOrderData(timeframe);
  }, [timeframe]);

  const fetchOrderData = async (period) => {
    try {
      const response = await fetch(`http://localhost:5555/orders/analytics/${period}`);
      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
      // Set some dummy data for testing
      setOrderData([
        { date: '2024-01', orders: 65 },
        { date: '2024-02', orders: 85 },
        { date: '2024-03', orders: 120 },
      ]);
    }
  };

  return (
    <Box height="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Orders Over Time
        </Typography>
        <Box>
          {['day', 'week', 'month'].map((period) => (
            <Button
              key={period}
              onClick={() => setTimeframe(period)}
              variant={timeframe === period ? "contained" : "outlined"}
              sx={{
                mx: 0.5,
                backgroundColor: timeframe === period ? colors.blueAccent[400] : "transparent",
                color: timeframe === period ? colors.grey[100] : colors.grey[100],
                "&:hover": {
                  backgroundColor: colors.blueAccent[300],
                }
              }}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </Box>
      </Box>
      <Box height="250px">
        <LineChart
          width={600}
          height={250}
          data={orderData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke={colors.grey[100]} />
          <YAxis stroke={colors.grey[100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.primary[400],
              borderColor: colors.grey[100],
              color: colors.grey[100]
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            stroke={colors.greenAccent[500]}
            strokeWidth={2}
          />
        </LineChart>
      </Box>
    </Box>
  );
};

export default OrdersOverTime;