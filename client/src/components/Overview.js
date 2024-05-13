import React from 'react';
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PetsIcon from '@mui/icons-material/Pets'; // Using Pets icon as an example

import { parseISO } from 'date-fns';
import { toDate, formatInTimeZone } from 'date-fns-tz';

function formatDateTime(dateTime, type) {
  const adjustedDateTime = new Date(new Date(dateTime).getTime() - 8 * 60 * 60 * 1000);
  if (type === 'date') {
    return adjustedDateTime.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  } else if (type === 'time') {
    return adjustedDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Helper function to convert strings to title case
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}



const Dashboard = ({ shipments, users, overview, municipalities, alerts }) => {
  const recentShipments = shipments

  const data = [
    { id: 0, value: overview.activeShipments, label: 'Active' },
    { id: 1, value: overview.completedShipments, label: 'Completed' },
    { id: 2, value: overview.totalShipments - overview.activeShipments - overview.completedShipments, label: 'Pending' },
  ]
  return (
    <Box style={{ maxWidth: "95%", margin: "5px auto", height: "auto" }}>
      <Typography variant="h2" gutterBottom style={{ color: "#008080" }}>
        Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={9} gap={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">Dashboard Summary</Typography>
              <Typography>Total Active Shipments: {shipments.length || 'No data available'}</Typography>
              <Typography>Shipments Completed Today: {recentShipments.length || 'No data available'}</Typography>
              <Typography>Total Users: {users.total || 'No data available'}</Typography>
              <Typography>Active Users Today: {users.activeToday || 'No data available'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} gap={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">Dashboard Summary</Typography>
              <Typography>Total Active Shipments: {shipments.length || 'No data available'}</Typography>
              <Typography>Shipments Completed Today: {recentShipments.length || 'No data available'}</Typography>
              <Typography>Total Users: {users.total || 'No data available'}</Typography>
              <Typography>Active Users Today: {users.activeToday || 'No data available'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} gap="6">
        <Card sx={{ bgcolor: 'background.paper', height: "100%" }}> 
            <CardContent>
              <Typography variant="h5" component="div">Dashboard Summary</Typography>
              <Typography>Total Active Shipments: {shipments.length || 'No data available'}</Typography>
              <Typography>Shipments Completed Today: {recentShipments.length || 'No data available'}</Typography>
              <Typography>Total Users: {users.total || 'No data available'}</Typography>
              <Typography>Active Users Today: {users.activeToday || 'No data available'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3} gap={6}>
      <Card sx={{ bgcolor: 'background.paper', height: "100%" }}>
        <CardContent>
          
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }}>
            <PetsIcon sx={{ fontSize: 40 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              Total Delivered
            </Typography>
            <Typography variant="h4" color="secondary" sx={{ mt: 1 }}>
              {overview.totalDeliveredLivestock} of {overview.totalLivestock}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
        <Grid item xs={12} sm={12} md={3} gap={6}>
      <Card sx={{ bgcolor: 'background.paper', height: "100%"  }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <LocalShippingIcon  />
            <Typography variant="h6" color="text.primary">
              Active Shipments
            </Typography>
            <Typography variant="h6" color="secondary" sx={{ ml: 'auto' }}>
              {overview.activeShipments}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
            <LocalShippingIcon  />
            <Typography variant="h6" color="text.primary">
              Completed Shipments
            </Typography>
            <Typography variant="h6" color="secondary" sx={{ ml: 'auto' }}>
              {overview.completedShipments}
            </Typography>
          </Box>
          <Divider style={{marginTop: "20px"}}/>
          <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
            <LocalShippingIcon color="primary" />
            <Typography variant="h6" color="text.primary">
              Total Shipments
            </Typography>
            <Typography variant="h6" color="secondary" sx={{ ml: 'auto' }}>
              {overview.totalShipments}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>


        <Grid item xs={12} sm={12} md={9} >
          <div style={{ maxWidth: '100vw', overflow: 'auto' }}>
            <TableContainer component={Paper}>
              <Table aria-label="recent shipments">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Handler Name</StyledTableCell>
                    <StyledTableCell align="right">Plate Number</StyledTableCell>
                    <StyledTableCell align="right">Origin to Destination</StyledTableCell>
                    <StyledTableCell align="right">Head Count</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Time</StyledTableCell>
                    <StyledTableCell align="right">RAS ASF</StyledTableCell>
                    <StyledTableCell align="right">AIC</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">Issued By</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentShipments.length > 0 ? recentShipments.map((row) => (
                    <StyledTableRow
                      key={row._id}
                      onDoubleClick={() => window.location.href = `/home/${row._id}`}
                      style={{ cursor: 'pointer' }} // Optional, for visual indication of clickability
                    >

                      <TableCell component="th" scope="row">
                        {row.livestockHandlerName}
                      </TableCell>
                      <TableCell align="right">{row.plateNumber}</TableCell>
                      <TableCell align="right">{`${row.origin} to ${row.destination}`}</TableCell>
                      <TableCell align="right">{row.numberOfHeads}</TableCell>
                      <TableCell align="right">
                        {formatDateTime(row.dateIssued, 'date')}
                      </TableCell>

                      <TableCell align="right">
                        {formatDateTime(row.timeIssued, 'time')}
                      </TableCell>

                      <TableCell align="right">{row.rasAsf}</TableCell>
                      <TableCell align="right">{row.aic}</TableCell>
                      <TableCell align="right">
                        {
                          (() => {
                            const delivered = row.deliveryStatus.find(status => status.state === "delivered");
                            const inTransit = row.deliveryStatus.find(status => status.state === "inTransit");
                            const checking = row.deliveryStatus.find(status => status.state === "checking");

                            if (delivered && delivered.date !== '-') {
                              return <span style={{ color: "green" }}>{`${delivered.description}`}</span>;
                            } else if (inTransit && inTransit.date !== '-') {
                              return <span>{`${inTransit.description}`}</span>;
                            } else if (checking && checking.date !== '-') {
                              return <span>{`${checking.description}`}</span>;
                            } else {
                              return <span>{`${checking.description}`}</span>; // Handling case where all statuses might be '-'
                            }
                          })()
                        }</TableCell>



                      <TableCell align="right">{row.issuedBy}</TableCell>
                    </StyledTableRow >
                  )) : (
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={10} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>


        <Grid
          item
          xs={12}
          sm={12}
          md={3}
        >

          <Card sx={{ height: '100%', backgroundColor: "#008080", color: "white", overflow: "auto" }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ textAlign: 'center'}}>
                Authorized Accounts
              </Typography>
              <List sx={{ width: '100%', textOverflow: "ellipsis",overflow: "hidden", whiteSpace:"nowrap" }}>
                {users.map(user => (
                  <ListItem key={user._id} sx={{ color: "white" }}>
                    <ListItemText
                      primary={<Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {`${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`}
                      </Typography>}
                      secondary={<Typography variant="body2" sx={{ fontSize: '1rem' }}>
                        {`${user.municipality} · ${user.email}`}
                      </Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>




        </Grid>
      </Grid>

    </Box>
  );
};

export default Dashboard;
