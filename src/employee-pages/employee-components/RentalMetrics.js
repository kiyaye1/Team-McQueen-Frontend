import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Grid, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BASE_API_URI from '../../config';

export default function RentalMetrics() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortField, setSortField] = useState('reservationDate');
    const [sortOrder, setSortOrder] = useState('asc');
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (startDate && endDate) { 
                try {
                    const response = await axios.get(`${BASE_API_URI}/rentalmetrics`, {
                        params: { startDate, endDate, sortField, sortOrder },
                        withCredentials: true
                    });
                    setReservations(response.data);
                } catch (error) {
                    console.error('Error fetching rental metrics:', error);
                }
            }
        };
        fetchData();
    }, [startDate, endDate, sortField, sortOrder]);

    return (
        <Container className="my-8">
            <Typography variant="h4" align="left" gutterBottom class="table-title">
                Rental Metrics 
            </Typography>
            <Grid container spacing={2} alignItems="center" marginTop="1em" marginBottom="1em" justifyContent="center">
                <Grid item>
                    <TextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item>
                    <FormControl fullWidth sx={{ width: 140 }}>
                        <InputLabel>Sort Field</InputLabel>
                        <Select
                            value={sortField}
                            label="Sort Field"
                            onChange={e => setSortField(e.target.value)}
                        >
                            <MenuItem value="reservationDate">Date</MenuItem>
                            <MenuItem value="startStationID">Station</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth sx={{ width: 140 }}>
                        <InputLabel>Sort Order</InputLabel>
                        <Select
                            value={sortOrder}
                            label="Sort Order"
                            onChange={e => setSortOrder(e.target.value)}
                        >
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

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
            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
        StationID Key:
      </Typography>
      <Typography variant="body1" align="left" component="div">
        <Box component="span" mr={2}><strong>1</strong> - Northwest</Box>
        <Box component="span" mr={2}><strong>2</strong> - Northeast</Box>
        <Box component="span" mr={2}><strong>3</strong> - Center City</Box>
        <Box component="span" mr={2}><strong>4</strong> - Southeast</Box>
        <Box component="span"><strong>5</strong> - Airport</Box>
      </Typography>
        </Container>
    );
}
