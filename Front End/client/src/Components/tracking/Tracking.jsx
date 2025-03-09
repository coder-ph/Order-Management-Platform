import React, { useState } from "react";

export default function DeliveryTracker() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for order IDs and their corresponding tracking data
  const mockOrders = [
    {
      orderId: "2684958674",
      datePlaced: "2023-12-10",
      trackingData: {
        trackingNumber: "2684958674",
        estimatedDelivery: "2023-12-15",
        status: [
          {
            text: "Order Placed",
            date: "2023-12-10",
            completed: true,
          },
          {
            text: "Order Shipped",
            date: "2023-12-12",
            completed: true,
          },
          {
            text: "Out for Delivery",
            date: "2023-12-14",
            completed: "out",
          },
          {
            text: "Delivered",
            date: "2023-12-15",
            completed: false,
          },
        ],
        recipient: {
          address: "123 Main St, Nairobi, Kenya",
          phone: "+254 712 345 678",
        },
      },
    },
    {
      orderId: "1234567890",
      datePlaced: "2023-12-05",
      trackingData: {
        trackingNumber: "1234567890",
        estimatedDelivery: "2023-12-10",
        status: [
          {
            text: "Order Placed",
            date: "2023-12-05",
            completed: true,
          },
          {
            text: "Order Shipped",
            date: "2023-12-07",
            completed: true,
          },
          {
            text: "Out for Delivery",
            date: "2023-12-09",
            completed: "out",
          },
          {
            text: "Delivered",
            date: "2023-12-10",
            completed: false,
          },
        ],
        recipient: {
          address: "456 Elm St, Nairobi, Kenya",
          phone: "+254 723 456 789",
        },
      },
    },
    {
      orderId: "9876543210",
      datePlaced: "2023-12-01",
      trackingData: {
        trackingNumber: "9876543210",
        estimatedDelivery: "2023-12-06",
        status: [
          {
            text: "Order Placed",
            date: "2023-12-01",
            completed: true,
          },
          {
            text: "Order Shipped",
            date: "2023-12-03",
            completed: true,
          },
          {
            text: "Out for Delivery",
            date: "2023-12-05",
            completed: "out",
          },
          {
            text: "Delivered",
            date: "2023-12-06",
            completed: false,
          },
        ],
        recipient: {
          address: "789 Oak St, Nairobi, Kenya",
          phone: "+254 734 567 890",
        },
      },
    },
  ];

 
  const sortedOrders = [...mockOrders].sort(
    (a, b) => new Date(b.datePlaced) - new Date(a.datePlaced)
  );

  const handleTrack = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

    
      const order = mockOrders.find(
        (order) => order.orderId === trackingNumber
      );

      if (order) {
        setTrackingData(order.trackingData);
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

  const handleOrderClick = (orderId) => {
    setTrackingNumber(orderId);
    setTrackingData(null); 
    handleTrack(); 
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

            
              <div className="mt-4">
                <h3 className="text-lg font-bold text-black">Your Orders</h3>
                <ol className="mt-2 list-decimal list-inside">
                  {sortedOrders.map((order) => (
                    <li
                      key={order.orderId}
                      className="cursor-pointer p-2 my-1 border border-black rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => handleOrderClick(order.orderId)}
                    >
                      {order.orderId} - Placed on {order.datePlaced}
                    </li>
                  ))}
                </ol>
              </div>
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
