import React, { useState } from "react";
import Papa from "papaparse";
import "./DroneSimulatorForm.css"

const DroneSimulatorForm = ({ onDroneData }) => {
  const [inputType, setInputType] = useState("form"); // Default to form input
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [paths, setPaths] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // To handle the latitude and longitude data
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // To check if both latitude and longitude are valid numbers
    if (!isNaN(lat) && !isNaN(lng)) {
      // To add the new coordinates to the coordinates array
      setCoordinates([...coordinates, { lat, lng }]);
      // To clear the input fields
      setLatitude("");
      setLongitude("");
    } else {
      alert("Please enter valid latitude and longitude values.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;

      if (fileType === "application/json") {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const fileContent = event.target.result;
            const jsonData = JSON.parse(fileContent);

            // Check if jsonData is an array of objects
            if (
              Array.isArray(jsonData) &&
              jsonData.every((obj) => typeof obj === "object")
            ) {
              // Send the parsed data to the parent component
              console.log(jsonData);
              onDroneData(jsonData);

              // To set the input type to "file"
              setInputType("file");
            } else {
              alert("The JSON file should contain an array of objects.");
            }
          } catch (error) {
            alert("Error parsing JSON data from the file.");
          }
        };

        reader.readAsText(file);
      } else {
        alert("Please upload a JSON file.");
      }
    }
  };

  const simulateDrone = () => {
    if (inputType === "file" && paths) {
      // Only send data if the file input is selected and data is available
      onDroneData(paths);
    } else if (inputType === "form" && coordinates.length > 0) {
      // Only send data if the form input is selected and coordinates are available
      onDroneData(coordinates);
    } else {
      alert("No data available for simulation.");
    }
  };

  return (
    <div className="drone-form-container">
      <div className="form-container">
        <h2>Drone Simulator</h2>
        {/* Input Type Selection */}
        <div className="toggle-menu">
          <label>
            <input
              type="radio"
              name="inputType"
              value="form"
              checked={inputType === "form"}
              onChange={() => setInputType("form")}
            />
            Form Input
          </label>
          <label>
            <input
              type="radio"
              name="inputType"
              value="file"
              checked={inputType === "file"}
              onChange={() => setInputType("file")}
            />
            File Input
          </label>
        </div>
  
        {inputType === "form" && (
          // Form Input
          <form onSubmit={handleFormSubmit}>
            <div className="form-input">
              <label>Latitude:</label>
              <input
                type="text"
                name="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="form-input">
              <label>Longitude:</label>
              <input
                type="text"
                name="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
  
            {/* Display the entered coordinates */}
            <div>
              <label>Entered Coordinates:</label>
              <ul>
                {coordinates.map((coord, index) => (
                  <li
                    key={index} className="coordinates-display"
                  >{`Latitude: ${coord.lat}, Longitude: ${coord.lng}`}</li>
                ))}
              </ul>
            </div>
  
            {/* Submit Button */}
            <button className="simulate-btn" type="submit">
              Add Time Series
            </button>
          </form>
        )}
  
        {inputType === "file" && (
          // File Input
          <div className="file-upload">
            <label>Upload Time Series Data File: </label>
            <input type="file" name="file" id="file" class="inputfile" onChange={handleFileUpload} />
            <label htmlFor="file">Choose a file</label>
          </div>
        )}
  
        {/* Simulate Button */}
        {inputType === "form" && (
          <button className="simulate-btn" onClick={simulateDrone}>
            Simulate
          </button>
        )}
        <div className="info-wrap">Click on Play button once the map is loaded</div>
      </div>
    </div>
  );
};

export default DroneSimulatorForm;
