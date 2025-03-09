// import React, { useEffect } from "react";
// import twilio from "twilio";

// function AssignOrder({ orderId, userLocation }) {
//   const client = twilio(
//     import.meta.env.VITE_TWILIO_SID,
//     import.meta.env.VITE_TWILIO_AUTH_TOKEN
//   );
//   const driverPhoneNumber = import.meta.env.VITE_TWILIO_PHONE_NUMBER;

//   const sendSMSNotification = async () => {
//     try {
//       const message = await client.messages.create({
//         body: `You have been assigned an order (Order ID: ${orderId}) to be shipped to ${userLocation}.`,
//         from: "+16514488785", 
//         to: driverPhoneNumber, 
//       });

//       console.log("SMS sent successfully!", message.sid);
//       alert("SMS sent successfully!");
//     } catch (error) {
//       console.error("Failed to send SMS:", error);
//       alert("Failed to send SMS: " + error.message);
//     }
//   };

//   useEffect(() => {
//     if (driverPhoneNumber && orderId && userLocation) {
//       sendSMSNotification();
//     }
//   }, [driverPhoneNumber, orderId, userLocation]);

//   return null; 
// }

// export default AssignOrder;
