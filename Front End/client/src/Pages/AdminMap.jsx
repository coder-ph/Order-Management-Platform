import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import carShipping from "../assets/icons/local_shipping_20dp_EA3323_FILL0_wght400_GRAD0_opsz20.svg";

// Fix Leaflet marker icon issue
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

const mockVehicles = [
  { id: 1, position: [1.2921, 36.8219], driver: { name: "John Doe", phone: "+254712345678" } }, // Nairobi
  { id: 2, position: [-1.2864, 36.8172], driver: { name: "Jane Smith", phone: "+254798765432" } }, // Mombasa
  { id: 3, position: [0.5143, 35.2698], driver: { name: "Peter Mwangi", phone: "+254723456789" } }, // Kisumu
  { id: 4, position: [0.0236, 37.9062], driver: { name: "Alice Wanjiru", phone: "+254701234567" } }, // Meru
];

const AdminMap = () => {
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

  const center = userLocation || [1.2921, 36.8219];

  return (
    <div className="flex h-screen w-screen">
      <div className="h-screen w-screen">
        <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          )}
          {mockVehicles.map((vehicle) => (
            <Marker key={vehicle.id} position={vehicle.position} icon={vehicleIcon}>
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