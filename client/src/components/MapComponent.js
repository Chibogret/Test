import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import PanelComponent from '../components/MapPanel';
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
      case 0:
        return "#00B69D"; // Red color
      case 1: // Active
        return "#00B69D"; // Red color
      case 2: // Current
        return "#4CAF50"; // Green color
      default: // Inactive or other
        return "#808080"; // Gray
    }
  };

  const borderColor = "#C4421A"; // Light gray for all statuses
  const borderWidth = (status) => {
    switch (status) {
      case 3: // 'current' status, assuming it corresponds to the highest priority
        return 2; // Thickest border for 'current'
      case 2: // 'current' status, assuming it corresponds to the highest priority
        return 5; // Thickest border for 'current'
      case 1: // 'completed'
      case 0: // 'completed (skipped)'
        return 3; // Thicker border for all except '-1'
      default: // '-1' and any other undefined statuses
        return 0; // Thinnest border for '-1' or unspecified statuses
    }
  };
  
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
                  hover: () => handleMarkerClick(municipality)
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
