import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const timePeriods = ["Today", "Last 7 Days", "This Month", "Custom Range"];

const CaroleTillen = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState("Today");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [deliveryCountThreshold, setDeliveryCountThreshold] = useState({ min: 0, max: 100 });
  const [avgDeliveryTimeRange, setAvgDeliveryTimeRange] = useState({ min: 0, max: 120 });
  const [customerRatingThreshold, setCustomerRatingThreshold] = useState(4.5);
  const [orderRejectionRateThreshold, setOrderRejectionRateThreshold] = useState(0.2);

  useEffect(() => {
    // Dummy Data (to replace the API call)
    const dummyData = [
      {
        driver_id: 1,
        name: "Driver 1",
        deliveries: 20,
        avg_delivery_time: 35,
        order_acceptance_rate: 0.95,
        customer_rating: 4.8,
        order_rejection_rate: 0.05,
      },
      {
        driver_id: 2,
        name: "Driver 2",
        deliveries: 18,
        avg_delivery_time: 40,
        order_acceptance_rate: 0.92,
        customer_rating: 4.6,
        order_rejection_rate: 0.08,
      },
      {
        driver_id: 3,
        name: "Driver 3",
        deliveries: 15,
        avg_delivery_time: 50,
        order_acceptance_rate: 0.89,
        customer_rating: 4.7,
        order_rejection_rate: 0.12,
      },
    ];

    setPerformanceData(dummyData); // Set the dummy data
    setLoading(false); // Simulate loading completion
  }, [timePeriod, customStartDate, customEndDate, deliveryCountThreshold, avgDeliveryTimeRange, customerRatingThreshold, orderRejectionRateThreshold]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const chartData = {
    labels: performanceData.map(driver => driver.name),
    datasets: [
      {
        label: "Deliveries",
        data: performanceData.map(driver => driver.deliveries),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Avg Delivery Time (min)",
        data: performanceData.map(driver => driver.avg_delivery_time),
        backgroundColor: "#FF9800",
      },
      {
        label: "Customer Rating",
        data: performanceData.map(driver => driver.customer_rating),
        backgroundColor: "#2196F3",
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-white mb-6">Filtered Driver Data</h3>

      {/* Filter UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-medium text-white">Time Period:</label>
          <select
            className="w-full mt-2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {timePeriods.map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>

        {/* Custom Date Range Inputs */}
        {timePeriod === "Custom Range" && (
          <>
            <div>
              <label className="block text-lg font-medium text-white">Start Date:</label>
              <input
                type="date"
                className="w-full mt-2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-white">End Date:</label>
              <input
                type="date"
                className="w-full mt-2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {/* Other filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-medium text-white">Delivery Count Threshold (min - max):</label>
          <div className="flex gap-4">
            <input
              type="number"
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-black"
              value={deliveryCountThreshold.min}
              onChange={(e) => setDeliveryCountThreshold({ ...deliveryCountThreshold, min: Number(e.target.value) })}
            />
            <input
              type="number"
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-black"
              value={deliveryCountThreshold.max}
              onChange={(e) => setDeliveryCountThreshold({ ...deliveryCountThreshold, max: Number(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-white">Avg Delivery Time Range (min):</label>
          <div className="flex gap-4">
            <input
              type="number"
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-black"
              value={avgDeliveryTimeRange.min}
              onChange={(e) => setAvgDeliveryTimeRange({ ...avgDeliveryTimeRange, min: Number(e.target.value) })}
            />
            <input
              type="number"
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              value={avgDeliveryTimeRange.max}
              onChange={(e) => setAvgDeliveryTimeRange({ ...avgDeliveryTimeRange, max: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-medium text-white">Customer Rating Threshold:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-black"
            value={customerRatingThreshold}
            onChange={(e) => setCustomerRatingThreshold(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white">Order Rejection Rate Threshold:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-black"
            value={orderRejectionRateThreshold}
            onChange={(e) => setOrderRejectionRateThreshold(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      {/* Table */}
      <table className="w-full table-auto border-collapse border border-gray-700 mb-6">
        <thead className="bg-purple-600">
          <tr>
            <th className="py-2 px-4 text-white text-left">Name</th>
            <th className="py-2 px-4 text-white text-right">Deliveries</th>
            <th className="py-2 px-4 text-white text-right">Avg Delivery Time</th>
            <th className="py-2 px-4 text-white text-right">Order Acceptance Rate</th>
            <th className="py-2 px-4 text-white text-right">Customer Rating</th>
            <th className="py-2 px-4 text-white text-right">Order Rejection Rate</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {performanceData.map(driver => (
            <tr key={driver.driver_id}>
              <td className="py-2 px-4">{driver.name}</td>
              <td className="py-2 px-4 text-right">{driver.deliveries}</td>
              <td className="py-2 px-4 text-right">{driver.avg_delivery_time}</td>
              <td className="py-2 px-4 text-right">{(driver.order_acceptance_rate * 100).toFixed(1)}%</td>
              <td className="py-2 px-4 text-right">{driver.customer_rating.toFixed(1)}</td>
              <td className="py-2 px-4 text-right">{(driver.order_rejection_rate * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaroleTillen;
