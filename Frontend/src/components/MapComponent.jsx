import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl: "/icons/user-marker.png", // Replace with your user icon path
  iconSize: [30, 40],
});

const mechanicIcon = new L.Icon({
  iconUrl: "/icons/mechanic-marker.png", // Replace with your mechanic icon path
  iconSize: [30, 40],
});

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState([33.7665, 72.3581]); // Default Attock
  const [mechanics, setMechanics] = useState([]);

  // ✅ Fetch Mechanics from Backend
  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mechanics");
        const data = await response.json();
        console.log("Fetched Mechanics:", data); // Debugging
        setMechanics(data);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
      }
    };

    fetchMechanics();
  }, []);

  // ✅ Get User Location
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

  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ✅ User Marker */}
      <Marker position={userLocation} icon={userIcon}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* ✅ Mechanics Markers */}
      {mechanics.length > 0 ? (
        mechanics.map((mechanic, index) => (
          <Marker
            key={index}
            position={[mechanic.latitude, mechanic.longitude]}
            icon={mechanicIcon}
          >
            <Popup>
              <strong>{mechanic.name}</strong> <br />
              {mechanic.description} <br />
              ⭐ {mechanic.recommendations} <br />
              💰 {mechanic.initialCharge} PKR
            </Popup>
          </Marker>
        ))
      ) : (
        <p>Loading mechanics...</p>
      )}
    </MapContainer>
  );
};

export default MapComponent;
