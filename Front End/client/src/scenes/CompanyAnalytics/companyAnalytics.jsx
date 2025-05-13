import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
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
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const CompanyAnalytics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://eci-jsons-myf8.vercel.app/orders ",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data?.data) {
          setOrders(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const dailyCounts = {};
  orders.forEach((order) => {
    const day = format(parseISO(order.created_at), "yyyy-MM-dd");
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  });

  const lineChartData = {
    labels: Object.keys(dailyCounts),
    datasets: [
      {
        label: "Orders per Day",
        data: Object.values(dailyCounts),
        fill: false,
        backgroundColor: colors.greenAccent[500],
        borderColor: colors.greenAccent[500],
        tension: 0.3,
      },
    ],
  };

  const statusCounts = {
    received: 0,
    delivered: 0,
    returned: 0,
  };
  orders.forEach((order) => {
    if (statusCounts[order.status] !== undefined) {
      statusCounts[order.status]++;
    }
  });

  const pieChartData = {
    labels: ["Received", "Delivered", "Returned"],
    datasets: [
      {
        data: [
          statusCounts.received,
          statusCounts.delivered,
          statusCounts.returned,
        ],
        backgroundColor: [
          colors.blueAccent[400],
          colors.greenAccent[500],
          colors.redAccent[500],
        ],
        borderWidth: 1,
      },
    ],
  };

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
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px"
        >
          <Box padding="20px">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Total Orders
            </Typography>
            <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
              {orders.length}
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px"
        >
          <Box padding="20px">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Delivered Orders
            </Typography>
            <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
              {statusCounts.delivered}
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px"
        >
          <Box padding="20px">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Returned Orders
            </Typography>
            <Typography variant="h3" fontWeight="bold" color={colors.redAccent[500]}>
              {statusCounts.returned}
            </Typography>
          </Box>
        </Box>

        {/* Charts */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          borderRadius="4px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} marginBottom="15px">
            Orders Per Day
          </Typography>
          <Box height="250px">
            <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
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
            Order Status Breakdown
          </Typography>
          <Box height="250px">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyAnalytics;