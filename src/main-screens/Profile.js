import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BASE_API_URI from "../config";
import '../App.css';
import { useAuth } from '../context/AuthContext'; 

function Profile() {
  const { user, logout } = useAuth();
  sessionStorage.setItem('reservationActive', 'false');
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (user.role === 0) {
      getUserInfo();
      getReservations();
    }
  }, []);

  function getUserInfo() {
    axios.get(`${BASE_API_URI}/customers/${user.userID}`, { withCredentials: true })
      .then(response => {
        setCustomer(response.data);
      })
      .catch(error => console.log(error));
  }

  function getReservations() {
    axios.get(`${BASE_API_URI}/reservations`, { withCredentials: true })
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => console.log(error));
  }

  if (user.role === 0) {
    return (
      <div className="m-16">
        <h1 className="text-section-head">Profile</h1>
        <h3 className="text-card-title">{user.firstName + " " + user.lastName}</h3>
        <h3 className="text-card-title pt-8">Reservations</h3>
        {reservations?.filter(data => data.customer.customerID === user.userID).map((data, key) => (
          <div className="mb-8" key={key}>
            <p>Reservation ID: {data.reservationID}</p>
            <p>Scheduled Start Time: {data.scheduledStartDatetime}</p>
            <p>Start Station: {data.startStation.stationID}</p>
            <p>Scheduled End Time: {data.scheduledEndDatetime}</p>
            <p>End Station: {data.endStation.stationID}</p>
          </div>
        ))}        
        <Button variant="contained" sx={{ backgroundColor: "#000180", foregroundColor: "#FFFFFF", marginLeft: "0em"}} onClick = { () => {logout();}}>Log Out</Button>
      </div>
    );
  } else if (user.role > 0) {
    return (
      <>
      <div className="Profile">
        <div className="profile-container">
          <div className="profile">
            <div className="profile-picture"></div>
            <div className="profile-details">
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
              <p>{'Employee #: ' + user.userID}</p>
              <p>{user.emailAddress}</p>
              <p>{user.xtra}</p> 
            </div>
          </div>
        </div>
            <Button variant="contained" sx={{ backgroundColor: "#000180", foregroundColor: "#FFFFFF", marginLeft: "2em"}} onClick = { () => {logout();}}>Log Out</Button>
        </div>
      </>
    );
  }
}

export default Profile;
