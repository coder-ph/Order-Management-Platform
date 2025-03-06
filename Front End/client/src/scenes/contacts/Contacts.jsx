import React, { useState, useEffect } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DasshboardHeader from "../../Components/DasshboardHeader";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contacts, setContacts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const API_URL = import.meta.env.VITE_APP_USER_URL;

  const token = localStorage.getItem('token')

  if(!token) {
    throw Error('User not authenticated')
  }
  console.log('token', token)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contacts.");
        }

        const data = await response.json();
        setContacts(data); 
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchContacts();
  }, []);

  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "phone_no",
      headerName: "Phone No",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <DasshboardHeader title="CONTACTS" subtitle="List of Contacts" />
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
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {loading ? (
          <Typography variant="h6" color={colors.greenAccent[500]}>
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="h6" color={colors.redAccent[500]}>
            Error: {error}
          </Typography>
        ) : (
          <DataGrid
            rows={contacts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Contacts;
