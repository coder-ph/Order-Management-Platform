import { useParams, useNavigate } from 'react-router-dom';
import { mockDataOrders } from './mockDataOrders';
import { IoIosArrowRoundBack } from "react-icons/io";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const order = mockDataOrders.find(order => order.id === parseInt(id));

    if (!order) {
        return <div className="text-red-500">Order not found</div>;
    }
    return (
        <div className='container mx-auto p-6 bg-white shadow-lg rounded-lg'>
            <h1 className='text-2x1 font-bold mb-4'>Order Details</h1>
            <div className='grid grid-cols-3 gap-4'>
                <div className='p-4 border rounded-lg'>
                    <h2 className='text-lg font-bold mb-2'>Order Information</h2>
                    <p>Order ID: {order.id}</p>
                    <p>Status: {order.status}</p>
                    <p>Total Amount: {order.total_amount}</p>
                    <p>Invoice status: {order.invoice_status}</p>
                </div>
                <div>
                    <button>Assign Drivers</button>
                </div>

                {/* Order items  */}
                <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                <div className="space-y-4">
                    {order.order_items.map((item, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="ml-4 flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-gray-500 text-sm">{item.brand}</p>
                                <p className="text-gray-700 text-sm">{item.quantity} × ${item.price.toFixed(2)}</p>
                            </div>
                            <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                            </div>
                        ))}
                        </div>

                <button onClick={() => navigate(-1)} className='mt-6 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'>
                    <IoIosArrowRoundBack />Back to Orders
                </button>

                {/* Customer Details Section */}
                <div className='p-4 border rounded-lg'>
                    <h2 className='text-lg font-bold mb-2'>Customer Information</h2>
                    <p>Name: {order.customer}</p>
                    <p>Email: {order.email}</p>
                    <p>Email: {order.phone}</p>
                    <p>Address: {order.address}</p>
                </div>
                <button>On Submit</button>
                


            </div>
        </div>
    )
}

export default OrderDetails;