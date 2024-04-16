import React, { useState } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
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
            if (a[sortField] < b[sortField]) {
                return sortOrder === 'ascending' ? -1 : 1;
            } else if (a[sortField] > b[sortField]) {
                return sortOrder === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const filteredAndSortedCustomers = sortData(customerData.filter(customer =>
        customer.status.statusCode === statusFilter &&
        (customer.customerID.toString().includes(searchTerm) ||
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
        <Container className="my-2">
            <h1 class="text-section-head pb-8">{tableTitle}</h1>
            <Box display="flex" justifyContent="space-between" marginBottom={2}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <TextField
                        label="Search by Name or ID"
                        value={searchTerm}
                        onChange={handleChangeSearch}
                        style={{ width: '250px' }}
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
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((customer) => (
                            <TableRow key={customer.customerID} class = "tr" sx = {{align: "center"}}>
                                <TableCell>{customer.customerID}</TableCell>
                                <TableCell>{customer.firstName + ' ' + customer.lastName}</TableCell>
                                <TableCell>{customer.status.shortDescription}</TableCell>
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
        </Container>
    );
}

export default RequestsTable;
