import React from "react";
import DriverAvailability  from "./DriverAvailability";
import { Outlet } from "react-router-dom";
import CaroleTillen from "./CaroleTillen";
import ProfitRevenueRates from "./ProfitRevenueRates";

const DriverAdDashboard = () => {
  return (
    <>
      <DriverAvailability />
      <DriversTable/>
      <CaroleTillen/>
      <ProfitRevenueRates/>

     
    <Outlet/>
    </>
  );
};

export default DriverAdDashboard;
 