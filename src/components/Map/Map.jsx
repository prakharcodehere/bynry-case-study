// Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapPin } from "react-icons/fa";
import "./Map.css"

const Map = ({ lat, lng }) => {
  return (
    <div >
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>
         <FaMapPin/>
         USER LOCATION
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
};

export default Map;


