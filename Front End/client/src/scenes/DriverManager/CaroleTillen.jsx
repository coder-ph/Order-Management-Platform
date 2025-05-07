import React, { useState, useEffect } from "react";
import axios from "axios";

const CaroleTillen = () => {
  const [drivers, setDrivers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [timePeriod, setTimePeriod] = useState("today");
  const [deliveryThreshold, setDeliveryThreshold] = useState(0);
  const [avgDeliveryTimeRange, setAvgDeliveryTimeRange] = useState([0, 60]); // in minutes
  const [ratingThreshold, setRatingThreshold] = useState(4.5);

  useEffect(() => {
    // Fetch drivers
    axios
      .get(`${import.meta.env.VITE_APP_USER_SERVER}/api/v1/drivers`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data.drivers;
        const today = new Date();
        const updatedDrivers = data.map((driver) => {
          const expiryDate = new Date(driver.license_expiry);
          const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
          return {
            ...driver,
            days_to_expiry: daysToExpiry,
          };
        });
        setDrivers(updatedDrivers);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching drivers.");
        setLoading(false);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch deliveries
    axios
      .get(`${import.meta.env.VITE_APP_USER_SERVER}/api/v1/deliveries`, {
        params: { timePeriod },
      })
      .then((response) => {
        setDeliveries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching delivery data:", error);
      });
  }, [timePeriod]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Process drivers with performance metrics
  const processedDrivers = drivers.map((driver) => {
    const driverDeliveries = deliveries.filter((d) => d.driver_id === driver.driver_id);
    const totalDeliveries = driverDeliveries.length;
    const avgDeliveryTime =
      driverDeliveries.reduce((sum, d) => sum + d.delivery_time, 0) / totalDeliveries || 0;
    const acceptanceRate =
      (driverDeliveries.filter((d) => d.status === "accepted").length / totalDeliveries) * 100 || 0;
    const rejectionRate = 100 - acceptanceRate;
    const avgRating =
      driverDeliveries.reduce((sum, d) => sum + d.customer_rating, 0) / totalDeliveries || 0;

    return {
      ...driver,
      totalDeliveries,
      avgDeliveryTime,
      acceptanceRate,
      rejectionRate,
      avgRating,
    };
  });

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <div className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold mb-8 text-center">Driver Performance & Utilization</h3>

        {/* Filters */}
        <div className="filters grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <label className="block">
            <span className="text-sm font-medium">Time Period:</span>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="today">Today</option>
              <option value="last7days">Last 7 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium">Delivery Count Threshold:</span>
            <input
              type="number"
              value={deliveryThreshold}
              onChange={(e) => setDeliveryThreshold(Number(e.target.value))}
              className="mt-1 block w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Avg Delivery Time Range (minutes):</span>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="number"
                value={avgDeliveryTimeRange[0]}
                onChange={(e) =>
                  setAvgDeliveryTimeRange([Number(e.target.value), avgDeliveryTimeRange[1]])
                }
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span>-</span>
              <input
                type="number"
                value={avgDeliveryTimeRange[1]}
                onChange={(e) =>
                  setAvgDeliveryTimeRange([avgDeliveryTimeRange[0], Number(e.target.value)])
                }
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium">Customer Rating Threshold:</span>
            <input
              type="number"
              step="0.1"
              value={ratingThreshold}
              onChange={(e) => setRatingThreshold(Number(e.target.value))}
              className="mt-1 block w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead className="bg-green-700">
              <tr>
                <th className="py-3 px-4 text-white text-left">First Name</th>
                <th className="py-3 px-4 text-white text-left">Last Name</th>
                <th className="py-3 px-4 text-white text-left">License Expiry</th>
                <th className="py-3 px-4 text-white text-left">Days to Expiry</th>
                <th className="py-3 px-4 text-white text-left">Total Deliveries</th>
                <th className="py-3 px-4 text-white text-left">Avg Delivery Time (min)</th>
                <th className="py-3 px-4 text-white text-left">Acceptance Rate (%)</th>
                <th className="py-3 px-4 text-white text-left">Rejection Rate (%)</th>
                <th className="py-3 px-4 text-white text-left">Avg Rating</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {drivers.map((driver) => {
                const driverData =
                  processedDrivers.find((d) => d.driver_id === driver.driver_id) || {};
                return (
                  <tr
                    key={driver.driver_id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 px-4">{driver.first_name}</td>
                    <td className="py-3 px-4">{driver.last_name}</td>
                    <td className="py-3 px-4">{driver.license_expiry || "N/A"}</td>
                    <td className="py-3 px-4">{driverData.days_to_expiry ?? "N/A"}</td>
                    <td className="py-3 px-4">{driverData.totalDeliveries ?? "N/A"}</td>
                    <td className="py-3 px-4">
                      {driverData.avgDeliveryTime !== undefined
                        ? driverData.avgDeliveryTime.toFixed(2)
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {driverData.acceptanceRate !== undefined
                        ? driverData.acceptanceRate.toFixed(2)
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {driverData.rejectionRate !== undefined
                        ? driverData.rejectionRate.toFixed(2)
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {driverData.avgRating !== undefined
                        ? driverData.avgRating.toFixed(2)
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CaroleTillen;