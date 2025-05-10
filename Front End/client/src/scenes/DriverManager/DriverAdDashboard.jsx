import React from "react";
import DriversTable from "./AngelaJulius";
import DriverPerformance from "./CaroleTillen";
import ShipmentsChart from "./ShipmentDeliveries";

const DriverAdDashboard = () => {
  return (
    // Create your components in DriverManager Component
    <>
      {/* <div>Compliance & Certification Analytics Section</div> */}
      {/* <Angela & Julius Component /> */}
      <DriversTable/>
      <DriverPerformance/>
      <ShipmentsChart/>
      {/* <div>Driver Performance Analytics Section</div> */}
      {/* <Carole & Tillen Component /> */}
      {/* <div>Shipment Deliveries Analytics Section</div> */}
      {/* <ShipmentDeliveries Component /> */}



     
    </>
  );
};

export default DriverAdDashboard;
