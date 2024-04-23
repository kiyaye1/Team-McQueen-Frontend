import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Grid, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BASE_API_URI from '../config';

export default function ReservationListing() {
    

    useEffect(() => {
       axios.get(`${BASE_API_URI}/reservations`, {useCredentials: true})
       .then((response) => {

       })
    }, []);

    return (
        <Container className="my-8">

            <TableContainer component={Paper}>
                <Table>
                    <TableHead className="table-head">
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>StationID</TableCell>
                            <TableCell align="right">Completed</TableCell>
                            <TableCell align="right">Current</TableCell>
                            <TableCell align="right">In Progress</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((row, index) => (
                            <TableRow key={index} className="tr">
                                <TableCell>{row.reservationDate}</TableCell>
                                <TableCell>{row.startStationID}</TableCell>
                                <TableCell align="right">{row.Completed}</TableCell>
                                <TableCell align="right">{row.Current}</TableCell>
                                <TableCell align="right">{row.InProgress}</TableCell>
                                <TableCell align="right">{row.Total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
