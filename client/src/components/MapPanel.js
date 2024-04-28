import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ListItemIcon from '@mui/icons-material/Warning';
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Warning from '@mui/icons-material/Warning';
import Loading from './Loading';


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

  function getSeverityColor(severity) {
    switch (severity) {
        case 'Critical':
            return '#b71c1c'; // darker red for critical severity
        case 'High':
            return '#d32f2f'; // red for high severity
        case 'Medium':
            return '#ffa726'; // orange for medium severity
        case 'Low':
            return '#1976d2'; // blue for low severity
        default:
            return '#757575'; // grey for unknown severity
    }


}

  return (
    <div className="panel-container" style={styles.panel}>
        <button onClick={() => setIsPanelOpen(false)} style={styles.button}>
            X
        </button>
        {municipalityData ? (
            <>
                <div className='panel-header'>{municipalityData.name}</div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={styles.label}>Checkpoint Status:</Typography>
                        <Typography variant="body2">{municipalityData.checkpoint.operationalStatus}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={styles.label}>Checkpoint Operating Hours:</Typography>
                        <Typography variant="body2">{municipalityData.checkpoint.timesOfActivity}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={styles.label}>Outbreak Status:</Typography>
                        <Typography variant="body2">{municipalityData.asfStatus}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="subtitle1" style={styles.label} >
                    Contact Information
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PhoneIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Veterinary Authority" secondary={`Phone: ${municipalityData.contactInfo.veterinaryAuthority.phoneNumber}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Veterinary Authority" secondary={`Email: ${municipalityData.contactInfo.veterinaryAuthority.email}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PhoneIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Emergency Response Team" secondary={`Phone: ${municipalityData.contactInfo.emergencyResponseTeam.phoneNumber}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Emergency Response Team" secondary={`Email: ${municipalityData.contactInfo.emergencyResponseTeam.email}`} />
                    </ListItem>
                </List>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
        <Typography variant="subtitle1" style={styles.label}>Alerts</Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {municipalityData.alerts.map((alert, index) => (
    <ListItem key={index}>
        <ListItemAvatar>
            <Avatar style={{ backgroundColor: getSeverityColor(alert.severity) }}>
                <WarningIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={alert.message} secondary={`Date: ${new Date(alert.date).toLocaleDateString()}`} />
    </ListItem>
))}

        </List>
    </Grid>

                
            </>
        ) : (
            <Loading/> // Or any other loading state indication
        )}
    </div>
);

}
const styles = {
  label: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  
  panel: {
    border: '1px solid #d3d3d3',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold' // Makes the text bold
  },
  button: {
    backgroundColor: 'transparent', // Changed to a more neutral color
    color: 'white',
    zIndex: '1000',
    border: 'none',
    borderRadius: '50%', // Circular shape
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '24px',
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
