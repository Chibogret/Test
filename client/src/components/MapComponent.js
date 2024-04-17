import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import PanelComponent from './MapPanel';
import 'leaflet/dist/leaflet.css';
import '../style/mapComponent.css';

function MapComponent({ municipalities, statuses }) {
  // State hooks for managing the selected municipality and panel visibility
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  console.log(statuses);

  const mapBounds = [
    [12.109152, 120.808411], // Southwest corner of Mindoro
    [13.707367, 121.843872]  // Northeast corner of Mindoro
  ];

  // Function to determine fill color based on status
  const getFillColor = (status) => {
    switch (status) {
      case 1: // Active
        return "#E65F67"; // Red color
      case 2: // Current
        return "#4CAF50"; // Green color
      default: // Inactive or other
        return "#808080"; // Gray
    }
  };

  const borderColor = "#b0b0b0"; // Light gray for all statuses
  const borderWidth = (status) => status === 1 || status === 2 ? 3 : 1; // Thicker border for active or current

  const handleMarkerClick = (municipality) => {
    setSelectedMunicipality(municipality);
    setIsPanelOpen(true);
  };

  const isMobile = window.innerWidth <= 768;  // Adjust this value based on common device breakpoints


  return (
    <>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}> {/* Ensure this div encompasses the whole map */}
        <MapContainer
          key={JSON.stringify(statuses)}
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
            const status = statuses[municipality.name.toUpperCase()];
            return (
              <CircleMarker
                key={municipality.id}
                center={municipality.coords}
                radius={15}
                fillColor={getFillColor(status)}
                color={borderColor}
                weight={borderWidth(status)}
                opacity={1}
                fillOpacity={0.8}
                eventHandlers={{
                  click: () => handleMarkerClick(municipality),
                }}
              >
                <Popup>{municipality.name}</Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {isPanelOpen && (
        <PanelComponent 
          selectedMunicipality={selectedMunicipality} 
          setIsPanelOpen={setIsPanelOpen}
        />
      )}

      </div>

    </>
  );
}

export default MapComponent;
