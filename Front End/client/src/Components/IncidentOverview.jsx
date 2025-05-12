import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, useTheme, CircularProgress, Divider } from "@mui/material";
import { tokens } from "../theme";
import { fetchIncidents, selectAllIncidents, selectIncidentsStatus, selectIncidentsError } from '../Redux/Incidents/incidentsSlice';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncidentOverview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const incidents = useSelector(selectAllIncidents);
  const status = useSelector(selectIncidentsStatus);
  const error = useSelector(selectIncidentsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIncidents());
    }
  }, [status, dispatch]);

  // Prepare data for chart: count incidents by severity
  const severityCounts = incidents.reduce((acc, incident) => {
    acc[incident.severity] = (acc[incident.severity] || 0) + 1;
    return acc;
  }, {});

  // Get colors for different severity levels
  const getSeverityColors = () => {
    const severities = Object.keys(severityCounts);
    const backgroundColors = [];
    const borderColors = [];

    severities.forEach(severity => {
      const severityLower = severity.toLowerCase();
      if (severityLower.includes('critical') || severityLower.includes('high')) {
        backgroundColors.push(colors.redAccent[500]);
        borderColors.push(colors.redAccent[400]);
      } else if (severityLower.includes('medium') || severityLower.includes('moderate')) {
        backgroundColors.push(colors.orangeAccent[500]);
        borderColors.push(colors.orangeAccent[400]);
      } else if (severityLower.includes('low') || severityLower.includes('minor')) {
        backgroundColors.push(colors.blueAccent[500]);
        borderColors.push(colors.blueAccent[400]);
      } else {
        backgroundColors.push(colors.greenAccent[500]);
        borderColors.push(colors.greenAccent[400]);
      }
    });

    return { backgroundColors, borderColors };
  };

  const { backgroundColors, borderColors } = getSeverityColors();

  const data = {
    labels: Object.keys(severityCounts),
    datasets: [
      {
        label: 'Incidents by Severity',
        data: Object.values(severityCounts),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.grey[100],
          font: {
            family: "'Source Sans Pro', sans-serif",
            size: 12
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: colors.primary[700],
        titleColor: colors.grey[100],
        bodyColor: colors.grey[100],
        bodyFont: {
          family: "'Source Sans Pro', sans-serif"
        },
        titleFont: {
          family: "'Source Sans Pro', sans-serif",
          weight: 'bold'
        },
        padding: 10,
        borderColor: colors.primary[500],
        borderWidth: 1
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: colors.grey[100],
          font: {
            family: "'Source Sans Pro', sans-serif"
          }
        },
        grid: {
          display: false,
          drawBorder: true,
          color: colors.grey[700]
        }
      },
      y: {
        ticks: {
          color: colors.grey[100],
          font: {
            family: "'Source Sans Pro', sans-serif"
          }
        },
        grid: {
          color: colors.grey[700],
          drawBorder: true
        },
        beginAtZero: true
      }
    }
  };

  // Function to get color based on severity
  const getSeverityColor = (severity) => {
    const severityLower = severity.toLowerCase();
    if (severityLower.includes('critical') || severityLower.includes('high')) {
      return colors.redAccent[500];
    } else if (severityLower.includes('medium') || severityLower.includes('moderate')) {
      return colors.orangeAccent[500];
    } else if (severityLower.includes('low') || severityLower.includes('minor')) {
      return colors.blueAccent[500];
    }
    return colors.greenAccent[500];
  };

  // Function to get color based on status
  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('resolved') || statusLower.includes('complete')) {
      return colors.greenAccent[500];
    } else if (statusLower.includes('in progress') || statusLower.includes('investigating')) {
      return colors.blueAccent[400];
    } else if (statusLower.includes('pending') || statusLower.includes('open')) {
      return colors.orangeAccent[500];
    } else if (statusLower.includes('escalated') || statusLower.includes('critical')) {
      return colors.redAccent[500];
    }
    return colors.grey[100];
  };

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="600"
        color={colors.grey[100]}
        mb={2}
      >
        Incident Overview
      </Typography>

      {status === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress size={24} color="secondary" />
        </Box>
      )}

      {status === 'failed' && (
        <Typography color={colors.redAccent[500]} variant="body2">
          Error: {error}
        </Typography>
      )}

      {status === 'succeeded' && incidents.length === 0 && (
        <Typography color={colors.grey[300]} variant="body2">
          No incidents found.
        </Typography>
      )}

      {status === 'succeeded' && incidents.length > 0 && (
        <>
          <Box 
            height="180px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <Bar data={data} options={chartOptions} />
          </Box>
          
          <List 
            sx={{ 
              maxHeight: "160px", 
              overflowY: "auto",
              mt: 2,
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
            {incidents.map((incident, index) => (
              <React.Fragment key={incident.incident_id}>
                <ListItem 
                  sx={{
                    py: 1,
                    flexDirection: "column",
                    alignItems: "flex-start"
                  }}
                >
                  <Box 
                    display="grid" 
                    gridTemplateColumns="repeat(12, 1fr)" 
                    width="100%"
                    gap={1}
                  >
                    <Box gridColumn="span 4">
                      <DetailItem 
                        label="Type" 
                        value={incident.incident_type} 
                        colors={colors} 
                      />
                    </Box>
                    <Box gridColumn="span 4">
                      <DetailItem 
                        label="Severity" 
                        value={incident.severity} 
                        colors={colors}
                        valueColor={getSeverityColor(incident.severity)}
                      />
                    </Box>
                    <Box gridColumn="span 4">
                      <DetailItem 
                        label="Status" 
                        value={incident.resolution_status} 
                        colors={colors}
                        valueColor={getStatusColor(incident.resolution_status)}
                      />
                    </Box>
                    <Box gridColumn="span 6">
                      <DetailItem 
                        label="Reported By" 
                        value={incident.reported_by} 
                        colors={colors}
                      />
                    </Box>
                    <Box gridColumn="span 12">
                      <DetailItem 
                        label="Description" 
                        value={incident.description} 
                        colors={colors}
                      />
                    </Box>
                  </Box>
                </ListItem>
                {index < incidents.length - 1 && (
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
        </>
      )}
    </Box>
  );
};

// Helper component for incident details
const DetailItem = ({ label, value, colors, valueColor = null }) => {
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
        fontWeight={valueColor ? "600" : "400"}
        color={valueColor || colors.grey[100]}
        display="inline"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%"
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default IncidentOverview;