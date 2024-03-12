import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ApprovalRequests() {
    const [customerData, setCustomerData] = useState()
    const [pendingCustomers, setPendingCustomers] = useState([])
    const [approvedCustomers, setApprovedCustomers] = useState([])

    useEffect(() => {
        getData()
      }, [])
  
    const getData = async () => {
        const data = await axios.get("https://api.mcqueen-gyrocar.com/customers")
        setCustomerData(data.data) 

        const pending = []
        const approved = []
        for(var i = 0; i < customerData.length; i++) {
            if(customerData[i].status.statusCode === "PVN") {
                pending.push(customerData[i])
            }
            if(customerData[i].status.statusCode === "RDY") {
                approved.push(customerData[i])
            }
        }
        

        setPendingCustomers(pending)
        setApprovedCustomers(approved)
    }


    return (
      <><div class = "mx-16">
        <h1 class = "text-subhead">New Requests</h1>
        <TableContainer>
            <Table sx={{   }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align = "center">Ticket Number</TableCell>
                        <TableCell align = "center">Date Created</TableCell>
                        <TableCell align = "right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pendingCustomers?.map((row) => {
                        return (
                            <TableRow key = {row.customerID}>
                                <TableCell component="th" scope = "row">
                                    {row.firstName + " " + row.lastName}
                                </TableCell>
                                <TableCell align = "center">{row.customerID}</TableCell>
                                <TableCell align = "center">{row.createdDatetime}</TableCell>
                                <TableCell align = "right">{row.status.shortDescription}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h1 class = "text-subhead mt-16">In Progress</h1>
        <TableContainer>
            <Table sx={{   }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align = "center">Ticket Number</TableCell>
                        <TableCell align = "center">Date Created</TableCell>
                        <TableCell align = "right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => {
                        return (
                            <TableRow key = {row.ticket}>
                                <TableCell component="th" scope = "row">
                                    {row.name}
                                </TableCell>
                                <TableCell align = "center">{row.ticket}</TableCell>
                                <TableCell align = "center">{row.date}</TableCell>
                                <TableCell align = "right">{row.status}</TableCell>
                            </TableRow>
                        );
                    })} */}
                </TableBody>
            </Table>
        </TableContainer>

        <h1 class = "text-subhead mt-16">Completed</h1>
        <TableContainer>
            <Table sx={{   }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align = "center">Ticket Number</TableCell>
                        <TableCell align = "center">Date Created</TableCell>
                        <TableCell align = "right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {approvedCustomers?.map((row) => {
                        return (
                            <TableRow key = {row.customerID}>
                                <TableCell component="th" scope = "row">
                                    {row.firstName + " " + row.lastName}
                                </TableCell>
                                <TableCell align = "center">{row.customerID}</TableCell>
                                <TableCell align = "center">{row.createdDatetime}</TableCell>
                                <TableCell align = "right">{row.status.shortDescription}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h1 class = "text-subhead mt-16">On Hold</h1>
        <TableContainer>
            <Table sx={{   }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align = "center">Ticket Number</TableCell>
                        <TableCell align = "center">Date Created</TableCell>
                        <TableCell align = "right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => {
                        return (
                            <TableRow key = {row.ticket}>
                                <TableCell component="th" scope = "row">
                                    {row.name}
                                </TableCell>
                                <TableCell align = "center">{row.ticket}</TableCell>
                                <TableCell align = "center">{row.date}</TableCell>
                                <TableCell align = "right">{row.status}</TableCell>
                            </TableRow>
                        );
                    })} */}
                </TableBody>
            </Table>
        </TableContainer>
      </div></>
  
    );
  }
  
  export default ApprovalRequests;