import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DasshboardHeader from "../../Components/DasshboardHeader";
import { useNavigate, useLocation } from "react-router-dom";




const Orders = ({ user }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const location = useLocation();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const storeId = user?.storeId
    const isAdmin = user?.role === "admin"
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect (() => {
        
        const fetchOrders = async () => {
            const token = localStorage.getItem("token") || user?.token;
            console.log(token)
            setLoading(true)
            setError(null)
            
            try {
                if (!token) {
                    console.error("User not authenticated redirecting to login.");
                    // navigate("/login");
                    return;
                }
                
                console.log("Token:", token);
                
                let url = `https://order-management-platform.onrender.com/api/v1/orders`;
                
                console.log("Fetching orders from:", url);
    
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
    
                console.log("Response status:", response);
    
                if (!response) {
                    throw new Error("Failed to fetch orders.");
                }
    
                const data = await response.json();
                console.log("Orders data:", data);
    
                if (data?.data) {
                    const formattedOrders = data.data.map(order => ({
                        id: order.id,
                        customer: order.user_id,
                        order_items: order.order_items,
                        total_amount: order.total_amount,
                        status: order.status,
                        assignedDriver: order.assignedDriver ? order.assignedDriver.name : "Not Assigned",
                    }));
                    setOrders(formattedOrders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, [isAdmin, storeId, user?.token]);

    
    useEffect(() => {
        if (location.state?.updatedOrder) {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === location.state.updatedOrder.id
                    ? { ...order, assignedDriver: location.state.updatedOrder.assignedDriver }
                    : order
                )
            );
        }
    }, [location.state?.updatedOrder, setOrders]); 

    

    const handleStatusChange = (id, newStatus) => {
        setOrders((prevOrders) =>
        prevOrders.map((order) => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    }

    const handleRowClick = (params) => {
          console.log(params)
          console.log(params.id)
        const selectedOrder = orders.find(order => order.id === params.id);
        setIsModalOpen(true);
        navigate(`/dashboard/orders/${params.id}`, { state: { order: selectedOrder } });
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedOrder(null)
    }

    const order_status = {
        COMPLETE: "COMPLETED",
        PENDING: "PENDING",
        IN_PROGRESS: "IN PROGRESS",
        CANCELLED: "CANCELLED",
        REJECTED: "REJECTED",
    }

    


    const columns = [
        { 
            field: 'id', 
            headerName: 'Order ID', 
            flex: 1, 
            renderCell: ({ row }) => (
                <Button style={{ color: "#a3a3a3" }}component="span" onClick={() => handleRowClick(row.id)}>{row.id}</Button>
            ) 
        },
        { 
            field: 'order_items', 
            headerName: 'Items', 
            flex: 0.5, 
            valueGetter: (params) => {
                const items = params.row?.order_items;
                if (!Array.isArray(items)) return 0; 
                return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
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
                    color:
                    row.status === "COMPLETED" ? colors.greenAccent[500] :
                    row.status === "PENDING" ? colors.blueAccent[100] :
                    row.status === "IN PROGRESS" ? colors.blueAccent[500] :
                    row.status === "CANCELLED" ? colors.redAccent[500] :
                    row.status === "REJECTED" ? colors.grey[500] : 
                    colors.grey[500],
                    borderRadius: "5px",
                    padding: "5px",
                }}
                >
                    <MenuItem value={order_status.COMPLETE}>Completed</MenuItem>
                    <MenuItem value={order_status.PENDING}>Pending</MenuItem>
                    <MenuItem value={order_status.IN_PROGRESS}>In progress</MenuItem>
                    <MenuItem value={order_status.CANCELLED}>Cancelled</MenuItem>
                    <MenuItem value={order_status.REJECTED}>Rejected</MenuItem>
                </Select>
                ),
        },
        { 
            field: 'assignedDriver', 
            headerName: 'Assigned Driver', 
            flex: 1
        }
    ]
    return (
        <Box m="20px">
            <DasshboardHeader 
            title={isAdmin ? "MY STORE ORDERS" : "ALL ORDERS"}
            subtitle={isAdmin ? "Manage Your Store's Orders" : "View All Orders"}
             />
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
                        <Typography><strong>Order ID:</strong> {selectedOrder.id}</Typography>
                        <Typography><strong>Items:</strong> {console.log(selectedOrder) || selectedOrder.order_items.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}</Typography>
                        <Typography><strong>Order Status:</strong> {selectedOrder.status}</Typography>
                        <Typography><strong>Amount:</strong> ${selectedOrder.total_amount}</Typography>
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
