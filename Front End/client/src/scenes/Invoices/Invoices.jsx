import React, { useState, useEffect } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DasshboardHeader from "../../Components/DasshboardHeader";

const Invoices = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_APP_USER_URL;

  useEffect(() => {
    const fetchInvoices = async () => {
      const token = localStorage.getItem("token");
      try {
       
        if (!token) {
          throw new Error("User not authenticated.");
        }

        console.log("Token:", token); 



const response = await fetch(`${API_URL}/api/v1/orders/invoices`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
  console.log(response)

        console.log("Response status:", response.status); 

        if (!response.ok) {
          throw new Error("Failed to fetch invoices.");
        }

        const data = await response.json();
        console.log("Invoices data:", data); 
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error); 
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const columns = [
    { field: "id", headerName: "Order Id", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
    },
    {
      field: "invoice_no",
      headerName: "Invoice No",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.status}
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <DasshboardHeader title="Invoices" subtitle="List of Invoice Balances" />
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
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
          <DataGrid checkboxSelection rows={invoices} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Invoices;
