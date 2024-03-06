import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  position: "relative",
  maxWidth: "1600px",
  height: "100vh",
  borderRadius: "8px"
};

const nw = {
  lat: 43.20663,
  lng: -77.68602, 
};

const ne = {
    lat: 43.21223, 
    lng: -77.45218, 
};

const cc = {
    lat: 43.15752, 
    lng: -77.61197, 
};

const se = {
    lat: 43.06997, 
    lng: -77.44159, 
};

const airport = {
    lat: 43.10884, 
    lng: -77.67537, 
};


const MapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBPybZaTAL7_FX600TRgDR2ADgGOuNdIP4',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div class = "">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={cc}
      >
        <Marker position={nw} />
        <Marker position={ne} />
        <Marker position={cc} />
        <Marker position={se} />
        <Marker position={airport} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;