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

// Towing trucks data (10 trucks at Attock & Kamra)
const towingTrucks = [
  { id: 1, name: "Ali Towing", lat: 33.7738, lng: 72.3592, description: "Reliable roadside assistance." },
  { id: 2, name: "Kamran Towing", lat: 33.7745, lng: 72.3610, description: "Fast and secure towing service." },
  { id: 3, name: "Fast Tow", lat: 33.7760, lng: 72.3635, description: "24/7 roadside support." },
  { id: 4, name: "SafeRide Tow", lat: 33.7752, lng: 72.3652, description: "Affordable and professional." },
  { id: 5, name: "Quick Rescue", lat: 33.7780, lng: 72.3680, description: "Emergency towing experts." },
  { id: 6, name: "Road Hero", lat: 33.7895, lng: 72.3660, description: "We get you moving!" },
  { id: 7, name: "Trust Tow", lat: 33.7902, lng: 72.3695, description: "Your safety is our priority." },
  { id: 8, name: "Fast Assist", lat: 33.7910, lng: 72.3712, description: "Quick and efficient towing." },
  { id: 9, name: "SafeHaul", lat: 33.7925, lng: 72.3740, description: "Reliable towing for your vehicle." },
  { id: 10, name: "Elite Tow", lat: 33.7930, lng: 72.3770, description: "Premier roadside assistance." },
];

// Component to update map position
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        alert("Could not get location. Using default Attock location.");
        setUserLocation([33.7738, 72.3592]); // Default to Attock
      }
    );
  }, []);

  // Function to start tracking when a truck is selected
  const startTracking = (truck) => {
    setSelectedTruck(truck);
    setTruckLocation([truck.lat, truck.lng]);

    // Simulate the truck moving towards the user every 2 seconds
    const interval = setInterval(() => {
      setTruckLocation((prevLocation) => {
        if (!prevLocation) return truckLocation;

        const [lat, lng] = prevLocation;

        const newLat = lat + (userLocation[0] - lat) * 0.05;
        const newLng = lng + (userLocation[1] - lng) * 0.05;

        return [newLat, newLng];
      });
    }, 2000);

    // Stop tracking when truck reaches near the user
    setTimeout(() => {
      clearInterval(interval);
      alert(`${truck.name} has arrived!`);
    }, 10000);
  };

  return (
    <div className="w-full h-[500px] mt-4 border-2 border-gray-300 rounded-lg">
      {userLocation && (
        <MapContainer center={userLocation} zoom={13} style={{ width: "100%", height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationUpdater position={userLocation} />

          {/* User Marker */}
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Towing Truck Markers */}
          {towingTrucks.map((truck) => (
            <Marker
              key={truck.id}
              position={[truck.lat, truck.lng]}
              icon={truckIcon}
              eventHandlers={{
                click: () => startTracking(truck),
              }}
            >
              <Popup>{truck.name}</Popup>
            </Marker>
          ))}

          {/* Show tracking path */}
          {selectedTruck && truckLocation && (
            <>
              <Marker position={truckLocation} icon={truckIcon}>
                <Popup>{selectedTruck.name} is on the way!</Popup>
              </Marker>
              <Polyline positions={[userLocation, truckLocation]} color="blue" />
            </>
          )}
        </MapContainer>
      )}

      {/* Show truck details automatically when a truck is selected */}
      {selectedTruck && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">{selectedTruck.name}</h2>
          <p>{selectedTruck.description}</p>
          <p className="text-green-600 font-bold mt-2">Ride Confirmed! Truck is on the way.</p>
        </div>
      )}
    </div>
  );
};

export default UpliftingMap;
