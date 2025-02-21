import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import Places from "./Places";
import Distance from "./Distance";

// Move libraries array outside of the component to avoid re-creation on every render.
const libraries = ["places"];

// Map options (if needed)
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.5,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};

const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.5,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateVehicles = (position) => {
  const vehicles = [];
  for (let i = 0; i < 100; i++) {
    vehicles.push({
      lat: position.lat + Math.random(),
      lng: position.lng + Math.random(),
    });
  }
  return vehicles;
};

function Map() {
  // Load the Google Maps API script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 0.5184, lng: 35.27 }), []);
  const options = useMemo(
    () => ({
        mapId: 'b181cac70f27f5e6',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const [vehicles, setVehicles] = useState([]);
  const [deliveryPoint, setDeliveryPoint] = useState('')

  // Generate vehicles once the maps API is loaded and center is defined
  useEffect(() => {
    if (isLoaded) {
      setVehicles(generateVehicles(center));
    }
  }, [isLoaded, center]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="container">
      <div className="controls">Commute?</div>
      <Places setOffice={(position)=> {
        setDeliveryPoint(position)
        mapRef.current?.panTo(position);
      }} />
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map"
          options={options}
          onLoad={onLoad}
        >
          <MarkerClusterer>
            {(clusterer) =>
              vehicles.map((vehicle, index) => (
                <Marker
                  key={index}
                  position={{ lat: vehicle.lat, lng: vehicle.lng }}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>
          {/* You can add other components like DirectionsRenderer, Circle, Places, Distance here */}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
