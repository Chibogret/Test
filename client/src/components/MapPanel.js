import React from 'react';

function PanelComponent({ selectedMunicipality, setIsPanelOpen }) {
  return (
    <div className='panel-container'>
      <h2>{selectedMunicipality.name}</h2>
      {/* Additional details can be added here */}
      <button onClick={() => setIsPanelOpen(false)}>Close</button>
    </div>
  );
}

export default PanelComponent;
