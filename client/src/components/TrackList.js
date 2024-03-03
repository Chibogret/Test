import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import '../styles.css';


const tracks = [
  { id: 1, name: 'Track 1', artist: 'Artist 1' },
  { id: 2, name: 'Track 2', artist: 'Artist 2' },
  // Add more tracks as needed
];


function Tracklist() {

  return (
    <div className='sidebar' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Register Button */}
      <Button className="registerButton">Register shipment</Button>
      <Button className="registerButton" style={{border:"none"}}>Tracking shipment</Button>
      {tracks.map((track) => (
        <Card key={track.id} variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {track.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {track.artist}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default Tracklist;
