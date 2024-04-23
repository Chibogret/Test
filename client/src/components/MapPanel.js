import React from 'react';

function PanelComponent({ selectedMunicipality, setIsPanelOpen }) {
  return (
    <div className="panel-container" style={styles.panel}>
      <h2 style={styles.header}>{selectedMunicipality.name}</h2>
      {/* Additional details can be added here */}
      <button onClick={() => setIsPanelOpen(false)} style={styles.button}>
        X
      </button>
    </div>
  );
}

const styles = {
  panel: {
    backgroundColor: '#f7f7f7',
    border: '1px solid #d3d3d3',
    borderRadius: '8px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' // This ensures all content in the panel is centered
  },
  header: {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold' // Makes the text bold
  },
  button: {
    // backgroundColor: '#ccc', // Changed to a more neutral color
    // color: '#333',
    border: 'none',
    borderRadius: '50%', // Circular shape
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '16px',
    position: 'absolute', // Position the button absolutely within the panel
    top: '10px', // Positioning from the top inside the panel
    right: '10px' // Positioning from the right inside the panel
  }
};

export default PanelComponent;
