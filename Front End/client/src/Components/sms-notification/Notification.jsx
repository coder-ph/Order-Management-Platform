import React, { useEffect } from "react";
import twilio from "twilio";

function AssignOrder({ driverPhoneNumber, orderId, userLocation }) {
  
  const client = twilio(
    import.meta.env.VITE_TWILIO_SID,
    import.meta.env.VITE_TWILIO_AUTH_TOKEN
  );


  const sendSMSNotification = async () => {
    try {
      const message = await client.messages.create({
        body: `You have been assigned an order (Order ID: ${orderId}) to be shipped to ${userLocation}.`,
        from: "+16514488785", 
        to: driverPhoneNumber, 
      });

      console.log("SMS sent successfully!", message.sid);
      alert("SMS sent successfully!");
    } catch (error) {
      console.error("Failed to send SMS:", error);
      alert("Failed to send SMS: " + error.message);
    }
  };

 
  useEffect(() => {
    if (driverPhoneNumber && orderId && userLocation) {
      sendSMSNotification();
    }
  }, [driverPhoneNumber, orderId, userLocation]);

  return (
    <div>
      <h3>Assign Order to Driver</h3>
      <p>Driver Phone: {driverPhoneNumber}</p>
      <p>Order ID: {orderId}</p>
      <p>User Location: {userLocation}</p>
    </div>
  );
}

export default AssignOrder;
