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

const convertDecimalTimeToDayTime = (decimalTime) => {
  const totalMinutes = decimalTime * 60;
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
};

const toTitleCase = (str) => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const Dashboard = ({ shipments, users, overview, municipalities, alerts, currentUser }) => {
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
                <Typography variant="h5" component="div">
                    User Information
                </Typography>
                <Typography>
                <Box component="span" fontWeight="fontWeightMedium" style={{fontWeight: "bold"}}> Email:</Box> {currentUser.email}
                </Typography>
                <Typography>
                <Box component="span" fontWeight="fontWeightMedium" style={{fontWeight: "bold"}}> First Name:</Box> {toTitleCase(currentUser.firstName)}
                </Typography>
                <Typography>
                <Box component="span" fontWeight="fontWeightMedium" style={{fontWeight: "bold"}}> Last Name:</Box> {toTitleCase(currentUser.lastName)}
                </Typography>
                <Typography>
                <Box component="span" fontWeight="fontWeightMedium" style={{fontWeight: "bold"}}> Municipality Assigned:</Box> {toTitleCase(currentUser.municipality)}
                </Typography>

            </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} gap={6}>
          <Card>
            <CardContent>
              {[
                { label: "Active Checkpoints", value: municipalities.activeCheckpoints },
                { label: "Inactive Checkpoints", value: municipalities.inactiveCheckpoints },
                { label: "Under Maintenance", value: municipalities.underMaintenanceCheckpoints },
              ].map((item, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1} sx={{ mt: index !== 0 ? 2 : 0 }}>

                  <Typography variant="h6" color="text.primary">
                    {item.label}
                  </Typography>
                  <Typography variant="h6" color="secondary" sx={{ ml: 'auto' }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} gap="6">
        <Card sx={{ bgcolor: 'background.paper', height: "100%"}}>
  <CardContent>
    {[
      { label: "Monitoring", value: municipalities.monitoring },
      { label: "No Cases", value: municipalities.noCases },
      { label: "Contained", value: municipalities.contained },
      { label: "Outbreak", value: municipalities.outbreak },
    ].map((item, index) => (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          bgcolor: item.label === "Outbreak" && item.value !== 0 ? 'error.main' : 'background.default',
          color: item.label === "Outbreak" && item.value !== 0 ? 'error.contrastText' : 'text.primary',
          p: 1,
          borderRadius: 1
        }}
      >
        <Typography variant="h6" sx={{ color: item.label === "Outbreak" && item.value !== 0 ? 'error.contrastText' : 'text.primary' }}>
          {item.label}
        </Typography>
        <Typography variant="h6" sx={{ ml: 'auto', color: item.label === "Outbreak" && item.value !== 0 ? 'error.contrastText' : 'secondary.main' }}>
          {item.value}
        </Typography>
      </Box>
    ))}
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
                <Typography variant="h4" color="secondary">
                  {overview.totalDeliveredLivestock} of {overview.totalLivestock}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  as of {new Date().toLocaleDateString()}
                </Typography>

              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3} gap={6}>
          <Card sx={{ bgcolor: 'background.paper', height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <LocalShippingIcon />
                <Typography variant="h6" color="text.primary">
                  Active Shipments
                </Typography>
                <Typography variant="h6" color="secondary" sx={{ ml: 'auto' }}>
                  {overview.activeShipments}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                <LocalShippingIcon />
                <Typography variant="h6" color="text.primary">
                  Completed Shipments
                </Typography>
                <Typography variant="h6" color="secondary" sx={{ ml: 'auto' }}>
                  {overview.completedShipments}
                </Typography>
              </Box>
              <Divider style={{ marginTop: "20px" }} />
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                <LocalShippingIcon color="primary" />
                <Typography variant="h6" color="text.primary">
                  Total Shipments
                </Typography>
                <Typography variant="h6" color="secondary" sx={{ ml: 'auto' }}>
                  {overview.totalShipments}
                </Typography>
              </Box>
              
              <Box display="flex"  gap={1}>
                <Typography variant="subtitle1" color="text.secondary" style={{margin: "0 auto"}} >
                Average Time of Delivery 
                <Typography variant="subtitle2" color="text.secondary">

                {convertDecimalTimeToDayTime(overview.averageDeliveryTime)}
                </Typography>
                </Typography>
                
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} gap={6} >
        <Card style={{maxHeight: "400px", overflow: "auto"}}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Municipality Alerts
                </Typography>
                {alerts.map((alert, index) => (
                    <Box 
                        key={index} 
                        sx={{ 
                            marginTop: 1, 
                            padding: 1, 
                            borderBottom: '1px solid #ddd', 
                            backgroundColor: alert.severity === 'Critical' ? 'rgba(255, 0, 0, 0.1)' : 'inherit',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ flex: 1, color: 'textSecondary' }}>
                            {alert.municipality}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                flex: 1, 
                                color: alert.severity === 'Critical' ? 'red' : 'textPrimary',
                                textAlign: 'center'
                            }}
                        >
                            {alert.severity}
                        </Typography>
                        <Typography variant="body2" sx={{ flex: 2 }}>
                            {alert.message}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
        </Grid>


        <Grid item xs={12} sm={12} md={9} >
          <Typography variant="h6" color="text.primary">
            Latest Shipments
          </Typography>
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
              <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                Authorized Accounts
              </Typography>
              <List sx={{ width: '100%', textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
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
