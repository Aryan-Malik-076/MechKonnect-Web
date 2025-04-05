import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Fix for Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const createCustomIcon = (iconClass, color) => {
  return L.divIcon({
    html: `<i class="${iconClass}" style="color: ${color}; font-size: 24px;"></i>`,
    className: "custom-marker",
    iconSize: [30, 30],
    iconAnchor: [15, 30], // Center the icon
  });
};

// Hardcoded mechanics data from your JSON
const mechanicsData = [
  {
    _id: "1",
    name: "Ali Auto Repairs",
    description: "Experienced roadside mechanic in Attock.",
    location: { type: "Point", coordinates: [72.3581, 33.7665] },
    recommendations: 4.8,
    initialCharge: 300,
  },
  {
    _id: "2",
    name: "Hassan Auto Workshop",
    description: "Expert in car breakdown repairs.",
    location: { type: "Point", coordinates: [73.0479, 33.6844] },
    recommendations: 4.5,
    initialCharge: 300,
  },
  {
    _id: "3",
    name: "Kamra Auto Fix",
    description: "Quick repairs for all vehicle types.",
    location: { type: "Point", coordinates: [72.4323, 33.7516] },
    recommendations: 4.7,
    initialCharge: 300,
  },
  {
    _id: "4",
    name: "Attock Roadside Assistance",
    description: "24/7 emergency roadside support.",
    location: { type: "Point", coordinates: [72.3605, 33.7730] },
    recommendations: 4.6,
    initialCharge: 300,
  },
  {
    _id: "5",
    name: "Speedy Auto Care",
    description: "Fast service for breakdowns and maintenance.",
    location: { type: "Point", coordinates: [72.3657, 33.7562] },
    recommendations: 4.4,
    initialCharge: 300,
  },
  {
    _id: "6",
    name: "Maqsood Auto Garage",
    description: "Reliable auto repair in Kamra.",
    location: { type: "Point", coordinates: [72.4287, 33.7465] },
    recommendations: 4.9,
    initialCharge: 300,
  },
  {
    _id: "7",
    name: "Rehman Car Solutions",
    description: "Specialist in car engine repairs.",
    location: { type: "Point", coordinates: [72.3728, 33.7652] },
    recommendations: 4.3,
    initialCharge: 300,
  },
  {
    _id: "8",
    name: "Zubair Motors",
    description: "Affordable and reliable mechanic services.",
    location: { type: "Point", coordinates: [72.3804, 33.7598] },
    recommendations: 4.5,
    initialCharge: 300,
  },
  {
    _id: "9",
    name: "Tariq Auto Rescue",
    description: "Emergency vehicle breakdown support.",
    location: { type: "Point", coordinates: [72.4103, 33.7412] },
    recommendations: 4.7,
    initialCharge: 300,
  },
  {
    _id: "10",
    name: "Safe Drive Mechanics",
    description: "Car repair and towing services.",
    location: { type: "Point", coordinates: [72.3569, 33.7683] },
    recommendations: 4.6,
    initialCharge: 300,
  },
];

// Component to update map center
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const MapComponent = ({ setSelectedMechanic, startTracking, selectedMechanic }) => {
  const [userLocation, setUserLocation] = useState([33.7665, 72.3581]); // Default: Attock
  const [trackingLine, setTrackingLine] = useState(null);
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [hasArrived, setHasArrived] = useState(false);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          console.log("User Location:", [latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
          console.log("Using default location:", userLocation);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handle tracking
  useEffect(() => {
    if (startTracking && selectedMechanic && userLocation && selectedMechanic.location?.coordinates) {
      const initialMechanicLocation = [selectedMechanic.location.coordinates[1], selectedMechanic.location.coordinates[0]];
      setMechanicLocation(initialMechanicLocation);
      setTrackingLine({
        userLocation,
        mechanicLocation: initialMechanicLocation,
      });
      setHasArrived(false);

      const interval = setInterval(() => {
        setMechanicLocation((prevLocation) => {
          if (!prevLocation || hasArrived) return prevLocation;

          const [lat, lng] = prevLocation;
          const newLat = lat + (userLocation[0] - lat) * 0.05;
          const newLng = lng + (userLocation[1] - lng) * 0.05;

          const distance = Math.sqrt((newLat - userLocation[0]) ** 2 + (newLng - userLocation[1]) ** 2);
          if (distance < 0.0005) {
            clearInterval(interval);
            setMechanicLocation(userLocation);
            setTrackingLine({ userLocation, mechanicLocation: userLocation });
            setHasArrived(true);
            alert(`${selectedMechanic.name} has arrived to assist you!`);
          }

          setTrackingLine({ userLocation, mechanicLocation: [newLat, newLng] });
          return [newLat, newLng];
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [startTracking, selectedMechanic, userLocation]);

  const handleConfirm = (mechanic) => {
    setSelectedMechanic(mechanic);
    console.log("Selected Mechanic:", mechanic);
  };

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      whenCreated={(map) => {
        L.control.fullscreen({ position: "topright" }).addTo(map);
      }}
    >
      <MapUpdater center={userLocation} />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Standard Map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="© Esri, Maxar, Earthstar Geographics" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topographic Map">
          <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" attribution='© <a href="https://opentopomap.org/">OpenTopoMap</a>' />
        </LayersControl.BaseLayer>
      </LayersControl>

      {/* User Marker */}
      <Marker position={userLocation} icon={createCustomIcon("fas fa-map-marker-alt", "blue")}>
        <Popup>
          <div className="text-center p-2">
            <h3 className="text-lg font-bold text-blue-600">Your Location</h3>
            <p className="text-sm text-gray-600">Lat: {userLocation[0].toFixed(4)}, Lng: {userLocation[1].toFixed(4)}</p>
          </div>
        </Popup>
      </Marker>

      {/* Mechanics Markers */}
      {mechanicsData.map((mechanic) => {
        const position = [mechanic.location.coordinates[1], mechanic.location.coordinates[0]];
        console.log("Rendering mechanic:", mechanic.name, "at", position);
        return (
          <Marker
            key={mechanic._id}
            position={position}
            icon={createCustomIcon("fas fa-tools", "red")}
          >
            <Popup>
              <div className="w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{mechanic.name}</h2>
                <p className="text-sm text-gray-600 mb-3">{mechanic.description}</p>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-gray-700 font-medium">{mechanic.recommendations || "N/A"}</span>
                </div>
                <p className="text-lg font-semibold text-blue-600 mb-4">Initial Charge: {mechanic.initialCharge || 300} PKR</p>
                <button
                  onClick={() => handleConfirm(mechanic)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Select Mechanic
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Tracking Mechanic */}
      {startTracking && selectedMechanic && mechanicLocation && (
        <>
          <Marker position={mechanicLocation} icon={createCustomIcon("fas fa-tools", "green")}>
            <Popup>
              <div className="w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-green-600 mb-2">{selectedMechanic.name}</h2>
                {hasArrived ? (
                  <p className="text-sm text-gray-600 font-semibold">Mechanic has arrived!</p>
                ) : (
                  <p className="text-sm text-gray-600">On the way to your location...</p>
                )}
                <div className="mt-3">
                  <p className="text-sm text-gray-500">Distance remaining: {hasArrived ? "0 m" : "Moving..."}</p>
                </div>
              </div>
            </Popup>
          </Marker>
          <Polyline positions={[trackingLine.userLocation, trackingLine.mechanicLocation]} color="blue" weight={4} opacity={0.8} dashArray="5, 10" />
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;