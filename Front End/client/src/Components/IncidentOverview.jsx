import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Typography, useTheme, CircularProgress, 
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip,
  Tabs, Tab, IconButton, Tooltip
} from "@mui/material";
import { tokens } from "../theme";
import { fetchIncidents, selectAllIncidents, selectIncidentsStatus, selectIncidentsError } from '../Redux/Incidents/incidentsSlice';
import { Refresh, WarningAmber, PriorityHigh } from '@mui/icons-material';

const IncidentOverview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const incidents = useSelector(selectAllIncidents);
  const status = useSelector(selectIncidentsStatus);
  const error = useSelector(selectIncidentsError);
  const [tabValue, setTabValue] = useState(0);

  // Filter incidents based on tab selection
  const filteredIncidents = useMemo(() => {
    if (!incidents.length) return [];
    
    switch (tabValue) {
      case 1: // Active
        return incidents.filter(incident => 
          !['Resolved', 'Closed', 'Completed'].includes(incident.resolution_status));
      case 2: // Critical
        return incidents.filter(incident => 
          ['critical', 'high'].includes(incident.severity.toLowerCase()));
      default: // All
        return incidents;
    }
  }, [incidents, tabValue]);

  // Critical incidents count
  const criticalCount = useMemo(() => 
    incidents.filter(i => ['critical', 'high'].includes(i.severity.toLowerCase())).length,
    [incidents]
  );

  useEffect(() => {
    if (status === 'idle') dispatch(fetchIncidents());
  }, [status, dispatch]);

  const handleRefresh = () => dispatch(fetchIncidents());
  const handleTabChange = (_, newValue) => setTabValue(newValue);

  // Helper functions
  const getSeverityColor = (severity) => {
    const s = severity.toLowerCase();
    if (s.includes('critical') || s.includes('high')) return colors.redAccent[500];
    if (s.includes('medium')) return colors.orangeAccent[500];
    if (s.includes('low')) return colors.blueAccent[500];
    return colors.greenAccent[500];
  };

  const getStatusColor = (status) => {
    const s = status.toLowerCase();
    if (s.includes('resolved') || s.includes('complete')) return colors.greenAccent[500];
    if (s.includes('in progress')) return colors.blueAccent[400];
    if (s.includes('pending') || s.includes('open')) return colors.orangeAccent[500];
    if (s.includes('escalated')) return colors.redAccent[500];
    return colors.grey[100];
  };

  if (status === 'loading') return (
    <Box display="flex" justifyContent="center" alignItems="center" height="280px">
      <CircularProgress size={32} color="secondary" />
    </Box>
  );

  if (status === 'failed') return (
    <Typography color={colors.redAccent[500]} variant="body2">
      Error: {error}
    </Typography>
  );

  if (status === 'succeeded' && !incidents.length) return (
    <Typography color={colors.grey[300]} variant="body2">
      No incidents found.
    </Typography>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Incident Overview
          {criticalCount > 0 && (
            <Chip 
              size="small"
              label={`${criticalCount} Critical`}
              sx={{ ml: 1, bgcolor: colors.redAccent[500], color: colors.grey[100], fontWeight: "bold" }}
              icon={<PriorityHigh style={{ color: colors.grey[100] }} />}
            />
          )}
        </Typography>
        <Tooltip title="Refresh incidents">
          <IconButton size="small" onClick={handleRefresh} sx={{ color: colors.grey[100] }}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            color: colors.grey[300],
            minHeight: 40,
            fontSize: '0.8rem',
            '&.Mui-selected': { color: colors.greenAccent[400] }
          },
          mb: 2,
          borderBottom: 1,
          borderColor: colors.grey[700]
        }}
      >
        <Tab label={`All (${incidents.length})`} />
        <Tab label="Active" />
        <Tab label="Critical" />
      </Tabs>

      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: "440px",
          bgcolor: colors.primary[400],
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': { background: colors.primary[400] },
          '&::-webkit-scrollbar-thumb': { backgroundColor: colors.grey[700], borderRadius: '8px' }
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {['Type', 'Severity', 'Status', 'Reporter'].map((header) => (
                <TableCell key={header} sx={{ 
                  backgroundColor: colors.primary[500], 
                  color: colors.greenAccent[500],
                  fontWeight: "bold"
                }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIncidents.map((incident) => (
              <TableRow key={incident.incident_id}>
                <TableCell sx={{ color: colors.grey[100] }}>
                  <Tooltip title={incident.description}>
                    <Typography variant="body2" sx={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "120px" }}>
                      {incident.incident_type}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={incident.severity.toLowerCase().includes('critical') ? <PriorityHigh /> : <WarningAmber />}
                    label={incident.severity}
                    size="small"
                    sx={{
                      bgcolor: `${getSeverityColor(incident.severity)}20`,
                      color: getSeverityColor(incident.severity),
                      border: `1px solid ${getSeverityColor(incident.severity)}`,
                      fontWeight: "bold",
                      '& .MuiChip-icon': { color: getSeverityColor(incident.severity) }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={incident.resolution_status}
                    size="small"
                    sx={{
                      bgcolor: `${getStatusColor(incident.resolution_status)}20`,
                      color: getStatusColor(incident.resolution_status),
                      border: `1px solid ${getStatusColor(incident.resolution_status)}`,
                      fontWeight: "bold"
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: colors.grey[100] }}>
                  {incident.reported_by}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IncidentOverview;