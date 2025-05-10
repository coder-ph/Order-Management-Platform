import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import {
  Box,
  useTheme,
  CircularProgress,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import {
  fetchDriverStatusAsync,
  updateDriverStatusAsync,
} from "../../Redux/DriverStatusAvailability/driverStatusAvailabilityActions.jsx";
import {
  selectData,
  selectLoading,
  selectError,
} from "../../Redux/DriverStatusAvailability/driverStatusAvailabilitySelectors.jsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import DriverScheduleGraph from "../../Components/Charts/DriverScheduleGraph";
import DriverScheduleTable from "../../Components/Charts/DriverScheduleTable";
import DriverScheduleLineChart from "../../Components/Charts/DriverScheduleLineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DriverAvailability = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const drivers = useSelector(selectData) || [];
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCarrier, setSelectedCarrier] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedReason, setSelectedReason] = useState("all");
  const [searchDriverByName, setSearchDriverByName] = useState("");

  useEffect(() => {
    dispatch(fetchDriverStatusAsync());
  }, [dispatch]);

  const handleStatusChange = (driverId, newStatus, reason = "") => {
    dispatch(updateDriverStatusAsync(driverId, newStatus, reason));
  };

  const handleSearch = (e) => {
    setSearchDriverByName(e.target.value);
  };

  // Filter drivers by name first
  const filterByName = (driver) => {
    if (!searchDriverByName) return true;
    const fullName = `${driver.first_name} ${driver.last_name}`.toLowerCase();
    return fullName.includes(searchDriverByName.toLowerCase());
  };

  // curent time
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const currentDateTime = `${currentDate} ${currentTime}`;
  // console.log("Current Date and Time:", currentDateTime);

  // Filter functions
  const filterByDate = (driver) => {
    if (dateRange === "all") return true;
    const today = new Date();
    const driverDate = new Date(driver.created_at);

    switch (dateRange) {
      case "month":
        return driverDate >= new Date(today.setMonth(today.getMonth() - 1));
      case "quarter":
        return driverDate >= new Date(today.setMonth(today.getMonth() - 3));
      case "year":
        return (
          driverDate >= new Date(today.setFullYear(today.getFullYear() - 1))
        );
      default:
        return true;
    }
  };

  const filterByCarrier = (driver) => {
    if (!driver.carrier_id) return selectedCarrier === "all";
    return selectedCarrier === "all" || driver.carrier_id === selectedCarrier;
  };

  const filterByStatus = (driver) => {
    return selectedStatus === "all" || driver.status === selectedStatus;
  };

  const filterByReason = (driver) => {
    return (
      selectedReason === "all" || driver.inactivity_reason === selectedReason
    );
  };

  // Apply all filters in sequence
  const filteredDrivers = drivers
    .filter(filterByName)
    .filter(filterByDate)
    .filter(filterByCarrier)
    .filter(filterByStatus)
    .filter(filterByReason);

  // Statistics calculations
  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter((d) => d.status === "active").length;
  const inactiveDrivers = drivers.filter((d) => d.status === "inactive").length;
  const pendingDrivers = drivers.filter((d) => d.status === "pending").length;
  const onLeaveDrivers = drivers.filter((d) => d.status === "on_leave").length;
  const suspendedDrivers = drivers.filter(
    (d) => d.status === "suspended"
  ).length;

  const carriers = [
    ...new Set(drivers.map((d) => d.carrier_id).filter(Boolean)),
  ];

  //Aggregate drivers by carrier
  const driversPerCarrier = carriers.map((carrier) => ({
    carrier,
    count: drivers.filter((d) => d.carrier_id === carrier).length,
  }));

  // aggriate new drivers by month
  const getNewDriversByMonth = () => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
    }).reverse();

    return last6Months.map((month) => ({
      month,
      count: drivers.filter((d) => {
        const driverDate = new Date(d.created_at);
        return (
          driverDate.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          }) === month
        );
      }).length,
    }));
  };

  // Add this calculation near other statistics calculations
  const carrierDriverCounts = carriers.map(carrier => ({
    name: carrier,
    count: drivers.filter(d => d.carrier_id === carrier).length
  }));

  const totalCarriers = carriers.length;

  // Chart data
  const statusChartData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [
          activeDrivers,
          inactiveDrivers,
          pendingDrivers,
          onLeaveDrivers,
          suspendedDrivers,
        ],
        backgroundColor: [
          colors.greenAccent[500],
          colors.redAccent[500],
          colors.blueAccent[500],
          colors.orangeAccent[500],
          colors.greyAccent[500],
        ],
      },
    ],
  };

  const newDriversChartData = {
    labels: getNewDriversByMonth().map((d) => d.month),
    datasets: [
      {
        label: "New Drivers",
        data: getNewDriversByMonth().map((d) => d.count),
        backgroundColor: colors.primary[300],
      },
    ],
  };

  const inactivityReasons = [
    "expired_license",
    "expired_medical_cert",
    
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} color={colors.redAccent[500]}>
        Error: {error}
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Filters Section */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          select
          label="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          sx={{ minWidth: 300 }}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          
        </TextField>

        <TextField
          select
          label="Carrier"
          value={selectedCarrier}
          onChange={(e) => setSelectedCarrier(e.target.value)}
          sx={{ minWidth: 300 }}
        >
          <MenuItem value="all">All Carriers</MenuItem>
          {carriers.map((carrier) => (
            <MenuItem key={carrier} value={carrier}>
              {carrier}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Date Range"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          sx={{ minWidth: 300 }}
        >
          <MenuItem value="all">All Time</MenuItem>
          <MenuItem value="month">Last Month</MenuItem>
          <MenuItem value="quarter">Last Quarter</MenuItem>
          <MenuItem value="year">Last Year</MenuItem>
        </TextField>

        <TextField
          select
          label="Inactivity Reason"
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
          sx={{ minWidth: 300 }}
        >
          <MenuItem value="all">All Reasons</MenuItem>
          {inactivityReasons.map((reason) => (
            <MenuItem key={reason} value={reason}>
              {reason
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Search Driver"
          value={searchDriverByName}
          onChange={handleSearch}
          placeholder="Search by name"
          sx={{ minWidth: 300 }}
        />
        
      </Box>
      {/* vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */}


      {/* Drivers Table */}
      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="4px"
        overflow="hidden"
        mt={3}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead style={{ backgroundColor: colors.primary[600] }}>
            <tr className="space-y-4">
              <th
                className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.grey[100] }}
              >
                Name
              </th>
              <th
                className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.grey[100] }}
              >
                Status
              </th>
              <th
                className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.grey[100] }}
              >
                Email
              </th>
              <th
                className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.grey[100] }}
              >
                Phone
              </th>
              <th
                className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.grey[100] }}
              >
                Carrier
              </th>
              <th
                className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.grey[100] }}
              >
                Date Added
              </th>
              <th
                className="px-8 py-4 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.grey[100] }}
              >
                License Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 mt-2">
            {filteredDrivers.map((driver) => (
              <tr
                key={driver.driver_id}
                className="hover:bg-primary-600 transition-colors duration-200"
                style={{ borderBottom: `1px solid ${colors.primary[300]}` }}
              >
                <td
                  className="px-8 py-5 whitespace-nowrap text-sm"
                  style={{ color: colors.grey[100] }}
                >
                  {`${driver.first_name} ${driver.last_name}`}
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <select
                    value={driver.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      let reason = "";
                      if (newStatus === "inactive") {
                        reason = window.prompt(
                          "Please provide a reason for inactivity:",
                          ""
                        );
                      }
                      handleStatusChange(driver.driver_id, newStatus, reason);
                    }}
                    className="px-4 py-2 rounded text-sm"
                    style={{
                      backgroundColor:
                        driver.status === "active"
                          ? colors.greenAccent[700]
                          : driver.status === "inactive"
                          ? colors.redAccent[700]
                          : driver.status === "on_leave"
                          ? colors.orangeAccent[700]
                          : driver.status === "suspended"
                          ? colors.greyAccent[700]
                          : colors.blueAccent[700],
                      color: colors.grey[100],
                      border: "none",
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    
                  </select>
                </td>
                <td
                  className="px-8 py-5 whitespace-nowrap text-sm"
                  style={{ color: colors.grey[100] }}
                >
                  {driver.email}
                </td>
                <td
                  className="px-8 py-5 whitespace-nowrap text-sm"
                  style={{ color: colors.grey[100] }}
                >
                  {driver.contact_phone}
                </td>
                <td
                  className="px-8 py-5 whitespace-nowrap text-sm"
                  style={{ color: colors.grey[100] }}
                >
                  {driver.carrier || "N/A"}
                </td>
                <td
                  className="px-8 py-5 whitespace-nowrap text-sm"
                  style={{ color: colors.grey[100] }}
                >
                  {new Date(driver.created_at).toLocaleDateString()}
                </td>
                <td
                  className="px-8 py-5 whitespace-nowrap text-sm"
                  style={{ color: colors.grey[100] }}
                >
                  {driver.license_type || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Box style={{margin: '2em'}}></Box>

      {/* Statistics Cards */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          p={2}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-2">Total Drivers</h3>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: colors.blueAccent[500],
            }}
          >
            {totalDrivers}
          </p>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          p={2}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-2">Active</h3>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: colors.greenAccent[500],
            }}
          >
            {activeDrivers}
          </p>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          p={2}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-2">Inactive</h3>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: colors.redAccent[500],
            }}
          >
            {inactiveDrivers}
          </p>
        </Box>
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          p={2}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-2">Carriers </h3>
         
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: colors.greenAccent[500],
            }}
          >
            {totalCarriers}
          </p>
        </Box>
        {/* ##################################################################### showing real time */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          p={2}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-2">Current Time</h3>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: colors.blueAccent[500],
            }}
          >
            {currentDateTime}
          </p>
        </Box>
        
      </Box>

      {/* Charts Section */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4} mt={3}>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          p={3}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-4">
            Driver Status Distribution
          </h3>
          <Box height="300px">
            <Pie
              data={statusChartData}
              options={{ maintainAspectRatio: false }}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          p={3}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-4">New Drivers per Month</h3>
          <Box height="300px">
            <Bar
              data={newDriversChartData}
              options={{ maintainAspectRatio: false }}
            />
          </Box>
        </Box>
      </Box>

      {/* Schedule Table Section */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4} mt={3}>
        <Box
          gridColumn="span 12"
          backgroundColor={colors.primary[400]}
          p={3}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-4">Driver Schedule Overview</h3>
          <DriverScheduleTable driversData={drivers} />
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4} mt={3}>
        <Box
          gridColumn="span 12"
          backgroundColor={colors.primary[400]}
          p={3}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-4">Weekly Schedule Timeline</h3>
          <DriverScheduleLineChart driversData={drivers} />
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4} mt={3}>
        <Box
          gridColumn="span 12"
          backgroundColor={colors.primary[400]}
          p={3}
          borderRadius="4px"
        >
          <h3 className="text-lg font-semibold mb-4">Driver Work Schedules</h3>
          <Box height="450px">
            <DriverScheduleGraph driversData={drivers} driversPerPage={5} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriverAvailability;
