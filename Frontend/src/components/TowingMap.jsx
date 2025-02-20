import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Truck Icon
const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995627.png",
  iconSize: [40, 40],
});

const TowingMap = ({ userLocation, towingTrucks }) => {
  return (
    <MapContainer
      center={[33.6844, 73.0479]}
      zoom={12}
      className="h-96 w-full rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* User Location */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Towing Trucks */}
      {towingTrucks.map((truck) => (
        <Marker
          key={truck.id}
          position={[truck.lat, truck.lng]}
          icon={truckIcon}
        >
          <Popup>
            {truck.name} - {truck.availability ? "Available" : "Busy"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TowingMap;