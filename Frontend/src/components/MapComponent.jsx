import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mechanicsData = [
  { id: 1, name: "Ali's Workshop", lat: 33.7725, lng: 72.3601 },
  { id: 2, name: "Hassan Auto Repair", lat: 33.7702, lng: 72.3640 },
  { id: 3, name: "Zain Mechanic", lat: 33.7740, lng: 72.3575 },
];

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [assignedMechanic, setAssignedMechanic] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        assignNearestMechanic(latitude, longitude);
      },
      () => {
        setUserLocation({ lat: 33.7700, lng: 72.3600 }); // Default Attock location
        assignNearestMechanic(33.7700, 72.3600);
      }
    );
  }, []);

  const assignNearestMechanic = (lat, lng) => {
    let nearest = null;
    let minDistance = Infinity;
    mechanicsData.forEach((mechanic) => {
      const distance = Math.sqrt(
        Math.pow(mechanic.lat - lat, 2) + Math.pow(mechanic.lng - lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = mechanic;
      }
    });
    setAssignedMechanic(nearest);
  };

  return (
    <div className="h-[500px] w-full mt-6">
      <MapContainer center={[33.7700, 72.3600]} zoom={14} className="h-full w-full">
        {/* 🌍 High-Detail Map from OpenTopoMap */}
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
        />
        
        {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} />}
        {assignedMechanic && <Marker position={[assignedMechanic.lat, assignedMechanic.lng]} />}
        {userLocation && assignedMechanic && (
          <Polyline positions={[[userLocation.lat, userLocation.lng], [assignedMechanic.lat, assignedMechanic.lng]]} color="blue" />
        )}
      </MapContainer>
      {assignedMechanic && (
        <p className="text-center mt-4">
          {`Assigned Mechanic: ${assignedMechanic.name} - Estimated Arrival: 10 mins`}
        </p>
      )}
    </div>
  );
};

export default MapComponent;
