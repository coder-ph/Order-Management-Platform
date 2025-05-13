import React, { useContext } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens, ColorModeContext } from "../theme";
import IncidentOverview from './IncidentOverview';
import DriverRoster from './DriverRoster';
import BillingSummary from './BillingSummary';
import OrderStatusPanel from './OrderStatusPanel';
import ShipmentOrderDetails from './ShipmentOrderDetails';
import TrackingEventsView from './TrackingEventsView';
import ClientInfoPanel from './ClientInfoPanel';
import DriverScheduleView from './DriverScheduleView';

const LogisticsDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box 
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.mode === "dark" 
          ? colors.primary[500] 
          : colors.primary[400],
        padding: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color={colors.grey[100]}
        >
          Logistics Management Dashboard
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="420px"  
        gap={3}  
      >
        {/* Incident Overview */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          boxShadow={theme.palette.mode === "dark" ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.1)"}
          overflow="auto"
          p={2}
        >
          <IncidentOverview />
        </Box>

        {/* Driver Roster */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 8" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          boxShadow={theme.palette.mode === "dark" ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.1)"}
          overflow="auto"
          p={2}
        >
          <DriverRoster />
        </Box>

        {/* Billing Summary */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 6" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          boxShadow={theme.palette.mode === "dark" ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.1)"}
          overflow="auto"
          p={2}
        >
          <BillingSummary />
        </Box>

        {/* Order Status Panel */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12", md: "span 6" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          boxShadow={theme.palette.mode === "dark" ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.1)"}
          overflow="auto"
          p={2}
        >
          <OrderStatusPanel />
        </Box>

        {/* Shipment Order Details  */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12", md: "span 6" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          boxShadow={theme.palette.mode === "dark" ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.1)"}
          overflow="auto"
          p={2}
        >
          <ShipmentOrderDetails />
        </Box>

        {/* Tracking Events View  */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 6" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          boxShadow={theme.palette.mode === "dark" ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.1)"}
          overflow="auto"
          p={2}
        >
          <TrackingEventsView />
        </Box>

        {/* Client Info Panel */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 6" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          boxShadow={theme.palette.mode === "dark" ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.1)"}
          overflow="auto"
          p={2}
        >
          <ClientInfoPanel />
        </Box>
        
        {/* Driver Schedule View */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 6" }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          boxShadow={theme.palette.mode === "dark" ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.1)"}
          overflow="auto"
          p={2}
        >
          <DriverScheduleView />
        </Box>
      </Box>
    </Box>
  );
};

export default LogisticsDashboard;