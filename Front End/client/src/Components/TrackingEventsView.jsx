import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Typography, useTheme, CircularProgress,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";
import { tokens } from "../theme";
import { fetchTrackingEvents, selectAllTrackingEvents, selectTrackingEventsStatus, selectTrackingEventsError } from '../Redux/TrackingEvents/trackingEventsSlice';

const TrackingEventsView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const trackingEvents = useSelector(selectAllTrackingEvents);
  const status = useSelector(selectTrackingEventsStatus);
  const error = useSelector(selectTrackingEventsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTrackingEvents());
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
        Tracking Events
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

      {status === 'succeeded' && trackingEvents.length === 0 && (
        <Typography color={colors.grey[300]} variant="body2">
          No tracking events found.
        </Typography>
      )}

      {status === 'succeeded' && trackingEvents.length > 0 && (
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
                  color: colors.greenAccent[500],
                  fontWeight: "bold"
                }}>
                  Event Type
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.greenAccent[500],
                  fontWeight: "bold"
                }}>
                  Event Time
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.greenAccent[500],
                  fontWeight: "bold"
                }}>
                  Location
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.greenAccent[500],
                  fontWeight: "bold"
                }}>
                  GPS Coordinates
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.greenAccent[500],
                  fontWeight: "bold"
                }}>
                  Description
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.greenAccent[500],
                  fontWeight: "bold"
                }}>
                  Recorded By
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trackingEvents.map((event) => (
                <TableRow key={event.tracking_event_id}>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {event.event_type}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {event.event_time}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {event.location_id}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {event.gps_coordinates}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {event.event_description}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {event.recorded_by}
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

export default TrackingEventsView;