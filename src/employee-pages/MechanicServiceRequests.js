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

    useEffect(() => {
      axios.get(`${BASE_API_URI}/contacts/getMechanicRequests`, {withCredentials:true})
      .then((response) => {

        setMechanicRequests(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    return (
      <>
      <div class = "m-16">
      <h1 class = "text-subhead">Mechanic Service Requests</h1>
        <TableContainer component = {Paper}  class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell align = "left">Ticket Number</TableCell>
                        <TableCell align = "left">Date Created</TableCell>
                        <TableCell align = "left">Car ID</TableCell>
                        <TableCell align = "left">Description</TableCell>
                        {/* <TableCell align = "left">Status</TableCell> */}
                        <TableCell align = "Center">Manage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mechanicRequests?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LLL')
                        return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.carID}</TableCell>
                                <TableCell align = "left">{row.disposition.slice(0,30)}{row.disposition.length > 30 ? "..." : ""}</TableCell>
                                <TableCell align = "left"><Button size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                      );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
      </div>
      </>
  
    );
  }
  
  export default ServiceRequests;