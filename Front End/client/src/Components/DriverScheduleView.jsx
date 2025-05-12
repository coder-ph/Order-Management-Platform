import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverSchedules, selectAllDriverSchedules, selectDriverSchedulesStatus, selectDriverSchedulesError } from '../Redux/DriverSchedules/driverSchedulesSlice';
import { Box, Typography, useTheme, Paper, Grid, CircularProgress, Alert } from '@mui/material';
import { tokens } from '../theme';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkOffIcon from '@mui/icons-material/WorkOff';

const DriverScheduleView = () => {
  const dispatch = useDispatch();
  const driverSchedules = useSelector(selectAllDriverSchedules);
  const status = useSelector(selectDriverSchedulesStatus);
  const error = useSelector(selectDriverSchedulesError);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDriverSchedules());
    }
  }, [status, dispatch]);

  const renderDaySchedule = (day, details) => {
    const isWorking = details.work;
    const backgroundColor = isWorking ? colors.primary[400] : colors.primary[600];
    const accentColor = isWorking ? colors.greenAccent[500] : colors.redAccent[500];
    
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
        <Paper
          sx={{
            backgroundColor,
            borderLeft: `4px solid ${accentColor}`,
            p: 2,
            height: '100%',
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <CalendarTodayOutlinedIcon sx={{ color: accentColor, mr: 1 }} />
            <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Typography>
          </Box>
          
          {isWorking ? (
            <Box display="flex" alignItems="center">
              <AccessTimeIcon sx={{ color: colors.greyAccent[500], mr: 1, fontSize: "20px" }} />
              <Typography color={colors.grey[100]}>
                {details.start} - {details.end}
              </Typography>
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <WorkOffIcon sx={{ color: colors.greyAccent[500], mr: 1, fontSize: "20px" }} />
              <Typography color={colors.grey[100]}>Off Duty</Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    );
  };

  const renderDriverSchedule = (schedule) => {
    return (
      <Box
        key={schedule.schedule_id}
        sx={{
          backgroundColor: colors.primary[500],
          borderRadius: 2,
          p: 3,
          mb: 3,
          boxShadow: 2
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <DirectionsCarIcon sx={{ color: colors.blueAccent[500], mr: 1, fontSize: "28px" }} />
          <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
            Driver ID: {schedule.driver_id}
          </Typography>
        </Box>
        
        <Typography variant="h5" mb={2} color={colors.greenAccent[500]}>
          Weekly Schedule:
        </Typography>
        
        <Grid container spacing={2}>
          {Object.entries(schedule.weekly_schedule).map(([day, details]) => 
            renderDaySchedule(day, details)
          )}
        </Grid>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        p: 3,
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <Typography variant="h3" fontWeight="bold" mb={3} color={colors.grey[100]}>
        Driver Schedules
      </Typography>
      
      {status === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      
      {status === 'failed' && (
        <Alert severity="error" sx={{ backgroundColor: colors.redAccent[900], color: colors.grey[100] }}>
          Error: {error}
        </Alert>
      )}
      
      {status === 'succeeded' && driverSchedules.length === 0 && (
        <Alert severity="info" sx={{ backgroundColor: colors.blueAccent[900], color: colors.grey[100] }}>
          No driver schedules found.
        </Alert>
      )}
      
      {status === 'succeeded' && driverSchedules.length > 0 && (
        <Box sx={{ maxHeight: "800px", overflowY: "auto", pr: 1 }}>
          {driverSchedules.map(schedule => renderDriverSchedule(schedule))}
        </Box>
      )}
    </Box>
  );
};

export default DriverScheduleView;