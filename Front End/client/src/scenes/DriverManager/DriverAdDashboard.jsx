import React from "react";
import DriverAvailability  from "./DriverAvailability";
import DriversTable from "./AngelaJulius";
import CaroleTillen from "./CaroleTillen";
import ProfitRevenueRates from "./ProfitRevenueRates";

const DriverAdDashboard = () => {
  return (
    <>
      <DriverAvailability />
      <DriversTable/>
      <CaroleTillen/>
      <ProfitRevenueRates/>

     
    </>
  );
};

export default DriverAdDashboard;
 