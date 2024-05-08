import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
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

const Dashboard = ({ shipments, users, municipalities, alerts }) => {
  const recentShipments = shipments


  return (
    <Grid spacing={1}>
      <Grid item xs={1} sm={1} md={1}>
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

      <Grid item xs={12}>
        <div style={{ width: '90vw', overflow: 'auto', border: '1px solid', borderRadius: "10px" }}>
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


    </Grid>
  );
};

export default Dashboard;
