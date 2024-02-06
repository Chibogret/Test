import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent({ municipalities, statuses }) {
  const mapBounds = [
    [12.109152, 120.808411], // Southwest corner of Mindoro
    [13.707367, 121.843872]  // Northeast corner of Mindoro
  ];

  // Function to determine fill color based on status
  const getFillColor = (status) => status === 1 ? "#E65F67" : "#808080"; // Primary color or gray

  // Function to determine border color based on status
  const getBorderColor = (status) => status === 1 ? "#b0b0b0" : "#b0b0b0"; // Black or light gray

  // Function to determine border width based on status
  const getBorderWidth = (status) => status === 1 ? 2 : 1; // Thicker border for status 1

  return (
    <MapContainer
      center={[13.1162, 121.0794]} // Center of Oriental Mindoro
      zoom={10}
      scrollWheelZoom={true}
      dragging={true}
      style={{ height: '100%', width: '100%' }}
      maxBounds={mapBounds}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {municipalities.map((municipality) => (
        <CircleMarker
          key={municipality.id}
          center={municipality.coords}
          radius={15}
          fillColor={getFillColor(statuses[municipality.id])} // Fill color based on status
          color={getBorderColor(statuses[municipality.id])} // Border color based on status
          weight={getBorderWidth(statuses[municipality.id])} // Border width based on status
          opacity={1}
          fillOpacity={0.8}
        >
          <Popup>{municipality.name}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
