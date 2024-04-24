import React from 'react';
import QRCode from 'qrcode.react'; // Make sure this package is already installed
// Correctly import the necessary components from @mui/material for the Timeline
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const warningMessage = "There may be delays due to unforeseen circumstances. Please keep this in mind and plan accordingly.";

const DetailsComponent = ({orderDetails }) => {
  const IP_ADR = process.env.REACT_APP_IP_ADR;

  if (!orderDetails) {
    return <div>No details available</div>;
  }

  const { dateIssued, timeIssued, rasAsf, aic, deliveryStatus, timeline, _id } = orderDetails;

  return (
    <div className='details-container' >
      
      <div className='details-header'>

        <TableContainer>
        <h3>Order Details</h3>
          <Table aria-label="order details" sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none"
            }
          }}>
            <TableBody >
              <TableRow>
                <TableCell component="th" scope="row"><strong>Date Issued:</strong></TableCell>
                <TableCell>{dateIssued}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Time Issued:</strong></TableCell>
                <TableCell>{timeIssued}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>RAS-ASF Control No.:</strong></TableCell>
                <TableCell>{rasAsf}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>AIC Control No.:</strong></TableCell>
                <TableCell>{aic}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="qr-code">
          <div className='qr-box'>
            <QRCode value={`http://${IP_ADR}:3000/update/`+_id} size={128} level={"H"} />
            <div className='qr-label'>Scan the QR code</div>
          </div>
        </div>
      </div>

      {/* Use the correct MUI Timeline components */}
      <div className='delivery-timeline' style={{maxHeight:"450px", overflow:"auto"}}>
        <h3>Timeline</h3>

        <Timeline position='left'>
          {timeline.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent style={{ maxWidth: "1px", paddingLeft: '0px', paddingRight: '0px' }} />
              <TimelineContent style={{ paddingRight: '16px', textAlign: 'right' }}>

                {item.time}
              </TimelineContent>

              {/* Displaying time on the right side */}
              <TimelineContent style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                <p style={{ margin: 0 }}>{item.status}</p>
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot color={item.status === 'completed' ? 'primary' : item.status === 'current' ? 'secondary' : 'grey'} />
                {index < timeline.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "2px" }}>

        <div className='delivery-status' style={{ marginBottom: "10px" }}>
          <h3>Delivery Status</h3>
          {deliveryStatus.map((status, index) => (
            <p key={index} className={status.state}>
              {status.description} <span>{status.date}</span>
            </p>
          ))}
        </div>

        <div className='warning-section' style={{ height: "100%" }}>
          <h3>Warning</h3>
          <p>{warningMessage}</p>
        </div>
      </div>

    </div>
  );
};

export default DetailsComponent;
