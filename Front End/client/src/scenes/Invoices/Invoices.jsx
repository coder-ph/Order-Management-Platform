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

  const API_URL = "https://order-management-platform.onrender.com"
  useEffect(() => {
    const fetchInvoices = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/v1/orders/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch invoices.");
        }

        const data = (await response.json()).data;

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        // Map API response to match DataGrid format
        const formattedInvoices = data.map((invoice) => ({
          id: invoice.order_id, // Using order_id as the unique identifier
          invoice_no: invoice.invoice_no || "N/A",
          billed_phone: invoice.billed_phone || "N/A",
          order_id: invoice.Order?.id || "N/A",
          total_amount: invoice.Order?.total_amount || 0,
          status: invoice.Order?.status || "Pending",
          user_id: invoice.Order?.user_id || "Unknown",
          created_at: invoice.created_at || "N/A",
        }));

        setInvoices(formattedInvoices);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [API_URL]);

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1 },
    { field: "invoice_no", headerName: "Invoice No", flex: 1 },
    { field: "billed_phone", headerName: "Billed Phone", flex: 1 },
    { field: "total_amount", headerName: "Total Amount ($)", flex: 1 },
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography
          color={
            params.row.status === "COMPLETED"
              ? colors.greenAccent[500]
              : params.row.status === "PENDING"
              ? colors.blueAccent[500]
              : colors.redAccent[500]
          }
        >
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
