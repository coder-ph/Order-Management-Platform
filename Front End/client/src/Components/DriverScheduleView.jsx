import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverSchedules, selectAllDriverSchedules, selectDriverSchedulesStatus, selectDriverSchedulesError } from '../Redux/DriverSchedules/driverSchedulesSlice';
import { 
  Box, Typography, useTheme, Paper, 
  CircularProgress, Alert, TableContainer, 
  Table, TableHead, TableBody, TableRow, 
  TableCell, Chip, Avatar, Stack 
} from '@mui/material';
import { tokens } from '../theme';
import { 
  CalendarToday, DirectionsCar, 
  AccessTime, WorkOff, 
  CheckCircle, Cancel 
} from '@mui/icons-material';

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

  const getDayColor = (isWorking) => 
    isWorking ? colors.greenAccent[500] : colors.redAccent[500];

  const renderScheduleTable = (schedule) => {
    const days = Object.entries(schedule.weekly_schedule);
    
    return (
      <TableContainer 
        component={Paper} 
        sx={{ 
          mb: 3, 
          backgroundColor: colors.primary[500],
          borderLeft: `4px solid ${colors.blueAccent[500]}`
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} sx={{ 
                backgroundColor: colors.primary[600], 
                borderBottom: `2px solid ${colors.blueAccent[500]}`
              }}>
                <Box display="flex" alignItems="center">
                  <DirectionsCar sx={{ color: colors.blueAccent[500], mr: 1.5 }} />
                  <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
                    Driver ID: {schedule.driver_id}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ 
                backgroundColor: colors.primary[600], 
                color: colors.grey[100],
                fontWeight: 'bold'
              }}>
                Day
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: colors.primary[600], 
                color: colors.grey[100],
                fontWeight: 'bold'
              }}>
                Status
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: colors.primary[600], 
                color: colors.grey[100],
                fontWeight: 'bold'
              }}>
                Hours
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map(([day, details]) => {
              const isWorking = details.work;
              const dayColor = getDayColor(isWorking);
              
              return (
                <TableRow key={day} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    <Box display="flex" alignItems="center">
                      <CalendarToday sx={{ color: dayColor, mr: 1.5 }} />
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      avatar={
                        <Avatar sx={{ 
                          bgcolor: 'transparent',
                          color: dayColor
                        }}>
                          {isWorking ? <CheckCircle /> : <Cancel />}
                        </Avatar>
                      }
                      label={isWorking ? 'Working' : 'Off Duty'}
                      sx={{
                        backgroundColor: `${dayColor}20`,
                        color: colors.grey[100],
                        border: `1px solid ${dayColor}`
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {isWorking ? (
                      <Box display="flex" alignItems="center">
                        <AccessTime sx={{ color: dayColor, mr: 1 }} />
                        {details.start} - {details.end}
                      </Box>
                    ) : (
                      <Box display="flex" alignItems="center">
                        <WorkOff sx={{ color: colors.grey[400], mr: 1 }} />
                        Not Scheduled
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color={colors.grey[100]}>
        Driver Schedules
        <Typography variant="body1" color={colors.grey[400]} mt={1}>
          View and manage all driver schedules
        </Typography>
      </Typography>
      
      {status === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      
      {status === 'failed' && (
        <Alert severity="error" sx={{ 
          backgroundColor: colors.redAccent[900], 
          color: colors.grey[100],
          mb: 3
        }}>
          Error loading schedules: {error}
        </Alert>
      )}
      
      {status === 'succeeded' && driverSchedules.length === 0 && (
        <Alert severity="info" sx={{ 
          backgroundColor: colors.blueAccent[900], 
          color: colors.grey[100],
          mb: 3
        }}>
          No driver schedules found. Please create a new schedule.
        </Alert>
      )}
      
      {status === 'succeeded' && driverSchedules.length > 0 && (
        <Stack spacing={3}>
          {driverSchedules.map(schedule => renderScheduleTable(schedule))}
        </Stack>
      )}
    </Box>
  );
};

export default DriverScheduleView;