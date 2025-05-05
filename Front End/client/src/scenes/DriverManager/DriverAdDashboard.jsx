import React from "react";
import CaroleTillen from "./CaroleTillen";

const DriverAdDashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-6">
      {/* Optional header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Driver Performance Dashboard</h1>
        <p className="text-lg text-gray-400">Track the performance and utilization of your delivery drivers</p>
      </header>

      {/* Main content */}
      <CaroleTillen />
    </div>
  );
};

export default DriverAdDashboard;
