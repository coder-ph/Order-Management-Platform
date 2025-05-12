import React from "react";
import ProfitRevenueRates from "../DriverManager/ProfitRevenueRates";
import LogisticsDashboard from '/src/Components/LogisticsDashboard';
import ShipmentDeliveryOverTime from "../DriverManager/ShipmentDeliveriesOverTime";

const CompanyAnalytics = () => {
  return (
    <>
      <h1>This is Company Analyitics</h1>
      <ProfitRevenueRates/>
      <LogisticsDashboard />
      <ShipmentDeliveryOverTime/>

     
    </>
  );
};

export default CompanyAnalytics;
