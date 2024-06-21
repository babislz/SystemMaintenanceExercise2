import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapDisplay = () => {
  const position = [-25.4256036, -49.2736159];
  const zoom = 15;

  return (
    <MapContainer center={position} zoom={zoom} style={{
        height: "100%",
        backgroundColor: 'transparent' 
      }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Son Konum
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;
