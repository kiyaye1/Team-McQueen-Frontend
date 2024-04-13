import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BASE_API_URI from "../../config";

function ApprovalDetails() {

    const navigate = useNavigate()

    const params = useParams()
    const customerId = params.id

    const [customer, setCustomer] = useState()


    function approveCustomer() {
      axios.patch(`${BASE_API_URI}/customers/${customerId}`, {
          statusCode: "RDY",
          //emailVerified: 1,
          phoneVerified: 1
      }, {withCredentials:true})
      .then(response =>{
        console.log(response)
        alert("Customer approved: " + response.data);
        // Send email
        sendApprovalEmail();
      })
      .catch(error => console.log(error))
    }

    function suspendCustomer() {
        axios.patch(`${BASE_API_URI}customers/${customerId}`, {
            statusCode: "SPD"
        }, {withCredentials:true})
        .then(response => console.log(response))
        .catch(error => console.log(error))
      }

    useEffect(() => {
      getData()
    }, [])

    const getData = async () => {
        const data = await axios.get(`${BASE_API_URI}/customers/${customerId},`, {withCredentials:true})
        setCustomer(data.data)
        console.log(data.data)
    }

    const sendApprovalEmail = () => {
      if (!customer) {
        console.error('No customer data available');
        return;
      }
    
      axios.post(`${BASE_API_URI}/approvals/send-approval-email`, {
        email: customer.emailAddress,
        firstName: customer.firstName,
        lastName: customer.lastName,
      }, {withCredentials:true})
      .then(response => {
        console.log('Approval email sent:', response.data.message);
      })
      .catch(error => {
        console.error('Failed to send approval email', error);
      });
    };    

    return (
      <><div class = "mx-16 my-8">
        <Button sx = {{marginBottom: '16px'}} onClick = {() => navigate(-1)}>Back to Customer List</Button>

        <div class = "w-full flex justify-between">
            <h1 class = "text-section-head">Customer Approval Ticket</h1>
            <div>
                <Button variant = "outlined" onClick = { () => navigate(-1) }>Save and Exit</Button>
            </div>
        </div>
        <div class = "my-4 grid grid-cols-2 xl:grid-cols-4 gap-4 border border-border rounded-xl py-8 px-4">
            <p>
            <span class = "font-bold">Name: </span>
            {customer?.firstName + " " + customer?.lastName}
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
            <span class = "font-bold">Credit Card Information: </span>
            Verified
          </p>
        </div>
        <div class = "">
            <Button variant = "contained" onClick = {() => approveCustomer()}>Approve</Button>
            <Button variant = "text" onClick = {() => suspendCustomer()}>Deny</Button>

        </div>
      </div></>
  
    );
  }
  
  export default ApprovalDetails;