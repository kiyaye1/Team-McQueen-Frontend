import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from '@mui/material';
import BASE_API_URI from "../config";
import '../App.css';

export default function ApplicationMetrics() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, statusCode, sortField, sortOrder]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${BASE_API_URI}/appmetrics`, {
        startDate, endDate, statusCode, sortField, sortOrder
      }, { withCredentials: true });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container className="my-8">
      <h1 class = "text-section-head pb-8">
                Customer Application Metrics
            </h1>
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
            <InputLabel>Status Code</InputLabel>
            <Select
              value={statusCode}
              label="Status Code"
              onChange={e => setStatusCode(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="PVN">PVN</MenuItem>
              <MenuItem value="RDY">RDY</MenuItem>
              <MenuItem value="BND">BND</MenuItem>
              <MenuItem value="SPD">SPD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth sx={{ width: 140 }}>
            <InputLabel>Sort Field</InputLabel>
            <Select
              value={sortField}
              label="Sort Field"
              onChange={e => setSortField(e.target.value)}
            >
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="count">Total</MenuItem>
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
              <TableCell>Month</TableCell>
              <TableCell>Status Code</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="tr">
                <TableCell>{row.month}</TableCell>
                <TableCell>{row.statusCode}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
        Status Code Key:
      </Typography>
      <Typography variant="body1" align="left" component="div">
        <Box component="span" mr={2}><strong>PVN</strong> - Pending Verification</Box>
        <Box component="span" mr={2}><strong>RDY</strong> - Ready</Box>
        <Box component="span" mr={2}><strong>SPD</strong> - Suspended</Box>
        <Box component="span"><strong>BND</strong> - Banned</Box>
      </Typography>
    </Container>
  );
}