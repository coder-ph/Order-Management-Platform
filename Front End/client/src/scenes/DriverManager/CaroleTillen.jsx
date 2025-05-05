import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const mockDriversData = [
  {
    id: 1,
    name: "Driver A",
    deliveries: 15,
    avgDeliveryTime: 35, // minutes
    orderAcceptanceRate: 0.9,
    customerRating: 4.7,
    orderRejectionRate: 0.1,
  },
  {
    id: 2,
    name: "Driver B",
    deliveries: 5,
    avgDeliveryTime: 50,
    orderAcceptanceRate: 0.7,
    customerRating: 4.2,
    orderRejectionRate: 0.3,
  },
  {
    id: 3,
    name: "Driver C",
    deliveries: 20,
    avgDeliveryTime: 30,
    orderAcceptanceRate: 0.95,
    customerRating: 4.9,
    orderRejectionRate: 0.05,
  },
];

const timePeriods = ["Today", "Last 7 Days", "This Month", "Custom Range"];

const CaroleTillen = () => {
  const [timePeriod, setTimePeriod] = useState("Today");
  const [deliveryCountThreshold, setDeliveryCountThreshold] = useState({ min: 0, max: 100 });
  const [avgDeliveryTimeRange, setAvgDeliveryTimeRange] = useState({ min: 0, max: 120 });
  const [customerRatingThreshold, setCustomerRatingThreshold] = useState(4.5);
  const [orderRejectionRateThreshold, setOrderRejectionRateThreshold] = useState(0.2);

  const filteredDrivers = mockDriversData.filter((driver) => {
    return (
      driver.deliveries >= deliveryCountThreshold.min &&
      driver.deliveries <= deliveryCountThreshold.max &&
      driver.avgDeliveryTime >= avgDeliveryTimeRange.min &&
      driver.avgDeliveryTime <= avgDeliveryTimeRange.max &&
      driver.customerRating >= customerRatingThreshold &&
      driver.orderRejectionRate <= orderRejectionRateThreshold
    );
  });

  // Chart data for Bar chart
  const chartData = {
    labels: filteredDrivers.map(driver => driver.name),
    datasets: [
      {
        label: 'Deliveries',
        data: filteredDrivers.map(driver => driver.deliveries),
        backgroundColor: '#4CAF50', // Green
      },
      {
        label: 'Avg Delivery Time (min)',
        data: filteredDrivers.map(driver => driver.avgDeliveryTime),
        backgroundColor: '#FF9800', // Orange
      },
      {
        label: 'Customer Rating',
        data: filteredDrivers.map(driver => driver.customerRating),
        backgroundColor: '#2196F3', // Blue
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-white mb-6">Filtered Driver Data</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-medium text-white">Time Period:</label>
          <select
            className="w-full mt-2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {timePeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-white">Delivery Count Threshold (min):</label>
          <div className="flex gap-4">
            <input
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              type="number"
              value={deliveryCountThreshold.min}
              onChange={(e) => setDeliveryCountThreshold({ ...deliveryCountThreshold, min: Number(e.target.value) })}
            />
            <input
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              type="number"
              value={deliveryCountThreshold.max}
              onChange={(e) => setDeliveryCountThreshold({ ...deliveryCountThreshold, max: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-medium text-white">Average Delivery Time Range (min):</label>
          <div className="flex gap-4">
            <input
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              type="number"
              value={avgDeliveryTimeRange.min}
              onChange={(e) => setAvgDeliveryTimeRange({ ...avgDeliveryTimeRange, min: Number(e.target.value) })}
            />
            <input
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              type="number"
              value={avgDeliveryTimeRange.max}
              onChange={(e) => setAvgDeliveryTimeRange({ ...avgDeliveryTimeRange, max: Number(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-white">Customer Rating Threshold:</label>
          <input
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={customerRatingThreshold}
            onChange={(e) => setCustomerRatingThreshold(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-white">Order Rejection Rate Threshold:</label>
        <input
          className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={orderRejectionRateThreshold}
          onChange={(e) => setOrderRejectionRateThreshold(Number(e.target.value))}
        />
      </div>

      <div className="mb-6">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      <table className="w-full table-auto border-collapse border border-gray-700 mb-6">
        <thead className="bg-purple-600">
          <tr>
            <th className="py-2 px-4 text-white">Name</th>
            <th className="py-2 px-4 text-white">Deliveries</th>
            <th className="py-2 px-4 text-white">Avg Delivery Time (min)</th>
            <th className="py-2 px-4 text-white">Order Acceptance Rate</th>
            <th className="py-2 px-4 text-white">Customer Rating</th>
            <th className="py-2 px-4 text-white">Order Rejection Rate</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {filteredDrivers.map((driver) => (
            <tr key={driver.id}>
              <td className="py-2 px-4">{driver.name}</td>
              <td className="py-2 px-4">{driver.deliveries}</td>
              <td className="py-2 px-4">{driver.avgDeliveryTime}</td>
              <td className="py-2 px-4">{(driver.orderAcceptanceRate * 100).toFixed(1)}%</td>
              <td className="py-2 px-4">{driver.customerRating.toFixed(1)}</td>
              <td className="py-2 px-4">{(driver.orderRejectionRate * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaroleTillen;
