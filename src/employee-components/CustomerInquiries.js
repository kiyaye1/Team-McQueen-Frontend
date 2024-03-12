import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function CustomerInquiries() {

    function createData(name, ticket, date, status) {
      return {name, ticket, date, status}
    }

    // will come from API/Database
    const rows = [
        createData("Customer 1", "1", "03/12/2024", "new"),
        createData("Customer 2", "2", "03/11/2024", "new"),
        createData("Customer 3", "3", "03/10/2024", "new"),
        createData("Customer 4", "4", "03/09/2024", "new")
    ]
    return (

      <><div class = "mx-16">
        <h1 class = "text-subhead">New Inquiries</h1>
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
        </TableContainer>
      </div></>

  
    );
  }
  
  export default CustomerInquiries;