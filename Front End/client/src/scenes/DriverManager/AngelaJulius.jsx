import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DasshboardHeader from "../../Components/DasshboardHeader";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DriversTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [expiryFilter, setExpiryFilter] = useState("");
  const [documentType, setDocumentType] = useState("license");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios.get("https://eci-jsons-myf8.vercel.app/drivers")
      .then(response => {
        const today = new Date();
        const data = Array.isArray(response.data) ? response.data : response.data.drivers;
        const updatedDrivers = data.map((driver, index) => {
          const licenseExpiry = new Date(driver.license_expiry);
          const medicalExpiry = new Date(driver.medical_certificate_expiry);
          const trainingExpiry = new Date(driver.training_certificate_expiry);

          const daysToLicenseExpiry = Math.ceil((licenseExpiry - today) / (1000 * 60 * 60 * 24));
          const daysToMedicalExpiry = Math.ceil((medicalExpiry - today) / (1000 * 60 * 60 * 24));
          const daysToTrainingExpiry = Math.ceil((trainingExpiry - today) / (1000 * 60 * 60 * 24));

          return {
            ...driver,
            days_to_expiry: daysToLicenseExpiry,
            days_to_medical_expiry: daysToMedicalExpiry,
            days_to_training_expiry: daysToTrainingExpiry,
            driver_id: driver.driver_id || index + 1
          };
        });
        setDrivers(updatedDrivers);
      })
      .catch(error => {
        console.error("Error fetching drivers:", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setExpiryFilter(event.target.value);
  };

  const filteredDrivers = drivers.filter(driver => {
    const days =
      documentType === "license"
        ? driver.days_to_expiry
        : documentType === "medical"
        ? driver.days_to_medical_expiry
        : documentType === "training"
        ? driver.days_to_training_expiry
        : Infinity;

    return !expiryFilter || days <= expiryFilter;
  });

  // ✅ Updated to reflect compliance for selected document only
  const getComplianceChartData = () => {
    let compliantDrivers = [];

    if (documentType === "license") {
      compliantDrivers = drivers.filter(driver => driver.days_to_expiry > 0);
    } else if (documentType === "medical") {
      compliantDrivers = drivers.filter(driver => driver.days_to_medical_expiry > 0);
    } else if (documentType === "training") {
      compliantDrivers = drivers.filter(driver => driver.days_to_training_expiry > 0);
    }

    const nonCompliantDrivers = drivers.length - compliantDrivers.length;

    return {
      compliantCount: compliantDrivers.length,
      nonCompliantCount: nonCompliantDrivers,
      chartData: {
        labels: ["Compliant", "Non-Compliant"],
        datasets: [
          {
            label: "# of Drivers",
            data: [compliantDrivers.length, nonCompliantDrivers],
            backgroundColor: ["#4caf50", "#f44336"],
            borderColor: ["#388e3c", "#d32f2f"],
            borderWidth: 1,
          },
        ],
      },
    };
  };

  const { compliantCount, nonCompliantCount, chartData } = getComplianceChartData();

  const baseColumns = [
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contact_phone", headerName: "Phone Number", flex: 1 },
  ];

  const licenseColumns = [
    { field: "license_number", headerName: "License No.", flex: 1 },
    { field: "license_type", headerName: "License Type", flex: 1 },
    { field: "license_expiry", headerName: "License Expiry", flex: 1 },
  ];

  const medicalColumns = [
    { field: "medical_certificate_expiry", headerName: "Medical Expiry", flex: 1 },
  ];

  const trainingColumns = [
    { field: "training_certificate_expiry", headerName: "Training Expiry", flex: 1 },
  ];

  const statusColumn = {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: ({ row }) => {
      const isActive = row.status === "active";
      return (
        <Box
          px={1}
          py={0.5}
          borderRadius="4px"
          display="inline-block"
          color={isActive ? colors.greenAccent[100] : colors.redAccent[100]}
          bgcolor={isActive ? colors.greenAccent[700] : colors.redAccent[700]}
          fontWeight="bold"
          textTransform="capitalize"
        >
          {isActive ? <CheckCircleOutlineIcon fontSize="small" /> : <CancelOutlinedIcon fontSize="small" />}
          {row.status}
        </Box>
      );
    },
  };

  let columns = [...baseColumns];
  if (documentType === "license") {
    columns = [...columns, ...licenseColumns];
  } else if (documentType === "medical") {
    columns = [...columns, ...medicalColumns];
  } else if (documentType === "training") {
    columns = [...columns, ...trainingColumns];
  }

  columns.push(statusColumn);

  return (
    <Box m="20px">
      <DasshboardHeader title="DRIVERS" subtitle="Compliance" />

      {/* Document Type Selector */}
      <FormControl sx={{ minWidth: 200, mb: 2, mr: 2 }}>
        <InputLabel id="document-type-label">Document Type</InputLabel>
        <Select
          labelId="document-type-label"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          label="Document Type"
        >
          <MenuItem value="license">License</MenuItem>
          <MenuItem value="medical">Medical Certificate</MenuItem>
          <MenuItem value="training">Training Certificate</MenuItem>
        </Select>
      </FormControl>

      {/* Expiry Filter */}
      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel id="expiry-label">Filter By Expiry</InputLabel>
        <Select
          labelId="expiry-label"
          value={expiryFilter}
          onChange={handleFilterChange}
          label="Filter By Expiry"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
          <MenuItem value={60}>60 Days</MenuItem>
          <MenuItem value={90}>90 Days</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" gap={4} mt={4} flexWrap="wrap">
        {/* Chart + Compliance Text */}
        <Box flex="1" minWidth="300px">
          <Box mb={2}>
            <h3>{documentType.charAt(0).toUpperCase() + documentType.slice(1)} Compliance</h3>
            <p>
              {drivers.length > 0
                ? ((compliantCount / drivers.length) * 100).toFixed(2)
                : 0}% of drivers are compliant with their {documentType} requirements.
            </p>
          </Box>
          <Box>
            <Pie data={chartData} />
          </Box>
        </Box>

        {/* DataGrid Table */}
        <Box flex="3" minWidth="600px" height="75vh"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .name-column--cell": { color: colors.greenAccent[300] },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
          }}
        >
          <DataGrid
            rows={filteredDrivers}
            columns={columns}
            getRowId={(row) => row.driver_id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DriversTable;
