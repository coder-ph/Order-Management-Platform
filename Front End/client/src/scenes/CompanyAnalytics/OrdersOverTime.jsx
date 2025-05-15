import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OrdersOverTime = () => {
  const [timeframe, setTimeframe] = useState('month'); // 'day', 'week', 'month'
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetch order data based on timeframe
    fetchOrderData(timeframe);
  }, [timeframe]);

  const fetchOrderData = async (period) => {
    try {
      const response = await fetch(`http://localhost:5555/orders/analytics/${period}`);
      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
      // Set some dummy data for testing
      setOrderData([
        { date: '2024-01', orders: 65 },
        { date: '2024-02', orders: 85 },
        { date: '2024-03', orders: 120 },
      ]);
    }
  };

  return (
    <div className="orders-chart">
      <h2>Cumulative Orders</h2>
      <div className="timeframe-selector">
        <button onClick={() => setTimeframe('day')}>Daily</button>
        <button onClick={() => setTimeframe('week')}>Weekly</button>
        <button onClick={() => setTimeframe('month')}>Monthly</button>
      </div>
      <LineChart width={600} height={300} data={orderData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default OrdersOverTime;