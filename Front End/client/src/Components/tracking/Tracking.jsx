import React, { useState } from "react";

export default function DeliveryTracker() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async () => {
    setLoading(true);
    setError(null);

    try {
      
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated.");
      }

      
      const response = await fetch(`/api/track/${trackingNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTrackingData(data);
      } else {
        setError("No tracking information found.");
      }
    } catch (error) {
      setError(error.message || "Failed to fetch tracking information.");
      console.error("Error fetching tracking data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToProducts = () => {
    window.location.href = "/user-products";
  };

  return (
    <div className="tracker bg-[#f5f5f5] min-h-screen p-6 items-center justify-center">
      <button
        className="font-bold p-6 absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-xl hover:bg-blue-700 transition-colors"
        onClick={handleBackToProducts}
      >
        Back to Product List
      </button>

      <div className="pl-80 pt-20">
        <h1>
          <div className="flex bg-white rounded-xl shadow-2xl w-4/5 max-w-6xl h-[80vh] overflow-hidden">
            <div className="bg-white p-6 w-1/3 border-r border-gray-200">
              <h2 className="text-xl font-bold text-black">Delivery Tracker</h2>

              <input
                type="text"
                className="w-full p-2 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Eg 2684958674"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                className="w-full mt-4 bg-blue-600 text-white font-bold p-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleTrack}
                disabled={loading}
              >
                {loading ? "Tracking..." : "Track"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {trackingData && (
              <div className="p-6 w-2/3 overflow-y-auto">
                <h3 className="text-lg font-bold text-white pb-5">
                  You are currently tracking
                </h3>
                <p className="text-2xl font-bold text-white">
                  {trackingData.trackingNumber}
                </p>
                <p className="text-sm text-white">
                  Estimated Date of Delivery: {trackingData.estimatedDelivery}
                </p>
                <div className="mt-4">
                  {trackingData.status.map((step, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-2 ${
                          step.completed === "out"
                            ? "border-blue-600"
                            : step.completed
                            ? "border-yellow-600"
                            : "border-gray-400"
                        } bg-white`}
                      ></div>
                      <div>
                        <p className="font-bold text-white">{step.text}</p>
                        <p className="text-xs text-white">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                  <h4 className="font-bold text-blue-800">Delivery Details</h4>
                  <p className="text-gray-800">
                    {trackingData.recipient.address}
                  </p>
                  <p className="text-gray-800">
                    {trackingData.recipient.phone}
                  </p>
                </div>
                <button
                  className="font-bold w-full mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setTrackingData(null)}
                >
                  Track Another
                </button>
              </div>
            )}
          </div>
        </h1>
      </div>
    </div>
  );
}
