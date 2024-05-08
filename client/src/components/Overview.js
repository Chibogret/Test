import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const Dashboard = ({ shipments, users, municipalities, alerts }) => {
  // Assuming "shipments" is an array of shipment data
  const recentShipments = shipments.filter(shipment => {
    // Assuming dateIssued is in a format that can be compared to current date
    const today = new Date();
    const shipmentDate = new Date(shipment.dateIssued);
    return shipmentDate.toDateString() === today.toDateString();
  });

  return (
    <Grid container spacing={2} padding={2}>
      {/* Dashboard Summary */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Dashboard Summary
            </Typography>
            <Typography>
              Total Active Shipments: {shipments.length || 'No data available'}
            </Typography>
            <Typography>
              Shipments Completed Today: {recentShipments.length || 'No data available'}
            </Typography>
            <Typography>
              Total Users: {users.total || 'No data available'}
            </Typography>
            <Typography>
              Active Users Today: {users.activeToday || 'No data available'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Shipments Table based on filtered recentShipments */}
      <Grid item xs={12}>
        {recentShipments.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="recent shipments">
              <TableHead>
                <TableRow>
                  <TableCell>Livestock Handler Name</TableCell>
                  <TableCell align="right">Plate Number</TableCell>
                  <TableCell align="right">Origin to Destination</TableCell>
                  <TableCell align="right">Number of Heads</TableCell>
                  <TableCell align="right">Date Issued</TableCell>
                  <TableCell align="right">Time Issued</TableCell>
                  <TableCell align="right">RAS ASF</TableCell>
                  <TableCell align="right">AIC</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Issued By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentShipments.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.livestockHandlerName}</TableCell>
                    <TableCell align="right">{row.plateNumber}</TableCell>
                    <TableCell align="right">{`${row.origin} to ${row.destination}`}</TableCell>
                    <TableCell align="right">{row.numberOfHeads}</TableCell>
                    <TableCell align="right">{row.dateIssued}</TableCell>
                    <TableCell align="right">{row.timeIssued}</TableCell>
                    <TableCell align="right">{row.rasAsf}</TableCell>
                    <TableCell align="right">{row.aic}</TableCell>
                    <TableCell align="right">{row.deliveryStatus.map(status => `${status.description} on ${status.date} [${status.state}]`).join(', ')}</TableCell>
                    <TableCell align="right">{row.issuedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <Typography>No recent shipments available</Typography>
          </Box>
        )}
      </Grid>

      {/* Additional panels such as ASF Monitoring, Active Users, and Alerts can be added similarly, with checks for data availability */}
    </Grid>
  );
};

export default Dashboard;
