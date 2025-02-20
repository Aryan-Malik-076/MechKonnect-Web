import React, { useState, useEffect } from "react";
import axios from "axios";
import TowingMap from "./TowingMap";
import TowingList from "./TowingList";

const TowingService = () => {
  const [towingTrucks, setTowingTrucks] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch Towing Trucks from Backend
    axios.get("http://localhost:5000/api/towing")
      .then((res) => setTowingTrucks(res.data))
      .catch((err) => console.error("Error fetching towing trucks:", err));

    // Get User Location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error)
    );
  }, []);

  return (
    <div>
      <h1>Towing Service</h1>
      {userLocation ? (
        <>
          <TowingMap userLocation={userLocation} towingTrucks={towingTrucks} />
          <TowingList towingTrucks={towingTrucks} />
        </>
      ) : (
        <p>Loading user location...</p>
      )}
    </div>
  );
};

export default TowingService;
