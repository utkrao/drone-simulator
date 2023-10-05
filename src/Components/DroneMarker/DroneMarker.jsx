import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import { GiDeliveryDrone } from "react-icons/gi";

const DroneMarker = ({ position }) => {
  // Create a custom React component as the icon
  const CustomIcon = () => <GiDeliveryDrone size={30} color="blue" />; // Adjust size and color as needed

  return (
    <MarkerF
      position={position}
      icon={CustomIcon} // Use the custom icon component
    />
  );
};

export default DroneMarker;
