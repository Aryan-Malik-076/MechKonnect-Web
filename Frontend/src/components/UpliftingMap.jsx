import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";

// Custom icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const mechanicIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995470.png", // Changed to mechanic-related icon
  iconSize: [40, 40],
});

// List of 10 mechanics in Kamra/Attock area (approximate coordinates)
const mechanics = [
  { id: 1, name: "Ahmed Mechanics", lat: 33.7738, lng: 72.3592, description: "Expert in engine repairs.", image: "https://randomuser.me/api/portraits/men/1.jpg", timeToArrive: "15 mins" },
  { id: 2, name: "Kamran Autos", lat: 33.7745, lng: 72.3610, description: "Specializes in tire services.", image: "https://randomuser.me/api/portraits/men/2.jpg", timeToArrive: "20 mins" },
  { id: 3, name: "Fast Fix Garage", lat: 33.7760, lng: 72.3635, description: "24/7 emergency support.", image: "https://randomuser.me/api/portraits/men/3.jpg", timeToArrive: "18 mins" },
  { id: 4, name: "Ali Auto Care", lat: 33.7720, lng: 72.3575, description: "Bodywork specialist.", image: "https://randomuser.me/api/portraits/men/4.jpg", timeToArrive: "25 mins" },
  { id: 5, name: "Raza Mechanics", lat: 33.7750, lng: 72.3600, description: "Quick oil changes.", image: "https://randomuser.me/api/portraits/men/5.jpg", timeToArrive: "22 mins" },
  { id: 6, name: "Hassan Repairs", lat: 33.7770, lng: 72.3620, description: "Brake system expert.", image: "https://randomuser.me/api/portraits/men/6.jpg", timeToArrive: "17 mins" },
  { id: 7, name: "Attock Auto", lat: 33.7715, lng: 72.3580, description: "Full-service garage.", image: "https://randomuser.me/api/portraits/men/7.jpg", timeToArrive: "19 mins" },
  { id: 8, name: "Zain Mechanics", lat: 33.7740, lng: 72.3640, description: "Electrical repairs.", image: "https://randomuser.me/api/portraits/men/8.jpg", timeToArrive: "21 mins" },
  { id: 9, name: "Bilal Garage", lat: 33.7765, lng: 72.3595, description: "Suspension specialist.", image: "https://randomuser.me/api/portraits/men/9.jpg", timeToArrive: "16 mins" },
  { id: 10, name: "Shoaib Autos", lat: 33.7730, lng: 72.3615, description: "General maintenance.", image: "https://randomuser.me/api/portraits/men/10.jpg", timeToArrive: "23 mins" },
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
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        alert("Could not get location. Using default Attock location.");
        setUserLocation([33.7738, 72.3592]); // Default to Attock coordinates
      }
    );
  }, []);

  const startTracking = (mechanic) => {
    setSelectedMechanic(mechanic);
    setMechanicLocation([mechanic.lat, mechanic.lng]);
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
          setHasArrived(true);
          alert(
            `${mechanic.name} has arrived to uplift your car! We will take care of your vehicle and safely transport it to the workshop.`
          );
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

          {mechanics.map((mechanic) => (
            <Marker
              key={mechanic.id}
              position={[mechanic.lat, mechanic.lng]}
              icon={mechanicIcon}
            >
              <Popup>
                <div className="flex flex-col items-center">
                  <img src={mechanic.image} alt={mechanic.name} className="w-16 h-16 rounded-full mb-2" />
                  <h3 className="font-bold">{mechanic.name}</h3>
                  <p>{mechanic.description}</p>
                  <p>Time to Arrive: {mechanic.timeToArrive}</p>
                  <button
                    onClick={() => startTracking(mechanic)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {selectedMechanic && mechanicLocation && (
            <>
              <Marker position={mechanicLocation} icon={mechanicIcon}>
                {hasArrived && (
                  <Popup>{`${selectedMechanic.name} has arrived!`}</Popup>
                )}
              </Marker>
              <Polyline positions={[userLocation, mechanicLocation]} color="blue" />
            </>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default UpliftingMap;