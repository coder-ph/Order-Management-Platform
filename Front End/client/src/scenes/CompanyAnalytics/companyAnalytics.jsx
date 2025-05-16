import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO, subDays, startOfWeek, startOfMonth } from "date-fns";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import DasshboardHeader from "../../Components/DasshboardHeader";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const CompanyAnalytics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateMockOrders = () => {
      const mockOrders = [];
      for (let i = 30; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const numOrders = Math.floor(Math.random() * 10) + 1;

        for (let j = 0; j < numOrders; j++) {
          mockOrders.push({
            id: `order-${i}-${j}`,
            created_at: format(date, "yyyy-MM-dd"),
            status: ["PENDING", "COMPLETE", "CANCELED", "IN_PROGRESS"][Math.floor(Math.random() * 4)],
            delivery_status: ["RECEIVED", "DELIVERED", "RETURNED"][Math.floor(Math.random() * 3)],
            total_amount: Math.floor(Math.random() * 10000) + 500,
          });
        }
      }
      setOrders(mockOrders);
      setLoading(false);
    };

    generateMockOrders();
  }, []);

  // Aggregations
  const dailyCounts = {};
  const weeklyCounts = {};
  const monthlyCounts = {};
  const statusCounts = {
    COMPLETE: 0,
    PENDING: 0,
    CANCELED: 0,
    IN_PROGRESS: 0,
  };
  const deliveryStatusCounts = {
    RECEIVED: 0,
    DELIVERED: 0,
    RETURNED: 0,
  };

  orders.forEach((order) => {
    const day = order.created_at;
    const week = format(startOfWeek(parseISO(order.created_at)), "yyyy-MM-dd");
    const month = format(startOfMonth(parseISO(order.created_at)), "yyyy-MM");

    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    weeklyCounts[week] = (weeklyCounts[week] || 0) + 1;
    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

    if (statusCounts.hasOwnProperty(order.status)) {
      statusCounts[order.status]++;
    }
    if (deliveryStatusCounts.hasOwnProperty(order.delivery_status)) {
      deliveryStatusCounts[order.delivery_status]++;
    }
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

  const lineChartData = {
    labels: Object.keys(dailyCounts),
    datasets: [
      {
        label: "Daily Orders",
        data: Object.values(dailyCounts),
        fill: false,
        backgroundColor: colors.greenAccent[500],
        borderColor: colors.greenAccent[500],
        tension: 0.3,
      },
    ],
  };

  const weeklyChartData = {
    labels: Object.keys(weeklyCounts),
    datasets: [
      {
        label: "Weekly Orders",
        data: Object.values(weeklyCounts),
        backgroundColor: colors.blueAccent[300],
        borderColor: colors.blueAccent[300],
        tension: 0.3,
      },
    ],
  };

  const monthlyChartData = {
    labels: Object.keys(monthlyCounts),
    datasets: [
      {
        label: "Monthly Orders",
        data: Object.values(monthlyCounts),
        backgroundColor: colors.yellowAccent[400],
        borderColor: colors.yellowAccent[400],
        tension: 0.3,
      },
    ],
  };

  const pieChartData = {
    labels: ["Completed", "Pending", "Canceled", "In Progress"],
    datasets: [
      {
        data: [
          statusCounts.COMPLETE,
          statusCounts.PENDING,
          statusCounts.CANCELED,
          statusCounts.IN_PROGRESS,
        ],
        backgroundColor: [
          colors.greenAccent[500],
          colors.blueAccent[300],
          colors.redAccent[500],
          colors.yellowAccent[500],
        ],
        borderWidth: 1,
      },
    ],
  };

  const deliveryStatusChartData = {
    labels: ["Received", "Delivered", "Returned"],
    datasets: [
      {
        data: [
          deliveryStatusCounts.RECEIVED,
          deliveryStatusCounts.DELIVERED,
          deliveryStatusCounts.RETURNED,
        ],
        backgroundColor: [
          colors.greenAccent[600],
          colors.blueAccent[200],
          colors.redAccent[300],
        ],
      },
    ],
  };

  if (loading) {
    return (
      <Box m="20px" display="flex" justifyContent="center">
        <Typography>Loading analytics...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box m="20px" display="flex" justifyContent="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <DasshboardHeader title="ANALYTICS" subtitle="Company Performance Insights" />

      {/* Summary Stats */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Stats Cards */}
        {[
          { label: "Total Orders", value: orders.length, color: colors.greenAccent[500] },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: colors.greenAccent[500] },
          { label: "Completed Orders", value: statusCounts.COMPLETE, color: colors.greenAccent[500] },
          { label: "Pending Orders", value: statusCounts.PENDING, color: colors.redAccent[500] },
          { label: "Returned Orders", value: deliveryStatusCounts.RETURNED, color: colors.redAccent[300] },
          { label: "Delivered Orders", value: deliveryStatusCounts.DELIVERED, color: colors.blueAccent[200] },
        ].map((stat, idx) => (
          <Box
            key={idx}
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <Box padding="20px">
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                {stat.label}
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={stat.color}>
                {stat.value}
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Charts */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          borderRadius="4px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} marginBottom="15px">
            Daily Orders
          </Typography>
          <Box height="250px">
            <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          borderRadius="4px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} marginBottom="15px">
            Order Status Breakdown
          </Typography>
          <Box height="250px">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          borderRadius="4px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} marginBottom="15px">
            Weekly Orders
          </Typography>
          <Box height="250px">
            <Line data={weeklyChartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          borderRadius="4px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} marginBottom="15px">
            Monthly Orders
          </Typography>
          <Box height="250px">
            <Line data={monthlyChartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          borderRadius="4px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} marginBottom="15px">
            Delivery Status Breakdown
          </Typography>
          <Box height="250px">
            <Pie data={deliveryStatusChartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyAnalytics;
