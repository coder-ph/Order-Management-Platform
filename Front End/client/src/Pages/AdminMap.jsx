import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import carShipping from "../assets/icons/local_shipping_20dp_EA3323_FILL0_wght400_GRAD0_opsz20.svg";
import AdminSidebar from "../Components/AdminSidebar";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const vehicleIcon = new L.Icon({
  iconUrl: carShipping,
  iconRetinaUrl: carShipping,
  iconSize: [25, 30],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const AdminMap = () => {
  const [vehicles, setVehicles] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error fetching user location:", error);
      }
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/vehicle-positions")
        .then((res) => res.json())
        .then((data) => {
          setVehicles(data);
        })
        .catch((error) =>
          console.error("Error fetching vehicle positions:", error)
        );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const center = userLocation || [1.2921, 36.8219];

  return (
    <div className="flex h-screen w-screen">
      <div>
        <AdminSidebar />
      </div>
      <div className="h-screen w-screen">
        <MapContainer
          center={center}
          zoom={7}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          )}
          {vehicles.map((vehicle) => (
            <Marker
              key={vehicle.id}
              position={vehicle.position}
              icon={vehicleIcon}
            >
              <Popup>
                <div>
                  <strong>Driver Information</strong>
                  <p>Name: {vehicle.driver.name}</p>
                  <p>Phone: {vehicle.driver.phone}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdminMap;
