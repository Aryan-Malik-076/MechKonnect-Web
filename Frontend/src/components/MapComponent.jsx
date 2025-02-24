import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-fullscreen"; // Import the fullscreen plugin
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"; // Import the fullscreen CSS
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome icons

// Function to create custom FontAwesome icons
const createCustomIcon = (iconClass, color) => {
  return L.divIcon({
    html: `<i class="${iconClass}" style="color: ${color}; font-size: 24px;"></i>`,
    className: "custom-marker",
    iconSize: [30, 30],
  });
};

const MapComponent = ({ setSelectedMechanic }) => {
  const [userLocation, setUserLocation] = useState([33.7665, 72.3581]); // Default Attock
  const [mechanics, setMechanics] = useState([]);
  const [trackingLine, setTrackingLine] = useState(null);

  // Fetch mechanics from the backend
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
          const { latitude, longitude } = position.coords;
          console.log("User Location:", latitude, longitude); // Debugging
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Confirm Mechanic Selection & Start Tracking
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
      whenCreated={(map) => {
        // Add fullscreen control
        L.control.fullscreen({
          position: "topright", // Position of the button
          title: "Toggle Fullscreen", // Tooltip text
          titleCancel: "Exit Fullscreen", // Tooltip text when in fullscreen
          forceSeparateButton: true, // Force a separate button (not combined with other controls)
        }).addTo(map);
      }}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Standard Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri, Maxar, Earthstar Geographics"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Topographic Map">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {/* User Marker */}
      <Marker position={userLocation} icon={createCustomIcon("fas fa-map-marker-alt", "blue")}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* Mechanics Markers */}
      {mechanics.map((mechanic, index) => (
        <Marker key={index} position={[mechanic.latitude, mechanic.longitude]} icon={createCustomIcon("fas fa-tools", "red")}>
          <Popup>
            <h2 className="text-xl font-bold">{mechanic.name}</h2>
            <p className="text-sm text-gray-600">{mechanic.description}</p>
            <p>⭐ {mechanic.recommendations} Rating</p>
            <p className="text-lg font-semibold">Initial Charge: {mechanic.initialCharge} PKR</p>
            <button
              onClick={() => handleConfirm(mechanic)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700"
            >
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