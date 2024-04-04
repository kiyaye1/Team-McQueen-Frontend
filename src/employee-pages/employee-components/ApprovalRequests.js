import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ApprovalRequests({customerData}) {

    function dateFormat(d) {
        const date = d.substring(0,10)
        return date
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
                        <TableCell align = "center">Status</TableCell>
                        <TableCell align = "right">Manage Application</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customerData?.map((row) => {
                        if(row.status.statusCode === "PVN")
                            return (
                                <TableRow key = {row.customerID}>
                                    <TableCell component="th" scope = "row">
                                        {row.firstName + " " + row.lastName}
                                    </TableCell>
                                    <TableCell align = "center">{row.customerID}</TableCell>
                                    <TableCell align = "center">{dateFormat(row.createdDatetime)}</TableCell>
                                    <TableCell align = "center">{row.status.shortDescription}</TableCell>
                                    <TableCell align = "right">  <Link to = {`/approval-details/${row.customerID}`}>Manage Application</Link></TableCell>
                                </TableRow>
                        );
                    })}
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
                        <TableCell align = "center">Status</TableCell>
                        <TableCell align = "right">Manage Application</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {customerData?.map((row) => {
                        if(row.status.statusCode === "RDY")
                            return (
                                <TableRow key = {row.customerID}>
                                    <TableCell component="th" scope = "row">
                                        {row.firstName + " " + row.lastName}
                                    </TableCell>
                                    <TableCell align = "center">{row.customerID}</TableCell>
                                    <TableCell align = "center">{dateFormat(row.createdDatetime)}</TableCell>
                                    <TableCell align = "right">{row.status.shortDescription}</TableCell>
                                    <TableCell align = "right">  <Link to = {`/customer-details/${row.customerID}`}>Customer Details</Link></TableCell>
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