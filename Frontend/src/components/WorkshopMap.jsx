import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowLeftCircle } from "lucide-react";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
  iconSize: [32, 32],
});

const mechanicIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991133.png",
  iconSize: [32, 32],
});

const WorkshopMap = ({ userLocation, assignedMechanic, isFullScreen, setIsFullScreen }) => {
  const [arrivalTime, setArrivalTime] = useState(600); // 10 minutes in seconds
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (arrivalTime > 0) {
      const timer = setInterval(() => {
        setArrivalTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [arrivalTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs} min`;
  };

  return (
    <>
      {!permissionGranted && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <p className="text-lg font-bold mb-4">Allow Location Access</p>
            <button
              onClick={() => setPermissionGranted(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Allow
            </button>
          </div>
        </div>
      )}
      {isFullScreen ? (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center">
          <button
            className="absolute top-6 left-6 bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
            onClick={() => setIsFullScreen(false)}
          >
            <ArrowLeftCircle className="text-white w-8 h-8" />
          </button>

          <MapContainer center={[33.7700, 72.3600]} zoom={14} className="w-full h-full">
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
            </LayersControl>
            {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />}
            {assignedMechanic && <Marker position={[assignedMechanic.lat, assignedMechanic.lng]} icon={mechanicIcon} />}
            {permissionGranted && userLocation && assignedMechanic && (
              <Polyline
                positions={[[userLocation.lat, userLocation.lng], [assignedMechanic.lat, assignedMechanic.lng]]}
                color="blue"
              />
            )}
          </MapContainer>

          <div className="absolute bottom-10 bg-gray-900 text-yellow-400 p-3 rounded-lg shadow-lg text-lg font-bold">
            🚗 Mechanic arriving in: {formatTime(arrivalTime)}
          </div>
        </div>
      ) : (
        <div className="relative h-[400px] w-full mt-4 cursor-pointer" onClick={() => setIsFullScreen(true)}>
          <MapContainer center={[33.7700, 72.3600]} zoom={14} className="h-full w-full rounded-lg shadow-lg">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />}
            {assignedMechanic && <Marker position={[assignedMechanic.lat, assignedMechanic.lng]} icon={mechanicIcon} />}
            {permissionGranted && userLocation && assignedMechanic && (
              <Polyline
                positions={[[userLocation.lat, userLocation.lng], [assignedMechanic.lat, assignedMechanic.lng]]}
                color="blue"
              />
            )}
          </MapContainer>

          <div className="absolute bottom-4 left-4 bg-gray-800 text-yellow-400 p-2 rounded-lg shadow-md text-lg font-bold">
            🚗 Mechanic arriving in: {formatTime(arrivalTime)}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkshopMap;
