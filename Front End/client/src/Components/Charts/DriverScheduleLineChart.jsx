import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";

const DriverScheduleLineChart = ({ driversData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const transformScheduleData = (drivers) => {
    return drivers.map(driver => {
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const schedule = driver.driver_schedule[0];
      
      // Convert schedule times to data points
      const dataPoints = daysOfWeek.flatMap((day, dayIndex) => {
        const daySchedule = schedule[day];
        if (!daySchedule || !daySchedule.work || !daySchedule.start || !daySchedule.end) {
          return [];
        }

        // Convert time strings to decimal hours for visualization
        const startParts = daySchedule.start.split(':');
        const endParts = daySchedule.end.split(':');
        const startHour = parseInt(startParts[0]) + parseInt(startParts[1]) / 60;
        const endHour = parseInt(endParts[0]) + parseInt(endParts[1]) / 60;

        // Create points for start and end of shift
        return [
          {
            x: dayIndex * 24 + startHour,
            y: 1, // Working
          },
          {
            x: dayIndex * 24 + startHour,
            y: 0, // Not working
          },
          {
            x: dayIndex * 24 + endHour,
            y: 1, // Working
          },
          {
            x: dayIndex * 24 + endHour,
            y: 0, // Not working
          }
        ];
      });

      // Sort data points by x value
      dataPoints.sort((a, b) => a.x - b.x);

      return {
        id: `${driver.first_name} ${driver.last_name}`,
        data: dataPoints
      };
    });
  };

  const chartData = transformScheduleData(driversData);

  return (
    <Box sx={{ height: "400px" }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        xScale={{
          type: "linear",
          min: 0,
          max: 24 * 7, // 7 days * 24 hours
        }}
        yScale={{
          type: "linear",
          min: -0.1,
          max: 1.1,
        }}
        curve="stepAfter"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: Array.from({ length: 8 }, (_, i) => i * 24),
          format: value => {
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            return days[Math.floor(value / 24)];
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: [0, 1],
          format: value => value === 1 ? 'Working' : 'Off',
        }}
        enableGridX={true}
        gridXValues={Array.from({ length: 8 }, (_, i) => i * 24)}
        enableGridY={false}
        enablePoints={false}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              background: colors.primary[400],
              color: colors.grey[100],
            },
          },
        }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemDirection: 'left-to-right',
            itemWidth: 140,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        tooltip={({ point }) => {
          const hour = point.x % 24;
          const minutes = Math.round((hour % 1) * 60);
          const formattedTime = `${Math.floor(hour)}:${minutes.toString().padStart(2, '0')}`;
          const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][Math.floor(point.x / 24)];
          return (
            <div style={{ 
              background: colors.primary[400], 
              padding: '9px 12px', 
              border: '1px solid ' + colors.grey[100] 
            }}>
              <strong>{point.serieId}</strong>
              <br />
              {day} at {formattedTime}
              <br />
              Status: {point.data.y === 1 ? 'Working' : 'Off'}
            </div>
          );
        }}
      />
    </Box>
  );
};

export default DriverScheduleLineChart;