import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-fullscreen";

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: "/icons/user-marker.png", // Replace with your own user icon
  iconSize: [35, 45],
});

const mechanicIcon = new L.Icon({
  iconUrl: "/icons/mechanic-marker.png", // Replace with your own mechanic icon
  iconSize: [35, 45],
});

const MapComponent = ({ setSelectedMechanic }) => {
  const [userLocation, setUserLocation] = useState([33.7665, 72.3581]); // Default Attock
  const [mechanics, setMechanics] = useState([]);
  const [trackingLine, setTrackingLine] = useState(null);

  // Fetch Mechanics from Backend
  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mechanics");
        const data = await response.json();
        setMechanics(data);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
      }
    };
    fetchMechanics();
  }, []);

  // Get User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleConfirm = (mechanic) => {
    setSelectedMechanic(mechanic);
    setTrackingLine({
      userLocation,
      mechanicLocation: [mechanic.latitude, mechanic.longitude],
    });
  };

  return (
    <MapContainer 
      center={userLocation} 
      zoom={13} 
      style={{ height: "100vh", width: "100%" }}
      fullscreenControl={true} // Enables full-screen mode on map click
    >
      <LayersControl position="topright">
        {/* Standard Map */}
        <LayersControl.BaseLayer checked name="Standard Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </LayersControl.BaseLayer>

        {/* Satellite Map */}
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri, Maxar, Earthstar Geographics"
          />
        </LayersControl.BaseLayer>

        {/* Topographic Map */}
        <LayersControl.BaseLayer name="Topographic Map">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {/* User Marker */}
      <Marker position={userLocation} icon={userIcon}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* Mechanics Markers */}
      {mechanics.map((mechanic, index) => (
        <Marker key={index} position={[mechanic.latitude, mechanic.longitude]} icon={mechanicIcon}>
          <Popup>
            <h2 className="text-xl font-bold">{mechanic.name}</h2>
            <p className="text-sm text-gray-600">{mechanic.description}</p>
            <p>⭐ {mechanic.recommendations} Rating</p>
            <p className="text-lg font-semibold">Initial Charge: {mechanic.initialCharge} PKR</p>
            <button onClick={() => handleConfirm(mechanic)} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700">
              Confirm & Start Tracking
            </button>
          </Popup>
        </Marker>
      ))}

      {/* Tracking Line */}
      {trackingLine && (
        <Polyline positions={[trackingLine.userLocation, trackingLine.mechanicLocation]} color="blue" weight={3} opacity={0.7} />
      )}
    </MapContainer>
  );
};

export default MapComponent;
