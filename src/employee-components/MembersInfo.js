import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

function MembersInfo({customerData}) {

    return (
      <><div class = "mx-16" >
        <h1 class = "text-subhead">Members</h1>
        <TableContainer>
            <Table sx={{   }}>
                <TableHead>
                    <TableRow>
                        <TableCell >Customer ID</TableCell>
                        <TableCell  align = "center">Customer Name</TableCell>
                        <TableCell align = "center">Rental Status</TableCell>
                        <TableCell  align = "right">Customer Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customerData?.map((row) => {
                        if(row.status.statusCode != "PVN")
                            return (
                                <TableRow key = {row.customerID}>
                                    <TableCell width="10%" component="th" scope = "row">
                                        {row.customerID}
                                    </TableCell>
                                    <TableCell width="35%" align = "center"> {row.firstName + " " + row.lastName}</TableCell>
                                    <TableCell width="35x%" align = "center">{row.status.shortDescription}</TableCell>
                                    <TableCell width="20%" align = "right">
                                      <Button 
                                        size = "small"
                                      >
                                        {/* pass props for specific person */}
                                      Details
                                      </Button>
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