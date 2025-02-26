import React, { useState } from "react";
import MapComponent from "./MapComponent";

const MobileWorkshopPage = () => {
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Mobile Workshop</h1>
      <MapComponent setSelectedMechanic={setSelectedMechanic} />
      {selectedMechanic && (
        <div className="p-4 border rounded-md shadow-lg bg-white fixed bottom-10 left-1/2 transform -translate-x-1/2">
          <h2 className="text-lg font-semibold">{selectedMechanic.name}</h2>
          <p>{selectedMechanic.description}</p>
          <p>⭐ {selectedMechanic.recommendations} Rating</p>
          <p className="text-lg font-bold">Initial Charge: {selectedMechanic.initialCharge} PKR</p>
        </div>
      )}
    </div>
  );
};

export default MobileWorkshopPage;
