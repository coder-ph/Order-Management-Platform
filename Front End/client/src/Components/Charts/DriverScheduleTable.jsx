import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  Paper,
  useTheme,
  Typography
} from '@mui/material';
import { tokens } from "../../theme";
import { useState } from 'react';

const DriverScheduleTable = ({ driversData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatSchedule = (schedule) => {
    if (!schedule || !schedule.work) return "Off";
    if (!schedule.start || !schedule.end) return "No time set";
    return `${schedule.start} - ${schedule.end}`;
  };

  const getScheduleStyle = (schedule) => {
    if (!schedule || !schedule.work) {
      return { color: colors.redAccent[500] };
    }
    return { color: colors.greenAccent[500] };
  };

  return (
    <Paper 
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        backgroundColor: colors.primary[400],
        "& .MuiTableCell-root": {
          color: colors.grey[100]
        }
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: colors.primary[400] }}>Driver Name</TableCell>
              <TableCell sx={{ backgroundColor: colors.primary[400] }}>Monday</TableCell>
              <TableCell sx={{ backgroundColor: colors.primary[400] }}>Tuesday</TableCell>
              <TableCell sx={{ backgroundColor: colors.primary[400] }}>Wednesday</TableCell>
              <TableCell sx={{ backgroundColor: colors.primary[400] }}>Thursday</TableCell>
              <TableCell sx={{ backgroundColor: colors.primary[400] }}>Friday</TableCell>
              <TableCell sx={{ backgroundColor: colors.primary[400] }}>Saturday</TableCell>
              <TableCell sx={{ backgroundColor: colors.primary[400] }}>Sunday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {driversData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((driver) => (
                <TableRow key={driver.driver_id}>
                  <TableCell>
                    <Typography variant="body2" color={colors.grey[100]}>
                      {`${driver.first_name} ${driver.last_name}`}
                    </Typography>
                  </TableCell>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <TableCell key={day}>
                      <Typography 
                        variant="body2" 
                        sx={getScheduleStyle(driver.driver_schedule[0][day])}
                      >
                        {formatSchedule(driver.driver_schedule[0][day])}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={driversData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: colors.grey[100],
          "& .MuiTablePagination-select": {
            color: colors.grey[100]
          },
          "& .MuiTablePagination-selectIcon": {
            color: colors.grey[100]
          }
        }}
      />
    </Paper>
  );
};

export default DriverScheduleTable;