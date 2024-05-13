import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Overview'; // Ensure this is correctly imported
import { CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const IP_ADR = process.env.REACT_APP_IP_ADR;
// Replace 'your.server.ip' with the actual IP address

const DashboardPage = () => {
  const [data, setData] = useState({
    shipments: { activeCount: 0, completedToday: 0, recent: [] },
    users: { total: 0, activeToday: 0 },
    municipalities: [],
    alerts: []
  });
  const [users, setUser] = useState(null)
  const [shipment_overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const usersResponse = await axios.get(`http://${IP_ADR}:5000/api/user/userinfo`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const listOfUsers = await axios.get(`http://${IP_ADR}:5000/api/user/get`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const municipalityResponse = await axios.get(`http://${IP_ADR}:5000/api/municipalities/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(municipalityResponse.data)
        console.log(listOfUsers.data)
        console.log(usersResponse.data)
        console.log(shipmentOverview.data)
        console.log(shipmentResponse.data)
        const shipmentsData = shipmentResponse.data; // Adjust this if the data structure is different
        setUser(listOfUsers.data)
        setOverview(shipmentOverview.data)
        // Assuming you also have endpoints to fetch users, municipalities, and alerts
        // const usersResponse = await axios.get(`http://${IP_ADR}:5000/api/users/get`);
        // const municipalitiesResponse = await axios.get(`http://${IP_ADR}:5000/api/municipalities/get`);
        // const alertsResponse = await axios.get(`http://${IP_ADR}:5000/api/alerts/get`);

        setData({
          shipments: shipmentsData, // Adjust according to your response structure
          users: { total: 10, activeToday: 5 }, // Mock data or another API call
          municipalities: [{ name: 'Calapan', asfStatus: 'Monitoring' }], // Mock data or another API call
          alerts: [{ message: 'New ASF Case Detected', severity: 'High', date: new Date() }] // Mock data or another API call
        });
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
        <Dashboard shipments={data.shipments} overview={shipment_overview} users={users} municipalities={data.municipalities} alerts={data.alerts} />

      </div>
    </div>
  );
};

export default DashboardPage;
