import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function ApprovalRequests({customerData}) {
    const navigate = useNavigate()

    function dateFormat(d) {
        const date = d.substring(0,10)
        return date
    }

    return (
      <><div class = "mx-16">
        <h1 class = "text-subhead">New Requests</h1>
        <TableContainer component = {Paper}  class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell class = "font-bold py-4">Name</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Ticket Number</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Date Created</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Status</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Manage Application</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customerData?.map((row) => {
                        if(row.status.statusCode === "PVN")
                            return (
                                <TableRow key = {row.customerID}>
                                    <TableCell align = "center" component="th" scope = "row">
                                        {row.firstName + " " + row.lastName}
                                    </TableCell>
                                    <TableCell align = "center">{row.customerID}</TableCell>
                                    <TableCell align = "center">{dateFormat(row.createdDatetime)}</TableCell>
                                    <TableCell align = "center">{row.status.shortDescription}</TableCell>
                                    <TableCell align = "center">  
                                        <Button onClick = {() => navigate(`/approval-details/${row.customerID}`)}>Manage</Button>
                                    </TableCell>
                                </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h1 class = "text-subhead mt-16">Completed</h1>
        <TableContainer component = {Paper} class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell class = "font-bold py-4">Name</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Ticket Number</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Date Created</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Status</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Manage Application</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {customerData?.map((row) => {
                        if(row.status.statusCode === "RDY")
                            return (
                                <TableRow key = {row.customerID}>
                                    <TableCell align = "center" component="th" scope = "row">
                                        {row.firstName + " " + row.lastName}
                                    </TableCell>
                                    <TableCell align = "center">{row.customerID}</TableCell>
                                    <TableCell align = "center">{dateFormat(row.createdDatetime)}</TableCell>
                                    <TableCell align = "center">{row.status.shortDescription}</TableCell>
                                    <TableCell align = "center"><Button onClick={() => navigate(`/customer-details/${row.customerID}`)}>View Details</Button>
                                        </TableCell>
                                </TableRow>
                            );
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        {/* <h1 class = "text-subhead mt-16">In Progress</h1>
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
                    {customerData.map((row) => {
                        if(row.status.statusCode === "")
                        return (
                            <TableRow key = {row.ticket}>
                                <TableCell component="th" scope = "row">
                                    {row.name}
                                </TableCell>
                                <TableCell align = "center">{row.ticket}</TableCell>
                                <TableCell align = "center">{dateFormat(row.createdDatetime)}</TableCell>
                                <TableCell align = "right">{row.status}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer> */}
{/* 
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
                    {rows.map((row) => {
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
                    })}
                </TableBody>
            </Table>
        </TableContainer> */}
      </div></>
  
    );
  }
  
  export default ApprovalRequests;