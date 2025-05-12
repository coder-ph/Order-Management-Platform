import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, useTheme, CircularProgress, Divider } from "@mui/material";
import { tokens } from "../theme";
import { fetchShipments, selectAllShipments, selectShipmentsStatus, selectShipmentsError } from '../Redux/Shipments/shipmentsSlice';

const ShipmentOrderDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const shipments = useSelector(selectAllShipments);
  const status = useSelector(selectShipmentsStatus);
  const error = useSelector(selectShipmentsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchShipments());
    }
  }, [status, dispatch]);

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="600"
        color={colors.grey[100]}
        mb={2}
      >
        Shipment Order Details
      </Typography>

      {status === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
          <CircularProgress size={24} color="secondary" />
        </Box>
      )}

      {status === 'failed' && (
        <Typography color={colors.redAccent[500]} variant="body2">
          Error: {error}
        </Typography>
      )}

      {status === 'succeeded' && shipments.length === 0 && (
        <Typography color={colors.grey[300]} variant="body2">
          No shipment orders found.
        </Typography>
      )}

      {status === 'succeeded' && shipments.length > 0 && (
        <List 
          sx={{ 
            maxHeight: "270px", 
            overflowY: "auto",
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
          {shipments.map((shipment, index) => (
            <React.Fragment key={shipment.shipment_order_id}>
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
                  <ShipmentDetail 
                    label="Shipment Order ID" 
                    value={shipment.shipment_order_id} 
                    colors={colors} 
                    highlight
                  />
                  <ShipmentDetail 
                    label="Shipment ID" 
                    value={shipment.shipment_id} 
                    colors={colors} 
                  />
                  <ShipmentDetail 
                    label="Order ID" 
                    value={shipment.order_id} 
                    colors={colors} 
                  />
                  <ShipmentDetail 
                    label="Loading Sequence" 
                    value={shipment.loading_sequence} 
                    colors={colors} 
                  />
                  <ShipmentDetail 
                    label="Unloading Sequence" 
                    value={shipment.unloading_sequence} 
                    colors={colors} 
                  />
                </Box>
              </ListItem>
              {index < shipments.length - 1 && (
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
      )}
    </Box>
  );
};

const ShipmentDetail = ({ label, value, colors, highlight = false }) => {
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
        fontWeight={highlight ? "600" : "400"}
        color={highlight ? colors.orangeAccent[500] : colors.grey[100]}
        display="inline"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default ShipmentOrderDetails;