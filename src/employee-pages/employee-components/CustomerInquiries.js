import BASE_API_URI from "../../config";
import axios from 'axios'
import { useEffect } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material"
import { useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"
import { useNavigate } from 'react-router-dom';

function CustomerInquiries() {
    const [inquiries, setInquiries] = useState()
    const [serviceReq, setServiceReq] = useState()
    const navigate = useNavigate()

    // get all inquiries, including mechanic request inquiries
    useEffect(() => {
      axios.get(`${BASE_API_URI}/contacts/getCustomerContacts`, {useCredentials: true})
      .then((response) => {
        setInquiries(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    // get mechanic inquiry requests
    useEffect(() => {
      axios.get(`${BASE_API_URI}/contacts/MechanicRequests`, {useCredentials: true})
      .then((response) => {
        console.log(response)
        setServiceReq(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    function getMechanic(id) {
      axios.get(`${BASE_API_URI}/employees/${id}}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    return (

      <><div class = "mx-16 my-8">
      <div>
      <h1 class = "text-subhead">New Inquiries</h1>
        <TableContainer component = {Paper}  class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell align = "left">Ticket Number</TableCell>
                        <TableCell align = "left">Date Created</TableCell>
                        <TableCell align = "left">Request Type</TableCell>
                        <TableCell align = "left">Description</TableCell>
                        <TableCell align = "left">Status</TableCell>
                        <TableCell align = "right">Manage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inquiries?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')
                      
                        return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.type}</TableCell>
                                <TableCell align = "left">{row.description}</TableCell>
                                <TableCell align = "left">{row.statusID}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => navigate(`/inquiry-details/${row.requestID}`)} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                      );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
      </div>

      <div class = "mt-16">
      <h1 class = "text-subhead">Mechanic Service Requests</h1>
        <TableContainer component = {Paper}  class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell align = "left">Ticket Number</TableCell>
                        <TableCell align = "left">Date Created</TableCell>
                        <TableCell align = "left">Car ID</TableCell>
                        <TableCell align = "left">Car Status</TableCell>
                        <TableCell align = "left">Request Status</TableCell>
                        <TableCell align = "right">Manage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serviceReq?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')
                        return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.car.carID}</TableCell>
                                <TableCell align = "left">{row.car.status.shortDescription}</TableCell>
                                <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => navigate(`/service-request-details/${row.requestID}`)} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                      );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
      </div>

      </div></>

  
    );
  }
  
  export default CustomerInquiries;