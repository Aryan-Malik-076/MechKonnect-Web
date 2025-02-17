import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowLeftCircle } from "lucide-react"; // Icon for the back button
import NavBar from "./Navbar";

const mechanicsData = [
  { id: 1, name: "Ali's Workshop", lat: 33.7725, lng: 72.3601 },
  { id: 2, name: "Hassan Auto Repair", lat: 33.7702, lng: 72.3640 },
  { id: 3, name: "Zain Mechanic", lat: 33.7740, lng: 72.3575 },
];

const MobileWorkshopPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [assignedMechanic, setAssignedMechanic] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        assignNearestMechanic(latitude, longitude);
      },
      () => {
        setUserLocation({ lat: 33.7700, lng: 72.3600 });
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
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4 text-center text-yellow-400">
          Mobile Workshop Service
        </h1>
        <p className="text-center mb-6 text-lg text-gray-300">
          Get a mobile workshop to your location instantly.
        </p>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkZqzNvDy0hK6nMu1C1dAXON8TmmBxUDStTg&s"
            alt="Mobile Workshop Service"
            className="rounded-xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl object-cover"
          />
        </div>

        <p className="text-center mb-4 text-lg text-gray-400">
          Our mobile workshop will arrive at your location and provide on-the-spot repairs.
        </p>

        {/* Fullscreen Map */}
        {isFullScreen ? (
          <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            {/* 🔙 Floating Back Button */}
            <button
              className="absolute top-6 left-6 bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
              onClick={() => setIsFullScreen(false)}
            >
              <ArrowLeftCircle className="text-white w-8 h-8" />
            </button>

            {/* 🗺 Fullscreen Map */}
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

                <LayersControl.BaseLayer name="Topographic Map">
                  <TileLayer
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

              {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} />}
              {assignedMechanic && <Marker position={[assignedMechanic.lat, assignedMechanic.lng]} />}
              {userLocation && assignedMechanic && (
                <Polyline
                  positions={[
                    [userLocation.lat, userLocation.lng],
                    [assignedMechanic.lat, assignedMechanic.lng],
                  ]}
                  color="blue"
                />
              )}
            </MapContainer>
          </div>
        ) : (
          // Map Preview
          <div className="relative h-[400px] w-full mt-4 cursor-pointer" onClick={() => setIsFullScreen(true)}>
            <MapContainer center={[33.7700, 72.3600]} zoom={14} className="h-full w-full rounded-lg shadow-lg">
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

              {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} />}
              {assignedMechanic && <Marker position={[assignedMechanic.lat, assignedMechanic.lng]} />}
              {userLocation && assignedMechanic && (
                <Polyline
                  positions={[
                    [userLocation.lat, userLocation.lng],
                    [assignedMechanic.lat, assignedMechanic.lng],
                  ]}
                  color="blue"
                />
              )}
            </MapContainer>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-xl font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
              Click to Expand Map
            </div>
          </div>
        )}

        {/* Assigned Mechanic Info */}
        {assignedMechanic && (
          <div className="mt-6 text-center">
            <p className="text-lg text-yellow-400 font-semibold">
              {`🚗 Assigned Mechanic: ${assignedMechanic.name}`}
            </p>
            <p className="text-gray-300">{`Estimated Arrival: 10 mins`}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileWorkshopPage;
