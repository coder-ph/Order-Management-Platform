import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const OrderStatusMetrics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [statusData, setStatusData] = useState([]);

  const COLORS = [
    colors.greenAccent[500],
    colors.blueAccent[400],
    colors.redAccent[500]
  ];

  useEffect(() => {
    fetchOrderStatusData();
  }, []);

  const fetchOrderStatusData = async () => {
    try {
      const response = await fetch('http://localhost:5555/orders/status-metrics');
      const data = await response.json();
      setStatusData([
        { name: 'Received', value: data.received },
        { name: 'Delivered', value: data.delivered },
        { name: 'Returned', value: data.returned }
      ]);
    } catch (error) {
      console.error('Error fetching order status data:', error);
      // Set some dummy data for testing
      setStatusData([
        { name: 'Received', value: 150 },
        { name: 'Delivered', value: 100 },
        { name: 'Returned', value: 20 }
      ]);
    }
  };

  return (
    <Box height="100%">
      <Typography
        variant="h5"
        fontWeight="600"
        color={colors.grey[100]}
        mb={2}
      >
        Order Status Distribution
      </Typography>
      <Box height="250px" display="flex" justifyContent="center">
        <PieChart width={300} height={250}>
          <Pie
            data={statusData}
            cx={150}
            cy={120}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: colors.primary[400],
              borderColor: colors.grey[100],
              color: colors.grey[100]
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span style={{ color: colors.grey[100] }}>{value}</span>
            )}
          />
        </PieChart>
      </Box>
    </Box>
  );
};

export default OrderStatusMetrics;