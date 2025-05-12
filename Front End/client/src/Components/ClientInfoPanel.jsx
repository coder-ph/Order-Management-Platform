import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, selectAllClients, selectClientsStatus, selectClientsError } from '../Redux/Clients/clientsSlice';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Avatar, 
  Chip, 
  Divider, 
  useTheme,
  CircularProgress
} from '@mui/material';
import { 
  BusinessCenter, 
  Person, 
  Email, 
  Phone, 
  LocationOn, 
  AccountCircle 
} from '@mui/icons-material';
import { tokens } from '../theme';

const ClientInfoPanel = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectAllClients);
  const status = useSelector(selectClientsStatus);
  const error = useSelector(selectClientsError);
  
  // Get theme and colors from the theme context
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClients());
    }
  }, [status, dispatch]);

  // Helper function to determine color based on status
  const getStatusColor = (status) => {
    if (!status) return {
      bg: colors.blueAccent[400],
      color: theme.palette.mode === 'dark' ? colors.primary[900] : colors.primary[100]
    };
    
    switch(status.toLowerCase()) {
      case 'active':
        return {
          bg: colors.greenAccent[500],
          color: theme.palette.mode === 'dark' ? colors.primary[900] : colors.primary[100]
        };
      case 'inactive':
        return {
          bg: colors.redAccent[500],
          color: theme.palette.mode === 'dark' ? colors.primary[900] : colors.primary[100]
        };
      case 'pending':
        return {
          bg: colors.orangeAccent[500],
          color: theme.palette.mode === 'dark' ? colors.primary[900] : colors.primary[100]
        };
      default:
        return {
          bg: colors.blueAccent[500],
          color: theme.palette.mode === 'dark' ? colors.primary[900] : colors.primary[100]
        };
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        borderRadius: "10px",
        boxShadow: theme.shadows[3],
        p: 3,
        height: "100%",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 2, color: colors.grey[100] }}
      >
        Client Information
      </Typography>
      
      {/* Loading state */}
      {status === 'loading' && (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      
      {/* Error state */}
      {status === 'failed' && (
        <Typography color={colors.redAccent[500]}>
          Error: {error || 'Failed to load clients'}
        </Typography>
      )}
      
      {/* Empty state */}
      {status === 'succeeded' && (!clients || clients.length === 0) && (
        <Paper
          elevation={2}
          sx={{
            backgroundColor: colors.primary[500],
            p: 3,
            borderRadius: "8px",
            textAlign: "center"
          }}
        >
          <Typography color={colors.grey[400]}>
            No clients found. Add clients to see them here.
          </Typography>
        </Paper>
      )}
      
      {/* Client cards */}
      {status === 'succeeded' && clients && clients.length > 0 && (
        <Box 
          sx={{ 
            maxHeight: "60vh", 
            overflowY: "auto", 
            pr: 1,
            // Scrollbar styling consistent with theme
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: colors.primary[500],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: colors.blueAccent[600],
              borderRadius: '4px',
            },
          }}
        >
          <Grid container spacing={3}>
            {clients.map((client) => {
              if (!client) return null;
              
              const statusColor = getStatusColor(client.account_status);
              
              return (
                <Grid item xs={12} key={client.client_id || `client-${Math.random()}`}>
                  <Paper
                    elevation={2}
                    sx={{
                      backgroundColor: colors.primary[500],
                      p: 2,
                      borderRadius: "8px",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: theme.shadows[6]
                      }
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Box display="flex" gap={2} alignItems="center">
                        <Avatar
                          sx={{
                            backgroundColor: colors.greenAccent[500],
                            color: theme.palette.mode === 'dark' ? colors.primary[900] : colors.primary[100],
                            width: 56,
                            height: 56
                          }}
                        >
                          {client.company_name ? client.company_name.charAt(0) : 'C'}
                        </Avatar>
                        <Box>
                          <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
                            {client.company_name || 'Unnamed Company'}
                          </Typography>
                          <Typography variant="body2" color={colors.grey[300]}>
                            Client ID: {client.client_id || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                      {client.account_status && (
                        <Chip
                          label={client.account_status}
                          sx={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.color,
                            fontWeight: "bold",
                            fontSize: "0.85rem"
                          }}
                        />
                      )}
                    </Box>
                    
                    <Divider sx={{ mb: 2, bgcolor: colors.primary[300] }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Person sx={{ color: colors.greenAccent[400] }} />
                          <Typography variant="body1" color={colors.grey[100]}>
                            <strong>Contact:</strong> {client.contact_person || 'N/A'}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Email sx={{ color: colors.blueAccent[400] }} />
                          <Typography variant="body1" color={colors.grey[100]}>
                            <strong>Email:</strong> {client.email || 'N/A'}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center" gap={1}>
                          <Phone sx={{ color: colors.orangeAccent[400] }} />
                          <Typography variant="body1" color={colors.grey[100]}>
                            <strong>Phone:</strong> {client.phone || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <LocationOn sx={{ color: colors.redAccent[400] }} />
                          <Typography variant="body1" color={colors.grey[100]}>
                            <strong>Address:</strong> {client.address || 'N/A'}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center" gap={1}>
                          <AccountCircle sx={{ color: colors.greyAccent[400] }} />
                          <Typography variant="body1" color={colors.grey[100]}>
                            <strong>Status:</strong> {client.account_status || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ClientInfoPanel;