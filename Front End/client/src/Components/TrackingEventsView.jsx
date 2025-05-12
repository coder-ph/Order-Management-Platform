import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, useTheme, CircularProgress } from "@mui/material";
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
          {trackingEvents.map((event) => (
            <ListItem 
              key={event.tracking_event_id}
              sx={{
                borderBottom: `1px solid ${colors.primary[300]}`,
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
                <EventDetail label="Event Type" value={event.event_type} colors={colors} />
                <EventDetail label="Event Time" value={event.event_time} colors={colors} />
                <EventDetail label="Location ID" value={event.location_id} colors={colors} />
                <EventDetail label="GPS Coordinates" value={event.gps_coordinates} colors={colors} />
                <Box gridColumn="span 2">
                  <EventDetail label="Description" value={event.event_description} colors={colors} />
                </Box>
                <EventDetail label="Recorded By" value={event.recorded_by} colors={colors} />
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

const EventDetail = ({ label, value, colors }) => {
  return (
    <Box>
      <Typography 
        variant="body2" 
        fontWeight="bold"
        color={colors.greenAccent[500]}
        display="inline"
      >
        {label}:
      </Typography>{" "}
      <Typography 
        variant="body2" 
        color={colors.grey[100]}
        display="inline"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default TrackingEventsView;