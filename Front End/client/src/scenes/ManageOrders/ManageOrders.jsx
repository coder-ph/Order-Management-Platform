import React, { useState } from "react";
import { Box, Typography, useTheme, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DasshboardHeader from "../../Components/DasshboardHeader";

const mockDataOrders = [
    {id: 1, orderId:"#001001", customer: "Monkey D. Luffy", items: 1, amount: 1000, status: "New Order", driver: "Available"},
    {id: 2, orderId:"#001002", customer: "Roronoa Zoro", items: 5, amount: 8543, status: "New Order", driver: "Busy"},
    {id: 3, orderId:"#001003", customer: "Vinsmoke Sanji", items: 4, amount: 1571, status: "New Order", driver: "Not Available"},
    {id: 4, orderId:"#001004", customer: "Portgas D. Ace", items: 2, amount: 446, status: "Processed", driver: "Available"},
    {id: 5, orderId:"#001005", customer: "Trafalgar D. Law", items: 3, amount: 989, status: "Processed", driver: " Not Available"},
    {id: 6, orderId:"#001006", customer: "Nico Robin", items: 12, amount: 33730, status: "New Order", driver: "Busy"},
]

const Orders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState(mockDataOrders);

    const handleDriverChange = (id, newDriver) => {
        setOrders((prevOrders) =>
        prevOrders.map((order) => 
            order.id === id ? { ...order, driver: newDriver } : order
        ));
    }


    const columns = [
        { field: 'orderId', headerName: 'Order ID', flex: 1 },
        { field: 'customer', headerName: 'Customer', flex: 1 },
        { field: 'items', headerName: 'Items', flex: 0.5 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: ({ row }) => (
                <Box
                p="5px"
                display="flex"
                justifyContent="center"
                bgcolor={
                    row.status === "New Order"
                    ? colors.blueAccent[700]
                    : row.status === "Processed"
                    ? colors.greenAccent[600]
                    : row.status === "Cancelled"
                    ? colors.redAccent[100]
                    : colors.redAccent[400]
                }
                borderRadius="5px"
                >
                    <Typography color="white">{row.status}</Typography>
                </Box>
            ),
        },
        {
            field: 'driver',
            headerName: 'Driver Availability',
            flex: 1,
            renderCell: ({ row }) => (
                <Select
                value={row.driver}
                variant="outlined"
                size="small"
                sx={{ minWidth: 120 }}
                onChange={(e) => handleDriverChange(row.id, e.target.value)}
                >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Busy">Busy</MenuItem>
                    <MenuItem value="Not Available">Not Available</MenuItem>
                </Select>
            ),
        },
    ]
    return (
        <Box m="20px">
            <DasshboardHeader title="ORDERS" subtitle="Managing Orders & Assigning Drivers " />
            <Box
            m="40px 0 0 0"
            height="75vh"
            width="100%"
            overflow="hidden"
            sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
            }}
            >
                <DataGrid rows={orders} columns={columns} />
            </Box>
        </Box>
    )
}

export default Orders;