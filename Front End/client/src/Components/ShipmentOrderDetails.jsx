import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Typography, useTheme, CircularProgress,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";
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
        <TableContainer 
          component={Paper}
          sx={{ 
            maxHeight: "800px",
            bgcolor: colors.primary[400],
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
          <Table size="medium" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.blueAccent[400],
                  fontWeight: "bold"
                }}>
                  Shipment Order ID
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.blueAccent[400],
                  fontWeight: "bold"
                }}>
                  Shipment ID
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.blueAccent[400],
                  fontWeight: "bold"
                }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.blueAccent[400],
                  fontWeight: "bold"
                }}>
                  Loading Sequence
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.blueAccent[400],
                  fontWeight: "bold"
                }}>
                  Unloading Sequence
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.shipment_order_id}>
                  <TableCell sx={{ 
                    color: colors.orangeAccent[500],
                    fontWeight: "600"
                  }}>
                    {shipment.shipment_order_id}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {shipment.shipment_id}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {shipment.order_id}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {shipment.loading_sequence}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {shipment.unloading_sequence}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ShipmentOrderDetails;