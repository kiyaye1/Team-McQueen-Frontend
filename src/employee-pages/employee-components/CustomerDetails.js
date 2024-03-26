import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// todo: set data in useeffect so it reloads when the data changes

function CustomerDetails(props) {

    const navigate = useNavigate()

    const params = useParams()
    const customerId = params.id
    const [customer, setCustomer] = useState()

    useEffect(() => {
      getData()
    }, [])

    const getData = async () => {
        const data = await axios.get(`https://api.mcqueen-gyrocar.com/customers/${customerId}`, {withCredentials:true})
        setCustomer(data.data)
        console.log(data.data)
    }

    function suspendCustomer() {
      axios.patch(`https://api.mcqueen-gyrocar.com/customers/${customerId}`, {
          statusCode: "SPD"
      }, {withCredentials: true})
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }

    function terminateCustomer() {
        axios.patch(`https://api.mcqueen-gyrocar.com/customers/${customerId}`, {
            statusCode: "BND"
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
    

    return (
      <><div class = "mx-16 my-8">
        <Button sx = {{marginBottom: '16px'}} onClick = {() => navigate(-1)}>Back to Customer List</Button>

        <div class = "w-full flex justify-between">
          <h1 class = "text-section-head">{customer?.firstName + " " + customer?.middleInitial + " " + customer?.lastName}</h1>
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

        <div class = "my-8">
          <h2 class = "text-subhead">Upcoming Reservations</h2>
          <p>No upcoming reservations</p>
        </div>

        <div>
          <h2 class = "text-subhead">Past Reservations</h2>
          <p>No previous reservations.</p>
        </div>
      </div></>
  
    );
  }
  
  export default CustomerDetails;