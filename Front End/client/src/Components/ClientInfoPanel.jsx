import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, selectAllClients, selectClientsStatus, selectClientsError } from '../Redux/Clients/clientsSlice';
import { 
  Box, 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Avatar, 
  Chip, 
  useTheme,
  CircularProgress,
  Alert,
  Paper,
  Stack,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  Business, 
  Email, 
  Phone, 
  LocationOn,
  Person,
  MoreVert,
  CheckCircle,
  Cancel,
  Pending
} from '@mui/icons-material';
import { tokens } from '../theme';

const ClientInfoPanel = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectAllClients);
  const status = useSelector(selectClientsStatus);
  const error = useSelector(selectClientsError);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClients());
    }
  }, [status, dispatch]);

  const getStatusConfig = (status) => {
    const statusLower = (status || '').toLowerCase();
    
    switch(statusLower) {
      case 'active':
        return {
          icon: <CheckCircle fontSize="small" />,
          color: colors.greenAccent[500],
          bgColor: `${colors.greenAccent[500]}20`
        };
      case 'inactive':
        return {
          icon: <Cancel fontSize="small" />,
          color: colors.redAccent[500],
          bgColor: `${colors.redAccent[500]}20`
        };
      case 'pending':
        return {
          icon: <Pending fontSize="small" />,
          color: colors.orangeAccent[500],
          bgColor: `${colors.orangeAccent[500]}20`
        };
      default:
        return {
          icon: null,
          color: colors.blueAccent[500],
          bgColor: `${colors.blueAccent[500]}20`
        };
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        backgroundColor: colors.primary[400],
        borderRadius: '12px',
        boxShadow: theme.shadows[3]
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
          Client Directory
        </Typography>
      </Box>

      {status === 'loading' && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      
      {status === 'failed' && (
        <Alert severity="error" sx={{ 
          backgroundColor: colors.redAccent[900],
          color: colors.grey[100],
          mb: 3
        }}>
          Error loading clients: {error || 'Unknown error occurred'}
        </Alert>
      )}
      
      {status === 'succeeded' && (!clients || clients.length === 0) && (
        <Alert severity="info" sx={{ 
          backgroundColor: colors.blueAccent[900],
          color: colors.grey[100]
        }}>
          No clients found. Add clients to see them here.
        </Alert>
      )}
      
      {status === 'succeeded' && clients && clients.length > 0 && (
        <TableContainer 
          component={Paper}
          sx={{ 
            maxHeight: 'calc(100vh - 220px)',
            backgroundColor: colors.primary[500],
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
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600],
                  color: colors.grey[100],
                  fontWeight: 'bold'
                }}>
                  Client
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600],
                  color: colors.grey[100],
                  fontWeight: 'bold'
                }}>
                  Contact
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600],
                  color: colors.grey[100],
                  fontWeight: 'bold'
                }}>
                  Email
                </TableCell>
                <TableCell sx={{ 
                  backgroundColor: colors.primary[600],
                  color: colors.grey[100],
                  fontWeight: 'bold'
                }}>
                  Phone
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
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => {
                if (!client) return null;
                
                const statusConfig = getStatusConfig(client.account_status);
                
                return (
                  <TableRow 
                    key={client.client_id} 
                    hover
                    sx={{
                      '&:last-child td': { borderBottom: 0 },
                      '&:hover': {
                        backgroundColor: colors.primary[600]
                      }
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            bgcolor: colors.greenAccent[500],
                            color: colors.primary[900],
                            width: 36,
                            height: 36
                          }}
                        >
                          {client.company_name?.charAt(0) || 'C'}
                        </Avatar>
                        <Box>
                          <Typography 
                            fontWeight="500" 
                            color={colors.grey[100]}
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {client.company_name || 'Unnamed Company'}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color={colors.grey[400]}
                            sx={{ fontSize: '0.75rem' }}
                          >
                            ID: {client.client_id || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Person sx={{ color: colors.greenAccent[400], fontSize: '18px' }} />
                        {client.contact_person || 'N/A'}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Email sx={{ color: colors.blueAccent[400], fontSize: '18px' }} />
                        {client.email || 'N/A'}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: colors.grey[100] }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Phone sx={{ color: colors.orangeAccent[400], fontSize: '18px' }} />
                        {client.phone || 'N/A'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={statusConfig.icon}
                        label={client.account_status || 'Unknown'}
                        size="small"
                        sx={{
                          backgroundColor: statusConfig.bgColor,
                          color: statusConfig.color,
                          border: `1px solid ${statusConfig.color}`,
                          fontWeight: '500'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="More options">
                        <IconButton size="small" sx={{ color: colors.grey[300] }}>
                          <MoreVert />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default ClientInfoPanel;