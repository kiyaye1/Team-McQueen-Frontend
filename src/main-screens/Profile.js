import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BASE_API_URI from "../config";
import '../App.css';
import { useAuth } from '../context/AuthContext'; 
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"

function Profile() {
  const { user, logout } = useAuth();
  sessionStorage.setItem('reservationActive', 'false');
  const navigate = useNavigate();
  const [customer, setCustomer] = useState()
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (user.role === 0) {
      getUserInfo();
      getReservations();
    }
  }, []);

  function editProfile() {

  }

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
      <div className="m-16 grid grid-cols-3 gap-8">
        {/* Profile Information */}
        <div class = "col-span-1 space-y-4">
          <h1 className="text-section-head">Your Account</h1>
          <div className="text-body-copy">
            <h5><span class = 'font-bold'>Name:</span> {user.firstName + " " + user.lastName}</h5>
            <h5><span class = 'font-bold'>Email:</span> {user.emailAddress}</h5>
            <h5><span class = 'font-bold'>Phone Number:</span> {user.xtra}</h5>
          </div>
          {/* Button Group - logout and edit */}
          <div class = "space-x-2">
            <Button variant="contained" sx={{ backgroundColor: "#000180", foregroundColor: "#FFFFFF", marginLeft: "0em"}} onClick = { () => {logout();}}>Log Out</Button>
            <Button variant="outlined" sx={{ borderColor: "#000180", color: "#000180", marginLeft: "0em"}} onClick = { () => {editProfile();}}>Edit Profile</Button>
          </div>
        </div>

        {/* Reservations */}
        <div class = "col-span-2 my-4 grid grid-cols-1 gap-4">
          <h3 className="text-card-title pt-8">Reservations</h3>
          {reservations?.filter(data => data.customer.customerID === user.userID).map((data, key) => {
            dayjs.extend(LocalizedFormat)
            const startDate = dayjs(data.scheduledStartDatetime).format('LLL')
            const endDate = dayjs(data.scheduledEndDatetime).format('LLL')
            
            return (
                <div className="border border-border p-4 rounded-xl" key={key}>
                  {dayjs().isBefore(startDate) && (
                    <div class = "pb-2">
                      <p class = "text-blue-primary font-bold text-sm">Upcoming</p>
                    </div>
                  )}
                  <h4 class = "font-bold">{String(startDate)} - {String(endDate)}</h4>
                  <p class = "text-body-copy">Reservation ID: {data.reservationID}</p>
                  <p class = "text-body-copy">Start: Station {data.startStation.stationID}: {data.startStation.city}, {data.startStation.state}</p>
                  <p class = "text-body-copy">End: Station {data.endStation.stationID}: {data.endStation.city}, {data.endStation.state}</p>

              </div>

            );
          })}   

        </div>     
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
