import React, { useState, useEffect } from 'react';
import axios from 'axios';



function PanelComponent({ selectedMunicipality, setIsPanelOpen }) {
  const [municipalityData, setMunicipalityData] = useState(null);
  const IP_ADR = process.env.REACT_APP_IP_ADR;


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(selectedMunicipality.name)
        const response = await axios.get(`http://${IP_ADR}:5000/api/municipalities/get/${selectedMunicipality.name}`);
        setMunicipalityData(response.data);
        console.log(municipalityData)
      } catch (error) {
        setMunicipalityData(null);
        console.error('Error fetching municipality data:', error);
        // Handle the error accordingly in your UI
      }
    };

    if (selectedMunicipality.name) {
      fetchData();
    }
  }, [selectedMunicipality.name]);

  return (
    <div className="panel-container" style={styles.panel}>
      <button onClick={() => setIsPanelOpen(false)} style={styles.button}>
        X
      </button>
      {municipalityData ? (
        <>
          <h2 style={styles.header}>{municipalityData.name}</h2>
          {/* Similar display of data as the previous response */}
          <p>Status: {municipalityData.asfStatus}</p>
    
    <div>
      <h3>Contact Information:</h3>
      <p>Veterinary Authority: {municipalityData.contactInfo.veterinaryAuthority.name}</p>
      <p>Phone: {municipalityData.contactInfo.veterinaryAuthority.phoneNumber}</p>
      <p>Email: {municipalityData.contactInfo.veterinaryAuthority.email}</p>
      <p>Emergency Response Team: {municipalityData.contactInfo.emergencyResponseTeam.name}</p>
      <p>Phone: {municipalityData.contactInfo.emergencyResponseTeam.phoneNumber}</p>
      <p>Email: {municipalityData.contactInfo.emergencyResponseTeam.email}</p>
    </div>
        </>
      ) : (
        <p>Loading...</p> // Or any other loading state indication
      )}
    </div>
  );
}
const styles = {
  panel: {
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
  },
  checkpoint: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    margin: '10px 0',
  },
  movement: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    margin: '10px 0',
  },
  alert: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    margin: '10px 0',
  }
};

export default PanelComponent;
