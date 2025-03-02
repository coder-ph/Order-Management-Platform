import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Card, Avatar, TextField, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

const OrderDetails = () => {
    const { customerName } = useParams();
    const [customer, setCustomer] = useState(null)

    useEffect (() => {
        fetch()
        .then(resp => resp.json())
        .then(data => {
            if (data.length > 0) {
                setCustomer(data.find(customer => customer.name === customerName))
            }
        })
        .catch(error => console.error(error))
    }, [customerName])

    if (!customer) return <Typography>Loading...</Typography>

    return (
        <Box flex={1} p={3}>
            <Typography variant="h4">Customer Details</Typography>
            <Typography variant="body2">Home / Manage Orders/ {customer.name}</Typography>

            <Box display="flex" gap={2} mt={2}>
                <Card sx={{ p:2, width: "250px"}}>
                    <Avatar src={customer.photo} sx={{ width: 80, height: 80, mb: 1}} />
                    <Typography variant="h6">{customer.name}</Typography>
                    <Typography variant="body2">{customer.email}</Typography>
                    <Typography variant="body2">{customer.phone}</Typography>
                </Card>
                <Card sx={{ p:2, flex: 1}}>
                    <Typography variant="h6">Address</Typography>
                    <Typography variant="body2">{customer.address}</Typography>
                </Card>
            </Box>
            <Box mt={3}>
                <Typography variant="h6">Order History</Typography>
                <TextField variant="outlined" size="small" placeholder="Search" sx={{ mr: 2}} />
                <Select defaultValue="all" size="small">
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processed">Processed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                </Select>

                {/*Orders table */}
                <Table sx={{ mt: 2}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       {customer.orders.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>
                                <span style={{ padding: "5px 10px", borderRadius:"5px", backgroundColor: getStatusColor(item.status), color: "white"}}>{item.status}</span>
                            </TableCell>
                            <TableCell>
                                <Button component={Link} to={`/orders/${item.id}`} variant="contained">View</Button>
                            </TableCell>
                        </TableRow>
                    ))} 
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}

const getStatusColor = (status) => {
    switch(status) {
        case "Waiting for payment": return "#BEBEBE"
        case "Processed": return "#FFA500"
        case "Cancelled": return "#FF6347"
        case "Shipped": return "#1E90FF"
        case "Delivered": return "#32CD32"
        default: return "#000"
    }
}

export default OrderDetails;