import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import BASE_API_URI from "../../config";
import { useAuth } from "../../context/AuthContext";

// todo: set data in useeffect so it reloads when the data changes

function CustomerDetails(props) {

    const navigate = useNavigate()

    const params = useParams()
    const customerId = params.id
    const [customer, setCustomer] = useState()

    const [reservations, setReservations] = useState([])
    const {user} = useAuth()

    useEffect(() => {
      getData()
      getReservations()
    }, [])

    const getData = async () => {
        const data = await axios.get(`${BASE_API_URI}/customers/${customerId}`, {withCredentials:true})
        setCustomer(data.data)
        console.log(data.data)
    }

    function getReservations() {
      axios.get(`${BASE_API_URI}/reservations`, { withCredentials: true })
        .then(response => {
          setReservations(response.data);
        })
        .catch(error => console.log(error));
    }

    function suspendCustomer() {
      axios.patch(`${BASE_API_URI}/customers/${customerId}`, {
          statusCode: "SPD"
      }, {withCredentials: true})
      .then(response => {
        console.log(response)
        alert("Customer suspended: " + response.data);
      })
      .catch(error => console.log(error))
    }

    function terminateCustomer() {
        axios.patch(`${BASE_API_URI}/customers/${customerId}`, {
            statusCode: "BND"
        }, {withCredentials:true})
        .then(response => {
          console.log(response)
          alert("Customer banned: " + response.data);
        })
        .catch(error => console.log(error))
    }
    

    return (
      <><div class = "mx-16 my-8">
        <Button sx = {{marginBottom: '16px'}} onClick = {() => navigate(-1)}>Back to Customer List</Button>

        <div class = "w-full flex justify-between">
          <h1 class = "text-section-head">{customer?.firstName + " " + (customer?.middleInitial ? customer?.middleInitial : "") + " " + customer?.lastName}</h1>
          <div>
            <Button variant = "outlined" onClick = {() => terminateCustomer()}>Terminate </Button>
            <Button onClick = {() => suspendCustomer()}>Suspend</Button>
          </div>
        </div>

        <div class = "mt-4 grid grid-cols-2 xl:grid-cols-4 gap-4 border border-border rounded-xl py-8 px-4">
          <p>
            <span class = "font-bold">Account Number: </span>
            {customer?.customerID}
          </p>
          <p>
            <span class = "font-bold">Account Status: </span>
            {customer?.status.shortDescription}
          </p>
          <p>
            <span class = "font-bold">Phone Number: </span>
            {customer?.phoneNumber}
          </p>
          <p>
            <span class = "font-bold">Email: </span>
            {customer?.emailAddress}
          </p>
          <p>
            <span class = "font-bold">Driver's License Number: </span>
            {customer?.driversLicenseNum}
          </p>
          <p>
            <span class = "font-bold">Driver's License State: </span>
            {customer?.driversLicenseState}
          </p>
          <p>
            <span class = "font-bold">Suffix: </span>
            {customer?.suffix ? customer?.suffix : "N/A"}
          </p>
        </div>

        {/* <div class = "my-8">
          <h2 class = "text-subhead">Reservations</h2>
          {reservations?.filter(data => data.customer.customerID === user.userID).map((data, key) => (
          <div className="mb-8" key={key}>
            <p>Reservation ID: {data.reservationID}</p>
            <p>Scheduled Start Time: {data.scheduledStartDatetime}</p>
            <p>Start Station: {data.startStation.stationID}</p>
            <p>Scheduled End Time: {data.scheduledEndDatetime}</p>
            <p>End Station: {data.endStation.stationID}</p>
          </div>
        ))}  
        </div> */}
      </div></>
  
    );
  }
  
  export default CustomerDetails;