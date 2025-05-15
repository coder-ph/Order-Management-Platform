import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const OrderStatusMetrics = () => {
  const [statusData, setStatusData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  useEffect(() => {
    fetchOrderStatusData();
  }, []);

  const fetchOrderStatusData = async () => {
    try {
      const response = await fetch('http://localhost:5555/orders/status-metrics');
      const data = await response.json();
      setStatusData([
        { name: 'Received', value: data.received },
        { name: 'Delivered', value: data.delivered },
        { name: 'Returned', value: data.returned }
      ]);
    } catch (error) {
      console.error('Error fetching order status data:', error);
      // Set some dummy data for testing
      setStatusData([
        { name: 'Received', value: 150 },
        { name: 'Delivered', value: 100 },
        { name: 'Returned', value: 20 }
      ]);
    }
  };

  return (
    <div className="order-status">
      <h2>Order Status Distribution</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={statusData}
          cx={200}
          cy={150}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default OrderStatusMetrics;