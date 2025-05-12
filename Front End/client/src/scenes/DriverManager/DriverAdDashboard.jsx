import React from "react";
import DriverAvailability  from "./DriverAvailability";
import { Outlet } from "react-router-dom";
import CaroleTillen from "./CaroleTillen";
import ProfitRevenueRates from "./ProfitRevenueRates";
import Compliance from "./Compliance";

const DriverAdDashboard = () => {
  return (
    <>
      {/* <DriverAvailability />
      <Compliance/>
      <CaroleTillen/>
      <ProfitRevenueRates/> */}

     
    <Outlet/>
    </>
  );
};

export default DriverAdDashboard;
 