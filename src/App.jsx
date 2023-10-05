import React, { useState } from 'react'
import Map from './Components/Map/Map'
import DroneSimulatorForm from './Components/DroneSimulatorForm/DroneSimulatorForm'
import "./App.css"

function App() {
  const [droneData, setDroneData] = useState([]);

  // Function to receive data from DroneSimulatorForm
  const handleDroneData = (data) => {
    setDroneData(data);
  };

  return (
    <>
      <div className="simulator-form">

      <DroneSimulatorForm onDroneData={handleDroneData} />
      </div>
      <Map droneData={droneData} />
    </>
  )
}

export default App;
