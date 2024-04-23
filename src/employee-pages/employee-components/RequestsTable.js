import React, { useState } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"
import { useNavigate } from 'react-router-dom';

function RequestsTable({ customerData, statusFilter, tableTitle }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('customerID');
    const [sortOrder, setSortOrder] = useState('ascending');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const handleChangeSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setCurrentPage(0); // Reset to first page when search changes
    };

    const handleChangeOrderBy = (event) => {
        setSortField(event.target.value);
    };

    const handleChangeOrder = () => {
        setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
    };

    const sortData = (data) => {
        return [...data].sort((a, b) => {
            if (sortField === 'createdDatetime') {
                const dateA = dayjs(a[sortField]).valueOf();
                const dateB = dayjs(b[sortField]).valueOf();
                return (dateA < dateB) ? (sortOrder === 'ascending' ? -1 : 1) : (dateA > dateB ? (sortOrder === 'ascending' ? 1 : -1) : 0);
            } else {
                const strA = String(a[sortField]).toLowerCase();
                const strB = String(b[sortField]).toLowerCase();
                return (strA < strB) ? (sortOrder === 'ascending' ? -1 : 1) : (strA > strB ? (sortOrder === 'ascending' ? 1 : -1) : 0);
            }
        });
    };

    const filteredAndSortedCustomers = sortData(customerData.filter(customer =>
        customer.status.statusCode === statusFilter &&
        (customer.customerID.toString().includes(searchTerm) ||
        (dayjs(customer.createdDatetime).format('LLL').toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.firstName + ' ' + customer.lastName).toLowerCase().includes(searchTerm))
    ));

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePreviousPage = () => {
        setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
    };

    const handleNextPage = () => {
        if (indexOfLastItem < filteredAndSortedCustomers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <h3 class="text-subhead pr-4">{tableTitle}</h3>
            <Box display="flex" justifyContent="space-between" marginBottom={2} marginTop={3}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <TextField
                        label="Search by ID, Name, or Created Date Time"
                        value={searchTerm}
                        onChange={handleChangeSearch}
                        style={{ width: '350px' }}
                    />
                    <FormControl>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            label="Sort By"
                            value={sortField}
                            onChange={handleChangeOrderBy}
                        >
                            <MenuItem value="customerID">Customer ID</MenuItem>
                            <MenuItem value="firstName">First Name</MenuItem>
                            <MenuItem value="lastName">Last Name</MenuItem>
                            <MenuItem value="createdDatetime">Created Date Time</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={handleChangeOrder}>
                        {sortOrder === 'ascending' ? 'Sort Descending' : 'Sort Ascending'}
                    </Button>
                </div>
            </Box>
            <TableContainer component={Paper} className="my-4">
                <Table>
                    <TableHead class = "table-head">
                        <TableRow>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Customer ID</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Customer Name</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Status</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Created Date Time</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((customer) => (
                            <TableRow key={customer.customerID} class = "tr" sx = {{align: "center"}}>
                                <TableCell>{customer.customerID}</TableCell>
                                <TableCell>{customer.firstName + ' ' + customer.lastName}</TableCell>
                                <TableCell>{customer.status.shortDescription}</TableCell>
                                <TableCell>{dayjs(customer.createdDatetime).format('LLL')}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(
                                        customer.status.statusCode === "PVN" ? 
                                        `/approval-details/${customer.customerID}` : 
                                        `/customer-details/${customer.customerID}`
                                    )}>
                                        {customer.status.statusCode === "PVN" ? "Manage" : "View Details"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</Button>
                <Button onClick={handleNextPage} disabled={indexOfLastItem >= filteredAndSortedCustomers.length}>Next</Button>
            </Box>
        </>
    );
}

export default RequestsTable;
