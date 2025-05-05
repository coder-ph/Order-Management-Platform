import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
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
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const today = new Date();
      let start_date, end_date;

      if (timePeriod === "Today") {
        start_date = end_date = today.toISOString().slice(0, 10);
      } else if (timePeriod === "Last 7 Days") {
        end_date = today.toISOString().slice(0, 10);
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        start_date = lastWeek.toISOString().slice(0, 10);
      } else if (timePeriod === "This Month") {
        start_date = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
        end_date = today.toISOString().slice(0, 10);
      } else if (timePeriod === "Custom Range") {
        start_date = customStartDate;
        end_date = customEndDate;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_USER_SERVER}/driver-performance`, {
          params: {
            start_date,
            end_date,
            min_deliveries: deliveryCountThreshold.min,
            max_deliveries: deliveryCountThreshold.max,
            min_rating: customerRatingThreshold,
            max_avg_delivery_time: avgDeliveryTimeRange.max,
            min_rejection_rate: orderRejectionRateThreshold,
          },
        });
        setPerformanceData(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching driver performance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    timePeriod,
    customStartDate,
    customEndDate,
    deliveryCountThreshold,
    avgDeliveryTimeRange,
    customerRatingThreshold,
    orderRejectionRateThreshold,
  ]);

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
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              value={deliveryCountThreshold.min}
              onChange={(e) => setDeliveryCountThreshold({ ...deliveryCountThreshold, min: Number(e.target.value) })}
            />
            <input
              type="number"
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
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
              className="w-1/2 p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
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
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
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
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
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
            <th className="py-2 px-4 text-white">Name</th>
            <th className="py-2 px-4 text-white">Deliveries</th>
            <th className="py-2 px-4 text-white">Avg Delivery Time</th>
            <th className="py-2 px-4 text-white">Order Acceptance Rate</th>
            <th className="py-2 px-4 text-white">Customer Rating</th>
            <th className="py-2 px-4 text-white">Order Rejection Rate</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {performanceData.map(driver => (
            <tr key={driver.driver_id}>
              <td className="py-2 px-4">{driver.name}</td>
              <td className="py-2 px-4">{driver.deliveries}</td>
              <td className="py-2 px-4">{driver.avg_delivery_time}</td>
              <td className="py-2 px-4">{(driver.order_acceptance_rate * 100).toFixed(1)}%</td>
              <td className="py-2 px-4">{driver.customer_rating.toFixed(1)}</td>
              <td className="py-2 px-4">{(driver.order_rejection_rate * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaroleTillen;
