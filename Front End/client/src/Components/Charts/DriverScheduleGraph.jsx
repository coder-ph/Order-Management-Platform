import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Box, Pagination, Typography, Tabs, Tab, TextField } from "@mui/material";
import { useState } from "react";

const DayScheduleGraph = ({ dayData, driversPerPage = 5, colors, timeFilter }) => {
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter drivers based on time
  const filterDriversByTime = (drivers, timeStr) => {
    if (!timeStr) return drivers;

    return drivers.filter(driver => {
      if (!driver.start || !driver.end || !driver.working) return false;
      
      const filterTime = new Date(`2025-01-01 ${timeStr}`);
      const startTime = new Date(`2025-01-01 ${driver.start}`);
      const endTime = new Date(`2025-01-01 ${driver.end}`);
      
      return filterTime >= startTime && filterTime <= endTime;
    });
  };

  const filteredDayData = filterDriversByTime(dayData, timeFilter);
  const startIdx = (page - 1) * driversPerPage;
  const paginatedDrivers = filteredDayData.slice(startIdx, startIdx + driversPerPage);
  const totalPages = Math.ceil(filteredDayData.length / driversPerPage);

  if (paginatedDrivers.length === 0) {
    return (
      <Box sx={{ 
        height: "200px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: colors.grey[100]
      }}>
        {timeFilter 
          ? `No drivers scheduled at ${timeFilter}` 
          : "No drivers scheduled for this day"}
      </Box>
    );
  }

  return (
    <Box sx={{ height: "250px", width: "100%" }}>
      <Box sx={{ height: "200px" }}>
        <ResponsiveBar
          data={[
            {
              day: dayData[0].day,
              ...paginatedDrivers.reduce((acc, driver) => {
                acc[driver.name] = driver.hours;
                acc[`${driver.name}Color`] = driver.working ? colors.greenAccent[500] : colors.redAccent[500];
                acc[`${driver.name}Start`] = driver.start;
                acc[`${driver.name}End`] = driver.end;
                return acc;
              }, {})
            }
          ]}
          keys={paginatedDrivers.map(d => d.name)}
          indexBy="day"
          margin={{ top: 20, right: 130, bottom: 40, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          colors={({ id, data }) => data[`${id}Color`]}
          theme={{
            axis: {
              domain: { line: { stroke: colors.grey[100] }},
              legend: { text: { fill: colors.grey[100] }},
              ticks: {
                line: { stroke: colors.grey[100], strokeWidth: 1 },
                text: { fill: colors.grey[100] }
              }
            },
            legends: { text: { fill: colors.grey[100] }}
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Hours",
            legendPosition: "middle",
            legendOffset: -40
          }}
          legendLabel={d => `${d.id} (${d.data[`${d.id}Start`]} - ${d.data[`${d.id}End`]})`}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemTextColor: colors.grey[100],
              symbolSize: 20,
            }
          ]}
          tooltip={({ id, value, color, indexValue, data }) => (
            <div
              style={{
                padding: 12,
                background: colors.primary[400],
                color: colors.grey[100],
              }}
            >
              <strong>{id}</strong>
              <br />
              Start: {data[`${id}Start`]}
              <br />
              End: {data[`${id}End`]}
              <br />
              Hours: {value.toFixed(2)}
            </div>
          )}
        />
      </Box>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: colors.grey[100],
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

const DriverScheduleGraph = ({ driversData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentDay, setCurrentDay] = useState(0);
  const [timeFilter, setTimeFilter] = useState("");
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayChange = (event, newValue) => {
    setCurrentDay(newValue);
  };

  const handleTimeFilterChange = (event) => {
    const timeValue = event.target.value;
    setTimeFilter(timeValue);
  };

  // Transform schedule data by day
  const transformScheduleData = (drivers) => {
    const daySchedules = daysOfWeek.map(day => {
      const dayKey = day.toLowerCase();
      const driversForDay = drivers
        .map(driver => {
          const schedule = driver.driver_schedule[0][dayKey];
          if (!schedule) return null;

          return {
            name: `${driver.first_name} ${driver.last_name}`,
            hours: schedule.work && schedule.start && schedule.end ? 
              (new Date(`2025-01-01 ${schedule.end}`) - new Date(`2025-01-01 ${schedule.start}`)) / (1000 * 60 * 60)
              : 0,
            working: schedule.work,
            start: schedule.start || "N/A",
            end: schedule.end || "N/A",
            day: day
          };
        })
        .filter(d => d !== null);

      return {
        day: day,
        drivers: driversForDay
      };
    });

    return daySchedules;
  };

  const scheduleData = transformScheduleData(driversData);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tabs 
            value={currentDay} 
            onChange={handleDayChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: colors.grey[100],
                '&.Mui-selected': {
                  color: colors.greenAccent[500],
                },
              },
            }}
          >
            {daysOfWeek.map((day, index) => (
              <Tab key={day} label={day} />
            ))}
          </Tabs>
          
          <TextField
            type="time"
            value={timeFilter}
            onChange={handleTimeFilterChange}
            sx={{
              width: 150,
              '& .MuiInputBase-input': {
                color: colors.grey[100],
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.grey[100],
                },
                '&:hover fieldset': {
                  borderColor: colors.greenAccent[500],
                },
              },
              '& .MuiInputLabel-root': {
                color: colors.grey[100],
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Box>
      
      <Typography variant="h6" sx={{ mb: 2, color: colors.grey[100] }}>
        {daysOfWeek[currentDay]} Schedule {timeFilter ? `at ${timeFilter}` : ''}
      </Typography>

      <DayScheduleGraph 
        dayData={scheduleData[currentDay].drivers}
        colors={colors}
        driversPerPage={5}
        timeFilter={timeFilter}
      />
    </Box>
  );
};

export default DriverScheduleGraph;