import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplianceDashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [filter, setFilter] = useState({
    licenseExpiryRange: 30,
    medicalExpiryRange: 30,
    documentType: "all",
    trainingStatus: "all",
    documentStatus: "all", 
  });

  const [summary, setSummary] = useState({
    compliant: 0,
    nonCompliant: 0,
  });

  // Fetch drivers on load or when filters change
  useEffect(() => {
    fetchDrivers();
  }, [filter]);

  const fetchDrivers = async () => {
    try {
      console.log("Fetching with filters:", filter); 
      const response = await axios.get("http://localhost:5000/api/v1/drivers", {
        params: filter,
      });
      let fetchedDrivers = response.data.drivers;

      if (fetchedDrivers && Array.isArray(fetchedDrivers)) {
        const today = new Date();

        // Fallback compliance logic (frontend-side)
        fetchedDrivers = fetchedDrivers.map((driver) => {
          const licenseExpiry = driver.license_expiry ? new Date(driver.license_expiry) : null;
          const medicalExpiry = driver.medical_certificate_expiry
            ? new Date(driver.medical_certificate_expiry)
            : null;

          // Track expired or missing documents
          const expiredDocuments = [];
          const missingDocuments = [];

          // Check for expired or missing license
          if (!driver.license_expiry || licenseExpiry <= today) {
            expiredDocuments.push('License');
          }
          if (!driver.license_expiry) {
            missingDocuments.push('License');
          }

          // Check for expired or missing medical certificate
          if (!driver.medical_certificate_expiry || medicalExpiry <= today) {
            expiredDocuments.push('Medical Certificate');
          }
          if (!driver.medical_certificate_expiry) {
            missingDocuments.push('Medical Certificate');
          }

          // Check for missing training certifications
          if (!driver.training_certifications) {
            missingDocuments.push('Training');
          }

          // Determine compliance
          const isCompliant =
            licenseExpiry && medicalExpiry &&
            licenseExpiry > today &&
            medicalExpiry > today &&
            missingDocuments.length === 0;

          return {
            ...driver,
            compliant: isCompliant,
            expired_documents: expiredDocuments,
            missing_documents: missingDocuments,
          };
        });

        setDrivers(fetchedDrivers);

        const compliantCount = fetchedDrivers.filter((d) => d.compliant).length;
        const nonCompliantCount = fetchedDrivers.length - compliantCount;

        setSummary({
          compliant: compliantCount,
          nonCompliant: nonCompliantCount,
        });
      } else {
        console.error("Invalid driver data structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Compliance & Certification Dashboard</h2>

      {/* Filter Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
          justifyContent: "space-between",
        }}
      >
        {/* License Expiry */}
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ fontWeight: "bold", display: "block" }}>
            License Expiry Range:
          </label>
          <select
            name="licenseExpiryRange"
            value={filter.licenseExpiryRange}
            onChange={handleFilterChange}
            style={{
              padding: "0.5rem",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>

        {/* Medical Expiry */}
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ fontWeight: "bold", display: "block" }}>
            Medical Expiry Range:
          </label>
          <select
            name="medicalExpiryRange"
            value={filter.medicalExpiryRange}
            onChange={handleFilterChange}
            style={{
              padding: "0.5rem",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>

        {/* Document Type */}
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ fontWeight: "bold", display: "block" }}>
            Document Type:
          </label>
          <select
            name="documentType"
            value={filter.documentType}
            onChange={handleFilterChange}
            style={{
              padding: "0.5rem",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="all">All</option>
            <option value="license">License</option>
            <option value="medical">Medical</option>
            <option value="training">Training</option>
          </select>
        </div>

        {/* Training Status */}
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ fontWeight: "bold", display: "block" }}>
            Training Status:
          </label>
          <select
            name="trainingStatus"
            value={filter.trainingStatus}
            onChange={handleFilterChange}
            style={{
              padding: "0.5rem",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
            <option value="missing">Missing</option>
          </select>
        </div>

        {/* Document Status (Expired or Missing) */}
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ fontWeight: "bold", display: "block" }}>
            Document Status:
          </label>
          <select
            name="documentStatus"
            value={filter.documentStatus}
            onChange={handleFilterChange}
            style={{
              padding: "0.5rem",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="all">All Documents</option>
            <option value="expired">Expired Documents</option>
            <option value="missing">Missing Documents</option>
          </select>
        </div>
      </div>

      {/* Compliance Summary */}
      <div style={{ marginBottom: "2rem" }}>
        <strong>Compliant Drivers:</strong> {summary.compliant} |{" "}
        <strong>Non-Compliant Drivers:</strong> {summary.nonCompliant}
      </div>

      {/* Driver Table */}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>License Expiry</th>
            <th>Medical Certificate Expiry</th>
            <th>Training Certifications</th>
            <th>Expired Documents</th>
            <th>Missing Documents</th>
            <th>Compliance Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driver_id}>
              <td>
                {driver.first_name} {driver.last_name}
              </td>
              <td>{driver.license_expiry || "N/A"}</td>
              <td>{driver.medical_certificate_expiry || "N/A"}</td>
              <td>{driver.training_certifications || "None"}</td>
              <td>
                {driver.expired_documents.length > 0
                  ? driver.expired_documents.join(", ")
                  : "None"}
              </td>
              <td>
                {driver.missing_documents.length > 0
                  ? driver.missing_documents.join(", ")
                  : "None"}
              </td>
              <td style={{ color: driver.compliant ? "green" : "red" }}>
                {driver.compliant ? "Compliant" : "Non-Compliant"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplianceDashboard;
