import { Button } from "@mui/material";
import {Link} from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

function Profile({toggleLogIn, loginEmployee}) {
    const [customerID, setCustomerID] = useState()
    const [customer, setCustomer] = useState()
    const [reservations, setReservations] = useState()

    function handleLogout() {
        localStorage.setItem('isLoggedIn', 'false')
        localStorage.setItem('isEmployee', 'false')
    }

    useEffect(() => {
      getLoggedInUser()
      getReservations()
      // getCustomerInfo()
    }, [])

    function getLoggedInUser() {
      axios.get('https://api.mcqueen-gyrocar.com/loginInfo/getID', {withCredentials:true})
        .then(response => {
          console.log(response.data.ID)
          setCustomerID(response.data.ID)
          
          axios.get(`https://api.mcqueen-gyrocar.com/customers/${response.data.ID}`, {withCredentials: true})
            .then(response => {
              console.log(response.data)
              setCustomer(response.data)
      
            })
            .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
    }

    function getReservations() {
      axios.get('https://api.mcqueen-gyrocar.com/reservations', {withCredentials:true})
      .then(response => {
        console.log(response.data)
        setReservations(response.data)  
      })
      .catch(error => console.log(error))
    }

    return (
      <><div className="Profile">
        <h1>Profile</h1>
        <h3>{customer?.firstName + "" + customer?.lastName}</h3>
        {reservations?.map((data, key) => {
          if(data.customer.customerID === customerID) {
            return (
              <div key = {key}>
                <p>Reservation ID: {data.reservationID}</p>
                <p>Scheduled Start Time: {data.scheduledStartDatetime}</p>
                <p>Start Station: {data.startStation.stationID}</p>
                <p>Scheduled End Time: {data.scheduledEndDatetime}</p>
                <p>End Station: {data.endStation.stationID}</p>
              </div>
            );
          }
        })}
          <Link to = "/">
            <Button variant = "text" onClick = { () => {toggleLogIn(false); loginEmployee(false); handleLogout()}}>Log Out</Button>
          </Link>
      </div></>
  
    );
  }
  
  export default Profile;