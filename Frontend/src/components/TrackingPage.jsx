import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackingPage = () => {
  const { mechanicId } = useParams();
  const [mechanicLocation, setMechanicLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mechanics/${mechanicId}/location`);
        setMechanicLocation(response.data.location);
      } catch (error) {
        console.error("Error fetching mechanic location", error);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000); // Refresh location every 5 seconds

    return () => clearInterval(interval);
  }, [mechanicId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl font-bold">Tracking Mechanic...</h1>
      {mechanicLocation ? (
        <p>Mechanic is at: {mechanicLocation.lat}, {mechanicLocation.lng}</p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default TrackingPage;
