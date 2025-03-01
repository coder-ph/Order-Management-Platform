import React, { useState } from "react";
import { Box, Typography, useTheme, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DasshboardHeader from "../../Components/DasshboardHeader";

const mockDataOrders = [
    {id: 1, orderId:"#001001", customer: "Monkey D. Luffy", items: 1, amount: 1000, status: "New Order", driver: "Available", email: "luffy@onepiece.com", phone: "(123) 456-7890", address: "Thousand Sunny, Grand Line", avatar: "https://via.placeholder.com/150"},
    {id: 2, orderId:"#001002", customer: "Roronoa Zoro", items: 5, amount: 8543, status: "New Order", driver: "Busy", email: "zoro@onepiece.com", phone: "(987) 654-3210", address: "Kuraigana Island, East Blue", avatar: "https://via.placeholder.com/150"},
    {id: 3, orderId:"#001003", customer: "Vinsmoke Sanji", items: 4, amount: 1571, status: "New Order", driver: "Not Available", email: "sanji@onepiece.com", phone: "(555) 789-1234", address: "Baratie, East Blue", avatar: "https://via.placeholder.com/150"},
    {id: 4, orderId:"#001004", customer: "Portgas D. Ace", items: 2, amount: 446, status: "Processed", driver: "Available", email: "ace@onepiece.com", phone: "(342) 444-3331", address: "Goa Kingdom, East Blue", avatar: "https://via.placeholder.com/150"},
    {id: 5, orderId:"#001005", customer: "Trafalgar D. Law", items: 3, amount: 989, status: "Processed", driver: " Not Available", email: "traffy@onepiece.com", phone: "(673) 543-2430", address: "Flevance, North Blue", avatar: "https://via.placeholder.com/150"},
    {id: 6, orderId:"#001006", customer: "Nico Robin", items: 12, amount: 33730, status: "New Order", driver: "Busy", email: "nicorobin@onepiece.com", phone: "(896) 675-3490", address: "Ohara, West Blue", avatar: "https://via.placeholder.com/150"},
]

const Orders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState(mockDataOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDriverChange = (id, newDriver) => {
        setOrders((prevOrders) =>
        prevOrders.map((order) => 
            order.id === id ? { ...order, driver: newDriver } : order
        ));
    }

    const handleRowClick = (params) => {
        setSelectedOrder(params.row);
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedOrder(null)
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
                p="3px"
                width="50%"
                display="flex"
                justifyContent="center"
                margin="auto 20"
                marginTop="15px"
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
                <DataGrid rows={orders} columns={columns} onRowClick={handleRowClick}/>
            </Box>
            {/* Order Details Modal */}
            <Dialog open={isModalOpen} onClose={handleModalClose} maxWidth='sm' fullWidth>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <Box>
                        {/* User Info Section */}
                        <Box display="flex" alignItems="center" mb={2} >
                            <Avatar sx={{ width: 56, height: 56, mr: 2 }}>{selectedOrder.customer.charAt(0)}</Avatar>
                            <Box>
                                <Typography variant="h6">{selectedOrder.customer}</Typography>
                                <Typography variant="body2" color="text.secondary">{selectedOrder.email}</Typography>
                                <Typography variant="body2" color="text.secondary">{selectedOrder.phone}</Typography>
                            </Box>
                        </Box>
                        {/* Address Section */}
                        <Box mb={2}>
                            <Typography variant="subtitle1" fontWeight="bold">Address</Typography>
                            <Typography>{selectedOrder.address}</Typography>
                        </Box>
                        {/* Order Details */}
                        <Typography><strong>Order ID:</strong> {selectedOrder.orderId}</Typography>
                        <Typography><strong>Items:</strong> {selectedOrder.items}</Typography>
                        <Typography><strong>Order Status:</strong> {selectedOrder.status}</Typography>
                        <Typography><strong>Amount:</strong> ${selectedOrder.amount}</Typography>
                        <Typography><strong>Driver:</strong> {selectedOrder.driver}</Typography>
                    </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Close</Button>
                </DialogActions>
                </Dialog>
        </Box>
    )
}

export default Orders;