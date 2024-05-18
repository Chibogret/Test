import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Overview'; // Ensure this is correctly imported
import { CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const IP_ADR = process.env.REACT_APP_IP_ADR;
// Replace 'your.server.ip' with the actual IP address

const DashboardPage = () => {
  const [shipments, setShipments] = useState(null)
  const [users, setUser] = useState(null)
  const [shipment_overview, setOverview] = useState(null)
  const [municipalities_overview, setMunicipality] = useState(null)
  const [alerts, setAlerts] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warnings, setWarning] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in local storage.');
          return;
        }
        // Fetch shipments data
        const shipmentResponse = await axios.get(`http://${IP_ADR}:5000/api/shipments/latest`);
        const shipmentOverview = await axios.get(`http://${IP_ADR}:5000/api/shipments/dashboard-overview`);
        const alerts = await axios.get(`http://${IP_ADR}:5000/api/municipalities/alerts`);
        const usersResponse = await axios.get(`http://${IP_ADR}:5000/api/user/userinfo`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const listOfUsers = await axios.get(`http://${IP_ADR}:5000/api/user/get`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const municipalityResponse = await axios.get(`http://${IP_ADR}:5000/api/municipalities/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const currentUser = await axios.get(`http://${IP_ADR}:5000/api/user/userinfo`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        const warnings = await axios.get(`http://${IP_ADR}:5000/api/shipments/warning`);
        console.log(warnings.data)

        console.log(alerts.data)
        console.log(municipalityResponse.data)
        console.log(listOfUsers.data)
        console.log(usersResponse.data)
        console.log(shipmentOverview.data)
        console.log(shipmentResponse.data)
        console.log(currentUser.data)
        setShipments(shipmentResponse.data)
        setUser(listOfUsers.data)
        setOverview(shipmentOverview.data)
        setMunicipality(municipalityResponse.data[0])
        setCurrentUser(currentUser.data)
        setAlerts(alerts.data)
        setWarning(warnings.data)
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. ' + err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <p>{error}</p>
      </Box>
    );
  }

  return (

    <div>
      <div className='app-bar'>
        <Navbar />
      </div>
      <div style={{ display: "flex", overflow: "auto" }}>
        <Dashboard shipments={shipments} overview={shipment_overview} users={users} municipalities={municipalities_overview} alerts={alerts} currentUser={currentUser} warnings={warnings}/>

      </div>
    </div>
  );
};

export default DashboardPage;
