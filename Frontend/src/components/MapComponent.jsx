import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
    iconAnchor: [15, 30],
  });
};

const mechanicsData = [
  { _id: "1", name: "Ali Auto Repairs", location: { type: "Point", coordinates: [72.3581, 33.7665] } },
  { _id: "2", name: "Hassan Auto Workshop", location: { type: "Point", coordinates: [73.0479, 33.6844] } },
  { _id: "3", name: "Kamra Auto Fix", location: { type: "Point", coordinates: [72.4323, 33.7516] } },
  { _id: "4", name: "Attock Roadside Assistance", location: { type: "Point", coordinates: [72.3605, 33.7730] } },
  { _id: "5", name: "Speedy Auto Care", location: { type: "Point", coordinates: [72.3657, 33.7562] } },
  { _id: "6", name: "Maqsood Auto Garage", location: { type: "Point", coordinates: [72.4287, 33.7465] } },
  { _id: "7", name: "Rehman Car Solutions", location: { type: "Point", coordinates: [72.3728, 33.7652] } },
  { _id: "8", name: "Zubair Motors", location: { type: "Point", coordinates: [72.3804, 33.7598] } },
  { _id: "9", name: "Tariq Auto Rescue", location: { type: "Point", coordinates: [72.4103, 33.7412] } },
  { _id: "10", name: "Safe Drive Mechanics", location: { type: "Point", coordinates: [72.3569, 33.7683] } },
];

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const MapComponent = ({ setSelectedMechanic, startTracking, selectedMechanic, onWorkComplete }) => {
  const [userLocation, setUserLocation] = useState([33.7665, 72.3581]);
  const [trackingLine, setTrackingLine] = useState([]);
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [hasArrived, setHasArrived] = useState(false);
  const [showArrivalPopup, setShowArrivalPopup] = useState(false);
  const [workCompleted, setWorkCompleted] = useState(false);
  const [showWorkCompletePopup, setShowWorkCompletePopup] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (startTracking && selectedMechanic && userLocation && !hasArrived) {
      const initialMechanicLocation = [selectedMechanic.location.coordinates[1], selectedMechanic.location.coordinates[0]];
      setMechanicLocation(initialMechanicLocation);
      setTrackingLine([userLocation, initialMechanicLocation]);

      const interval = setInterval(() => {
        setMechanicLocation((prevLocation) => {
          if (!prevLocation) return initialMechanicLocation;

          const [lat, lng] = prevLocation;
          const targetLat = userLocation[0];
          const targetLng = userLocation[1];

          const newLat = lat + (targetLat - lat) * 0.2;
          const newLng = lng + (targetLng - lng) * 0.2;

          const distance = Math.sqrt((newLat - targetLat) ** 2 + (newLng - targetLng) ** 2);
          if (distance < 0.0005) {
            clearInterval(interval);
            setMechanicLocation([targetLat, targetLng]);
            setTrackingLine([userLocation, [targetLat, targetLng]]);
            setHasArrived(true);
            setShowArrivalPopup(true);

            setTimeout(() => {
              setWorkCompleted(true);
              setShowWorkCompletePopup(true);
              setShowArrivalPopup(false);
              if (onWorkComplete) onWorkComplete();
            }, 15000);
          } else {
            setTrackingLine([userLocation, [newLat, newLng]]);
          }

          return [newLat, newLng];
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [startTracking, selectedMechanic, userLocation, hasArrived, onWorkComplete]);

  const handleClosePopup = () => {
    setShowArrivalPopup(false);
    setShowWorkCompletePopup(false);
  };

  return (
    <>
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        whenCreated={(map) => {
          L.control.fullscreen({ position: "topright" }).addTo(map);
        }}
        zoomControl={false}
      >
        <MapUpdater center={userLocation} />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© Esri, Maxar, Earthstar Geographics"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="© Esri, Maxar, Earthstar Geographics"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Topographic Map">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <Marker position={userLocation} icon={createCustomIcon("fas fa-map-marker-alt", "blue")}>
          <Popup>Your Location</Popup>
        </Marker>

        {mechanicsData.map((mechanic) => (
          <Marker
            key={mechanic._id}
            position={[mechanic.location.coordinates[1], mechanic.location.coordinates[0]]}
            icon={createCustomIcon("fas fa-tools", "red")}
          >
            <Popup>
              <div className="w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{mechanic.name}</h2>
                <button
                  onClick={() => setSelectedMechanic(mechanic)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Select Mechanic
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {startTracking && selectedMechanic && mechanicLocation && trackingLine.length === 2 && (
          <>
            <Marker position={mechanicLocation} icon={createCustomIcon("fas fa-tools", "green")}>
              <Popup>
                {hasArrived ? `${selectedMechanic.name} has arrived!` : `${selectedMechanic.name} is on the way...`}
              </Popup>
            </Marker>
            <Polyline positions={trackingLine} color="blue" weight={4} />
          </>
        )}
      </MapContainer>

      {showArrivalPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center transform transition-all duration-300 scale-105">
            <div className="mb-6">
              <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Road Hero is Here!</h2>
            <p className="text-gray-600 mb-6">{selectedMechanic.name} has arrived and will start working shortly.</p>
            <button
              onClick={handleClosePopup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showWorkCompletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center transform transition-all duration-300 scale-105">
            <div className="mb-6">
              <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Completed!</h2>
            <p className="text-gray-600 mb-6">{selectedMechanic.name} has finished the job.</p>
            <button
              onClick={handleClosePopup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MapComponent;