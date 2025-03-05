import { useParams, useNavigate } from "react-router-dom";
import { mockDataOrders } from "./mockDataOrders";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MainButton } from "../../Components/Buttons/Button";
import "../../assets/styles/OrderDetails.css"; 

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const order = mockDataOrders.find((order) => order.id === parseInt(id));

    if (!order) {
        return <div className="error-message">Order not found</div>;
    }

    return (
        <div className="order-details-container">
            <div className="order-details-card">
                <div className="order-left">
                    <h1 className="order-title">Order Details</h1>

                    {/* Order Status */}
                    <div className="order-status">
                        <p>Order ID: <span>{order.id}</span></p>
                        <p>Status: <span className="badge">{order.status}</span></p>
                        <p>Total Amount: <span>{order.total_amount}</span></p>
                        <p>Invoice status: <span>{order.invoice_status}</span></p>
                    </div>
                    {/* <MainButton style={{ width: "300px", marginLeft: "210px", backgroundColor: "#1f2945", borderRadius: "0px"}}>Assign driver</MainButton> */}

                    {/* Order Items */}
                    <h2 className="order-items-title">Customer Orders</h2>
                    <div className="order-items">
                        {order.order_items.map((item, index) => (
                            <div key={index} className="order-item">
                                <img src={item.image} alt={item.name} className="order-item-image" />
                                <div className="order-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="order-item-brand">{item.brand}</p>
                                    <p>{item.quantity} × ${item.price.toFixed(2)}</p>
                                </div>
                                <p className="order-item-price">${(item.quantity * item.price).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                     {/* Back Button */}
                     <div className="back-navigate">
                     <MainButton onClick={() => navigate(-1)} style={{ backgroundColor: "transparent", border: "2px solid #1f2945", color: "black", cursor: "pointer", width: "100px", borderRadius: "0px", padding: "10px" }}>
                        <IoIosArrowRoundBack style={{ fontSize: "20px", marginRight:"5px", color:"#1f2945" }} />
                        <span>Back</span>
                    </MainButton>
                    </div>
                </div>

                {/* Right Sidebar - Customer Details */}
                <div className="order-right">
                    <h2 className="order-section-title">Customer Detail</h2>
                    <p className="customer-label">Name</p>
                    <p className="customer-info">{order.customer}</p>

                    <p className="customer-label">Email</p>
                    <p className="customer-info">{order.email}</p>

                    <p className="customer-label">Address</p>
                    <p className="customer-info">{order.address}</p>

                    {/* Total & Process Order Button */}
                    <div className="order-total">
                        <div className="total-row">
                            <span>Total</span>
                            <span>${order.total_amount}</span>
                        </div>
                        <MainButton style={{ borderRadius: "5px", backgroundColor: "black", color: "white", width: "200px",marginLeft: "100px"}}>Assign Driver</MainButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
