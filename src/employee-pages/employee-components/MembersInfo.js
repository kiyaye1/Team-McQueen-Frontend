import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

function MembersInfo({customerData}) {
    const navigate = useNavigate()

    return (
    <><div class = "mx-16" >
        <h1 class = "text-subhead">Members</h1>
        <TableContainer component = {Paper} class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell class = "font-bold py-4" >Customer ID</TableCell>
                        <TableCell  class = "font-bold py-4" align = "center">Customer Name</TableCell>
                        <TableCell class = "font-bold py-4" align = "center">Rental Status</TableCell>
                        <TableCell  class = "font-bold py-4" align = "center">Customer Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customerData?.map((row) => {
                        if(row.status.statusCode != "PVN")
                            return (
                                <TableRow key = {row.customerID}>
                                    <TableCell align = "center" width="10%" component="th" scope = "row">
                                        {row.customerID}
                                    </TableCell>
                                    <TableCell width="35%" align = "center"> {row.firstName + " " + row.lastName}</TableCell>
                                    <TableCell width="35%" align = "center">{row.status.shortDescription}</TableCell>
                                    <TableCell width="20%" align = "center">
                                        <Button onClick={() => navigate(`/customer-details/${row.customerID}`)}>View Details</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div></>
    );
}

export default MembersInfo;