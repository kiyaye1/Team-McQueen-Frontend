import { Box } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import BASE_API_URI from "../config";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material"
import { useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"
import { useNavigate } from 'react-router-dom';

function ServiceRequests() {
    const [mechanicRequests, setMechanicRequests] = useState()
    const navigate = useNavigate()

    useEffect(() => {
      axios.get(`${BASE_API_URI}/contacts/MechanicRequests`, {withCredentials:true})
      .then((response) => {

        setMechanicRequests(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    // todo: modal to edit request - add a fix description.
    // split by new, inprogress, and completed

    return (
      <>
      <div class = "m-16">
      <h1 class = "text-section-head">Mechanic Service Requests</h1>

      <h3 class = "text-subhead mt-8" >New Requests</h3>
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
                    {mechanicRequests?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 1) {
                          return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.car.carID}</TableCell>
                                <TableCell align = "left">{row.car.status.shortDescription}</TableCell>
                                <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => {navigate(`/service-request-details/${row.requestID}`)}} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                        );
                      }
                    })}
                </TableBody>
            </Table>
        </TableContainer>






        <h3 class = "text-subhead mt-8" >In Progress Requests</h3>
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
                    {mechanicRequests?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 2) {
                          return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.car.carID}</TableCell>
                                <TableCell align = "left">{row.car.status.shortDescription}</TableCell>
                                <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => {navigate(`/service-request-details/${row.requestID}`)}} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                        );
                      }
                    })}
                </TableBody>
            </Table>
        </TableContainer>




        <h3 class = "text-subhead mt-8" >Completed Requests</h3>
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
                    {mechanicRequests?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 3) {
                          return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.car.carID}</TableCell>
                                <TableCell align = "left">{row.car.status.shortDescription}</TableCell>
                                <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => {navigate(`/service-request-details/${row.requestID}`)}} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                        );
                      }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
      </div>
      </>
  
    );
  }
  
  export default ServiceRequests;