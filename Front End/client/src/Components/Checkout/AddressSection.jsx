import React, { useState, useEffect } from "react";

const AddressSection = ({ onAddressChange }) => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

// Got tired of making backend will update on monday (please laugh)

//   useEffect(() => {
//     const fetchAddress = async () => {
//       try {
//         const response = await fetch(
//           "https://your-api-endpoint.com/user-address"
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setAddress(data.address); 
//         } else {
//           console.error("Failed to fetch address.");
//         }
//       } catch (error) {
//         console.error("Error fetching address:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAddress();
//   }, []);

  return (
    <div className="section">
      <div className="section-header">
        <h2>CUSTOMER ADDRESS</h2>
        <p className="change-link" onClick={onAddressChange}>
          Change →
        </p>
      </div>
      {isLoading ? (
        <p>Loading address...</p>
      ) : address ? (
        <>
          <p>customer name</p>
          <p>{address}</p>
        </>
      ) : (
        <p className="address-note">
          Please click the "Change" button to enter your address.
        </p>
      )}
    </div>
  );
};

export default AddressSection;
