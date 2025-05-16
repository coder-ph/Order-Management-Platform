import React from "react";
import { Box, Typography, useTheme, Paper, Grid } from "@mui/material";
import { tokens } from "../../theme";
import ProfitRevenueRates from "../DriverManager/ProfitRevenueRates";
import LogisticsDashboard from '/src/Components/LogisticsDashboard';
import ShipmentDeliveryOverTime from "../DriverManager/ShipmentDeliveriesOverTime";
import OrdersOverTime from './OrdersOverTime';
import OrderStatusMetrics from './OrderStatusMetrics';

const CompanyAnalyticsDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const DashboardCard = ({ children, title }) => (
    <Paper
      sx={{
        p: 3,
        backgroundColor: colors.primary[400],
        borderRadius: 2,
        height: '100%',
        minHeight: '400px'
      }}
    >
      <Typography
        variant="h5"
        color={colors.grey[100]}
        fontWeight="bold"
        mb={3}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );

  return (
    <Box m="20px">
      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          COMPANY ANALYTICS
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          Comprehensive Performance Dashboard
        </Typography>
      </Box>

      {/* Dashboard Grid */}
      <Grid container spacing={3}>
        {/* Orders Over Time */}
        <Grid item xs={12} md={8}>
          <DashboardCard title="Cumulative Orders">
            <OrdersOverTime />
          </DashboardCard>
        </Grid>

        {/* Order Status */}
        <Grid item xs={12} md={4}>
          <DashboardCard title="Order Status Distribution">
            <OrderStatusMetrics />
          </DashboardCard>
        </Grid>

        {/* Profit & Revenue */}
        <Grid item xs={12}>
          <DashboardCard title="Profit & Revenue Analysis">
            <ProfitRevenueRates />
          </DashboardCard>
        </Grid>

        {/* Logistics Dashboard */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="Logistics Overview">
            <LogisticsDashboard />
          </DashboardCard>
        </Grid>

        {/* Shipment Delivery */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="Delivery Trends">
            <ShipmentDeliveryOverTime />
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyAnalyticsDashboard;
