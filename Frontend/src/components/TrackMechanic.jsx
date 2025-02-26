import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

const TrackMechanic = () => {
  const userLocation = [33.7665, 72.3581]; // User location
  const [mechanic, setMechanic] = useState(null);

  useEffect(() => {
    const storedMechanic = JSON.parse(localStorage.getItem("selectedMechanic"));
    if (storedMechanic) {
      setMechanic(storedMechanic);
    }
  }, []);

  if (!mechanic) return <p>Tracking mechanic...</p>;

  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={userLocation} icon={L.divIcon({ className: "user-icon" })} />
      <Marker position={[mechanic.latitude, mechanic.longitude]} icon={L.divIcon({ className: "mechanic-icon" })} />

      <Polyline positions={[userLocation, [mechanic.latitude, mechanic.longitude]]} color="blue" />
    </MapContainer>
  );
};

export default TrackMechanic;
