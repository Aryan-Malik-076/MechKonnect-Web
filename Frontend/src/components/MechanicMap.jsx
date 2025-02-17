import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MechanicMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [assignedMechanic, setAssignedMechanic] = useState(null);
  const [route, setRoute] = useState([]);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          findNearestMechanic([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Set default location (Attock, Pakistan)
          const defaultLocation = [33.7700, 72.3600];
          setUserLocation(defaultLocation);
          findNearestMechanic(defaultLocation);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Simulate mechanics' locations (for demo purposes)
  const simulateMechanics = () => {
    return [
      { id: 1, name: "Ali's Workshop", location: [33.7671, 72.3597] },
      { id: 2, name: "Hassan Auto Repair", location: [33.7690, 72.3600] },
      { id: 3, name: "Zain Mechanic", location: [33.7650, 72.3550] },
    ];
  };

  // Find the nearest mechanic
  const findNearestMechanic = (userCoords) => {
    const mechanicsList = simulateMechanics();
    let nearestMechanic = null;
    let minDistance = Infinity;

    mechanicsList.forEach((mechanic) => {
      const distance = calculateDistance(userCoords, mechanic.location);
      if (distance < minDistance) {
        minDistance = distance;
        nearestMechanic = mechanic;
      }
    });

    if (nearestMechanic) {
      setAssignedMechanic(nearestMechanic);
      setRoute([userCoords, nearestMechanic.location]);
      setMechanics(mechanicsList);
    }
  };

  // Haversine formula to calculate distance
  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Estimate arrival time (ETA)
  const calculateETA = (distance) => {
    const averageSpeed = 30; // Assume mechanic travels at 30 km/h
    return ((distance / averageSpeed) * 60).toFixed(2); // Time in minutes
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">
        Find a Mechanic Near You
      </h2>
      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={14}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* User Location Marker */}
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
          {/* Mechanics Markers */}
          {mechanics.map((mechanic) => (
            <Marker key={mechanic.id} position={mechanic.location}>
              <Popup>{mechanic.name}</Popup>
            </Marker>
          ))}
          {/* Route from User to Mechanic */}
          {route.length > 0 && <Polyline positions={route} color="blue" />}
        </MapContainer>
      ) : (
        <p className="text-center">Loading map...</p>
      )}
      {/* Mechanic Details */}
      {assignedMechanic && (
        <div className="mt-4 text-center">
          <p className="text-lg">
            Assigned Mechanic: <strong>{assignedMechanic.name}</strong>
          </p>
          <p className="text-lg">
            Estimated Time of Arrival:{" "}
            <strong>
              {calculateETA(calculateDistance(userLocation, assignedMechanic.location))} minutes
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default MechanicMap;
