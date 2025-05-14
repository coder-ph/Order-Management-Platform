
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [orderResponses, setOrderResponses] = useState([]);
    const [products, setProducts] = useState([]);
  
    const baseURL = 'https://eci-jsons-myf8.vercel.app';
  
    useEffect(() => {
      const fetchData = async () => {
        const [ordersRes, orderItemsRes, orderResponsesRes, productsRes] = await Promise.all([
          axios.get(`${baseURL}/orders`),
          axios.get(`${baseURL}/order_items`),
          axios.get(`${baseURL}/order_responses`),
          axios.get(`${baseURL}/products`)
        ]);
        setOrders(ordersRes.data);
        setOrderItems(orderItemsRes.data);
        setOrderResponses(orderResponsesRes.data);
        setProducts(productsRes.data);
      };
      fetchData();
    }, []);
  
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'DELIVERED' || o.status === 'COMPLETED').length;
    const pendingOrders = orders.filter(o => o.status === 'CONFIRMED' || o.status === 'IN_PROGRESS').length;
    const cancelledOrders = orders.filter(o => o.status === 'CANCELED').length;
  
    const statusData = [
      { name: 'Completed', value: completedOrders },
      { name: 'Pending', value: pendingOrders },
      { name: 'Cancelled', value: cancelledOrders }
    ];
  
    const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];
  
    const orderValueData = orders.map(order => ({
      name: order.order_reference,
      value: order.declared_value
    }));
  
    const topProductCounts = orderItems.reduce((acc, item) => {
      acc[item.product_id] = (acc[item.product_id] || 0) + item.quantity;
      return acc;
    }, {});
  
    const topProducts = Object.entries(topProductCounts).map(([product_id, count]) => {
      const product = products.find(p => p.product_id === product_id);
      return { name: product ? product.name : 'Unknown', value: count };
    }).slice(0, 5);
  
    const driverResponseStats = orderResponses.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {});
  
    const responseData = Object.entries(driverResponseStats).map(([status, count]) => ({
      name: status,
      value: count
    }));
  
    return (
      <div className="p-6 space-y-10">
        <h1 className="text-3xl font-bold text-gray-100">Dashboard Overview</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Orders" value={totalOrders} />
          <StatCard label="Completed Orders" value={completedOrders} />
          <StatCard label="Pending Orders" value={pendingOrders} />
          <StatCard label="Cancelled Orders" value={cancelledOrders} />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ChartCard title="Order Status Breakdown">
            <PieChart width={300} height={300}>
              <Pie data={statusData} dataKey="value" outerRadius={100} label>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartCard>
  
          <ChartCard title="Order Value per Order">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderValueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ChartCard title="Top Ordered Products">
            <BarChart width={400} height={300} data={topProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ChartCard>
  
          <ChartCard title="Driver Responses">
            <PieChart width={300} height={300}>
              <Pie data={responseData} dataKey="value" outerRadius={100} label>
                {responseData.map((entry, index) => (
                  <Cell key={`resp-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartCard>
        </div>
      </div>
    );
  };
  
//   const StatCard = ({ label, value }) => (
//     <div className="bg-white rounded-2xl shadow-md p-6 text-center">
//       <p className="text-gray-500">{label}</p>
//       <h2 className="text-2xl font-bold">{value}</h2>
//     </div>
//   );
const StatCard = ({ label, value }) => (
    <div className="bg-gray-800 p-4 mb-2 rounded-lg shadow flex flex-col items-center justify-center text-center">
      <p className="text-gray-400 p-6">{label}</p>
      <h2 className="text-white text-2xl font-bold">{value}</h2>
    </div>
  );
  
  
  const ChartCard = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">{title}</h3>
      {children}
    </div>
  );
  
  export default Dashboard;
  
  