import React, { useState } from "react";
import { Box, Typography, useTheme, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DasshboardHeader from "../../Components/DasshboardHeader";
import { useNavigate } from "react-router-dom";
import { mockDataOrders } from "./mockDataOrders";


const Orders = () => {
    console.log("Orders taken:", mockDataOrders)

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [orders, setOrders] = useState(mockDataOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusChange = (id, newStatus) => {
        setOrders((prevOrders) =>
        prevOrders.map((order) => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    }

    const handleRowClick = (params) => {
        console.log(params.row)
        setSelectedOrder(params.row);
        setIsModalOpen(true);
        navigate(`/dashboard/orders/${params.id}`);
    }
    
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedOrder(null)
    }
    const handleIdClick = (orderId) => {
        console.log(orderId)
        // navigate(`/dashboard/orders/${orderId}`);
    
    }


    const columns = [
        { 
            field: 'id', 
            headerName: 'Order ID', 
            flex: 1, 
            renderCell: ({ row }) => (
                <Button component="span"  style={{ color: "white"}} onClick={() => handleIdClick(row.id)}>{row.id}</Button>
            ) 
        },
        { 
            field: 'customer', 
            headerName: 'Customer', 
            flex: 1,
        },
        { 
            field: 'order_items', 
            headerName: 'Items', 
            flex: 0.5, 
            valueGetter: (params) => {
                console.log("Row Data:", params.row);  // Debugging check
                console.log("Order Items in DataGrid:", params.row?.order_items);
                return params.row?.order_items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
            }

        },
        { 
            field: 'total_amount', 
            headerName: 'Amount', 
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: ({ row }) => (
                <Select
                value={row.status}
                onChange={(e) => handleStatusChange(row.id, e.target.value)}
                sx={{
                    width:"100%",
                    backgroundColor:
                    row.status === "Processed" ? colors.greenAccent[100] : 
                    row.status === "Pending" ? colors.blueAccent[100] :
                    row.status === "Delivered" ? colors.blueAccent[500] :
                    row.status === "Cancelled" ? colors.redAccent[500] :
                    colors.grey[500],
                    borderRadius: "5px",
                    padding: "5px",
                }}
                >
                    <MenuItem value="Processed">Processed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
                ),
        },
        {
            field: 'invoiceStatus',
            headerName: 'Invoice status',
            renderCell: ({ row }) => (
                <Box
                p="3px"
                width="50%"
                display="flex"
                justifyContent="center"
                margin="auto 20"
                marginTop="15px"
                bgcolor={
                    row.invoices[0]?.status === "Unpaid" ? colors.redAccent[400] : 
                    row.invoices[0]?.status === "Paid"? colors.greenAccent[600] : 
                    colors.blueAccent[700]
                }
                borderRadius="5px"
                >
                    <Typography color="white">{row.invoices[0]?.status}</Typography>
                </Box>
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
                <DataGrid rows={mockDataOrders} columns={columns} onRowClick={handleRowClick}/>
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
                        <Typography><strong>Order ID:</strong> {selectedOrder.id}</Typography>
                        <Typography><strong>Items:</strong> {console.log(selectedOrder) || selectedOrder.order_items.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}</Typography>
                        <Typography><strong>Order Status:</strong> {selectedOrder.status}</Typography>
                        <Typography><strong>Amount:</strong> ${selectedOrder.total_amount}</Typography>
                        <Typography><strong>Invoice Status:</strong> {selectedOrder.invoices?.[0]?.status || "No invoice"}</Typography>
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