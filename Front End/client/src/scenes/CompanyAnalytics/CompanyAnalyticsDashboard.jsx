import React from "react";
import ProfitRevenueRates from "../DriverManager/ProfitRevenueRates";
import LogisticsDashboard from '/src/Components/LogisticsDashboard';
import ShipmentDeliveryOverTime from "../DriverManager/ShipmentDeliveriesOverTime";
import OrdersOverTime from './OrdersOverTime';  // Create this component
import OrderStatusMetrics from './OrderStatusMetrics';  // Create this component

const CompanyAnalyticsDashboard = () => {
  return (
    <div className="analytics-dashboard">
      <h1>Company Analytics Dashboard</h1>
      
      <div className="orders-section">
        <OrdersOverTime />
        <OrderStatusMetrics />
      </div>

      <div className="logistics-section">
        <ProfitRevenueRates />
        <LogisticsDashboard />
        <ShipmentDeliveryOverTime />
      </div>
    </div>
  );
};

export default CompanyAnalyticsDashboard;
