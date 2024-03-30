import { Button } from "@mui/material";
import {Link} from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

function Profile({toggleLogIn, loginEmployee}) {
    const [customerID, setCustomerID] = useState()
    const [customer, setCustomer] = useState()
    const [reservations, setReservations] = useState()

    function handleLogout() {
        toggleLogIn(false)
        loginEmployee(false)
        localStorage.setItem('isLoggedIn', 'false')
        localStorage.setItem('isEmployee', 'false')
    }

    useEffect(() => {
      getUserInfo()
      getReservations()
      // getCustomerInfo()
    }, [])

    // for testing purposes with Stripe - customer 24
    function getUserInfo() {
      axios.get(`https://api.mcqueen-gyrocar.com/customers/24`, {withCredentials: true})
      .then(response => {
        console.log(response.data)
        setCustomer(response.data)
      })
      .catch(error => console.log(error))
    }

    // Based on who is logged in:
    //
    // function getLoggedInUser() {
    //   axios.get('https://api.mcqueen-gyrocar.com/loginInfo/getID', {withCredentials:true})
    //     .then(response => {
    //       console.log(response.data.ID)
    //       setCustomerID(response.data.ID)
          
    //       axios.get(`https://api.mcqueen-gyrocar.com/customers/${response.data.ID}`, {withCredentials: true})
    //         .then(response => {
    //           console.log(response.data)
    //           setCustomer(response.data)
      
    //         })
    //         .catch(error => console.log(error))
    //   })
    //   .catch(error => console.log(error))
    // }


    // find reservations that match ID 24
    function getReservations() {
      axios.get('https://api.mcqueen-gyrocar.com/reservations', {withCredentials:true})
      .then(response => {
        console.log(response.data)
        setReservations(response.data)  
      })
      .catch(error => console.log(error))
    }

    return (
      <><div class = "m-16">
        <h1 class = "text-section-head">Profile</h1>
        <h3 class = "text-card-title">{customer?.firstName + " " + customer?.lastName}</h3>
        <h3 class = "text-card-title pt-8">Reservations</h3>
        {reservations?.map((data, key) => {
           // find reservations that match ID 24
          if(data.customer.customerID === 24) {
            return (
              <div class = "mb-8" key = {key}>
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
            <Button variant = "outlined" onClick = { () => {handleLogout()}}>Log Out</Button>
          </Link>
      </div></>
  
    );
  }
  
  export default Profile;