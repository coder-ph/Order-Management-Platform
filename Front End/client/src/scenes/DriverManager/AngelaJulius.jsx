import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Box, MenuItem, Select, FormControl, InputLabel, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import DasshboardHeader from "../../Components/DasshboardHeader";

const DriversTable = () => {

  const [drivers, setDrivers] = useState([]);
  const [expiryFilter, setExpiryFilter] = useState("")
  const [documentType, setDocumentType] = useState("license"); 


 
  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/drivers")
      .then(response => {
        console.log("response: ", response);
        const today = new Date();
        const data = Array.isArray(response.data) ? response.data : response.data.drivers;
        const updatedDrivers = data.map((driver, index) => {
          const licenseExpiry = new Date(driver.license_expiry);
          const medicalExpiry = new Date(driver.medical_certificate_expiry);

          const daysToLicenseExpiry = Math.ceil((licenseExpiry - today) / (1000 * 60 * 60 * 24));
          const daysToMedicalExpiry = Math.ceil((medicalExpiry - today) / (1000 * 60 * 60 * 24));

          return {
            ...driver,
            days_to_expiry: daysToLicenseExpiry,
            days_to_medical_expiry: daysToMedicalExpiry,
            driver_id: driver.driver_id || index + 1
          }
        });
        console.log("Fetched drivers: ", updatedDrivers);
        setDrivers(updatedDrivers);
      })
      .catch(error => {
        console.error("Error fetching drivers:", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setExpiryFilter(event.target.value);
  }

  // const filteredDrivers = expiryFilter
  //   ? drivers.filter((driver) => driver.days_to_expiry <= expiryFilter)
  //   : drivers;
  const filteredDrivers = drivers.filter(driver => {
    const days =
      documentType === "license"
        ? driver.days_to_expiry
        : documentType === "medical"
        ? driver.days_to_medical_expiry
        : Infinity; 
  
    return !expiryFilter || days <= expiryFilter;
  });


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const baseColumns = [
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contact_phone",
      headerName: "Phone Number",
      flex: 1,
    },
  ];
  
  const licenseColumns = [
    {
      field: "license_number",
      headerName: "License No.",
      flex: 1,
    },
    {
      field: "license_type",
      headerName: "License Type",
      flex: 1,
    },
    {
      field: "license_expiry",
      headerName: "License Expiry",
      flex: 1,
    },
  ];
  
  const medicalColumns = [
    {
      field: "medical_certificate_expiry",
      headerName: "Medical Expiry",
      flex: 1,
    },
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
  
  // Select columns based on document type
  let columns = [...baseColumns];
  
  if (documentType === "license") {
    columns = [...columns, ...licenseColumns];
  } else if (documentType === "medical") {
    columns = [...columns, ...medicalColumns];
  }
  
  columns.push(statusColumn);
  



  return (
    <Box m="20px">
      <DasshboardHeader title="DRIVERS" subtitle="Compliance" />
      <FormControl sx={{ minWidth: 200, mb: 2, mr: 2 }}>
        <InputLabel>Document Type</InputLabel>
        <Select value={documentType} onChange={(e) => setDocumentType(e.target.value)} label="Document Type">
          <MenuItem value="license">License</MenuItem>
          <MenuItem value="medical">Medical Certificate</MenuItem>          
        </Select>
      </FormControl>

      <FormControl sx={{minWidth: 200, mb: 2}}>
        <InputLabel>Filter By Expiry</InputLabel>
        <Select value={expiryFilter} onChange={handleFilterChange} label="filter by expiry">
          <MenuItem value="">All</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
          <MenuItem value={60}>60 Days</MenuItem>
          <MenuItem value={90}>90 Days</MenuItem>
        </Select>
      </FormControl>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none", backgroundColor: colors.blueAccent[700]
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
  );
   DasshboardHeader;
};
export default DriversTable;

