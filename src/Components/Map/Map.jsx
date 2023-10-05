import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import DroneMarker from "../DroneMarker/DroneMarker";
import "./Map.css";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

const Map = ({ droneData }) => {
  const [currentPosition, setCurrentPosition] = useState(droneData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPolyline, setShowPolyline] = useState(false);

  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const defaultZoom = 18;

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        if (droneData && currentIndex < droneData.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          const newPosition = droneData[currentIndex + 1];
          setCurrentPosition(newPosition);
        } else {
          clearInterval(interval);
          setShowPolyline(true); // To display the Polyline
          setIsPlaying(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currentIndex, droneData, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleSeekChange = (e) => {
    const newIndex = parseInt(e.target.value, 10); // To parse the value as an integer
    setCurrentIndex(newIndex);
    setCurrentPosition(droneData[newIndex]); // To set the marker position based on the newIndex
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={droneData[currentIndex]}
        zoom={defaultZoom}
      >
        <DroneMarker position={currentPosition} />
        {showPolyline && (
          <Polyline path={droneData} />
        )}
      </GoogleMap>
      <div className="pause-play-btn-conatiner">
        <button onClick={togglePlayPause}>
          {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
        <input type="range" min="0" max={droneData.length - 1} value={currentIndex} onChange={handleSeekChange} />
      </div>
    </LoadScript>
  );
};

export default Map;
