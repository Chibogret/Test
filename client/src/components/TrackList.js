import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, useMediaQuery, Button } from '@mui/material';

const tracks = [
  { id: 1, name: 'Track 1', artist: 'Artist 1' },
  { id: 2, name: 'Track 2', artist: 'Artist 2' },
  // Add more tracks as needed
];

function toggleSidebar() {
  document.querySelector('.home-tracklist').classList.toggle('active');
}

function Tracklist() {
  // Using useMediaQuery hook to check for screen width
  const matches = useMediaQuery('(max-width:768px)');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
      {matches && <Button variant="contained" onClick={toggleSidebar}>Toggle Sidebar</Button>}
    </div>
  );
}

export default Tracklist;
