import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";

// Custom icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995470.png",
  iconSize: [40, 40],
});

const towingTrucks = [
  { id: 1, name: "Ali Towing", lat: 33.7738, lng: 72.3592, description: "Reliable roadside assistance." },
  { id: 2, name: "Kamran Towing", lat: 33.7745, lng: 72.3610, description: "Fast and secure towing service." },
  { id: 3, name: "Fast Tow", lat: 33.7760, lng: 72.3635, description: "24/7 roadside support." },
];

const LocationUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);
  return null;
};

const UpliftingMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [truckLocation, setTruckLocation] = useState(null);
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        alert("Could not get location. Using default Attock location.");
        setUserLocation([33.7738, 72.3592]);
      }
    );
  }, []);

  const startTracking = (truck) => {
    setSelectedTruck(truck);
    setTruckLocation([truck.lat, truck.lng]);
    setHasArrived(false);

    const interval = setInterval(() => {
      setTruckLocation((prevLocation) => {
        if (!prevLocation || hasArrived) return prevLocation;

        const [lat, lng] = prevLocation;
        const newLat = lat + (userLocation[0] - lat) * 0.05;
        const newLng = lng + (userLocation[1] - lng) * 0.05;

        const distance = Math.sqrt((newLat - userLocation[0]) ** 2 + (newLng - userLocation[1]) ** 2);
        if (distance < 0.0005) {
          clearInterval(interval);
          setTruckLocation(userLocation);
          setHasArrived(true);
          alert(`${truck.name} has arrived!`);
        }

        return [newLat, newLng];
      });
    }, 2000);
  };

  return (
    <div className="w-full h-[500px] mt-4 border-2 border-gray-300 rounded-lg">
      {userLocation && (
        <MapContainer center={userLocation} zoom={13} style={{ width: "100%", height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationUpdater position={userLocation} />

          <Marker position={userLocation} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>

          {towingTrucks.map((truck) => (
            <Marker
              key={truck.id}
              position={[truck.lat, truck.lng]}
              icon={truckIcon}
              eventHandlers={{ click: () => startTracking(truck) }}
            >
              <Popup>{truck.name}</Popup>
            </Marker>
          ))}

          {selectedTruck && truckLocation && (
            <>
              <Marker position={truckLocation} icon={truckIcon}>
                {hasArrived && <Popup>{selectedTruck.name} has arrived!</Popup>}
              </Marker>
              <Polyline positions={[userLocation, truckLocation]} color="blue" />
            </>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default UpliftingMap;