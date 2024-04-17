import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent({ municipalities, statuses }) {

  console.log(statuses)

  const mapBounds = [
    [12.109152, 120.808411], // Southwest corner of Mindoro
    [13.707367, 121.843872]  // Northeast corner of Mindoro
  ];

  // Function to determine fill color based on status
  const getFillColor = (status) => {
    switch(status) {
      case 1: // Active
        return "#E65F67"; // Primary color
      case 2: // Current
        return "#4CAF50"; // Green color to indicate current status
      default: // Inactive or other
        return "#808080"; // Gray
    }
  };

  const borderColor = "#b0b0b0"; // Light gray for all statuses
  const borderWidth = (status) => status === 1 || status === 2 ? 3 : 1; // Thicker border for active or current

  return (
    <MapContainer
  key={JSON.stringify(statuses)} // Change key when statuses change
  center={[13.1162, 121.0794]}
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
      {municipalities.map((municipality) => {
        const status = statuses[municipality.name.toUpperCase()]; // Access status using municipality name
        return (
          <CircleMarker
            key={municipality.id}
            center={municipality.coords}
            radius={15}
            fillColor={getFillColor(status)} // Fill color based on status
            color={borderColor} // Consistent border color for simplicity
            weight={borderWidth(status)} // Border width based on status
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup>{municipality.name}</Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;
