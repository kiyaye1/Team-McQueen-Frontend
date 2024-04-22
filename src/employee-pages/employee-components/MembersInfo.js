import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Container, FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_API_URI from '../../config';

function MembersInfo() {
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('customerID');
    const [sortOrder, setSortOrder] = useState('ascending');
    const [currentPage, setCurrentPage] = useState(0);  // Start from page 0 like in RequestsTable
    const itemsPerPage = 10;

    useEffect(() => {
        getData()
    }, [])
  
    const getData = async () => {
        const data = await axios.get(`${BASE_API_URI}/customers`, {withCredentials:true})
        setCustomerData(data.data) 
    }

    const handleChangeSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setCurrentPage(0);  // Reset to first page when search changes, similar to RequestsTable
    };

    const handleChangeOrderBy = (event) => {
        setSortField(event.target.value);
    };

    const handleChangeOrder = () => {
        setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
    };

    const getNestedValue = (path, obj) => path.split('.').reduce((prev, curr) => prev && prev[curr], obj);

    const sortData = (data) => {
        return [...data].sort((a, b) => {
            const fieldA = getNestedValue(sortField, a);
            const fieldB = getNestedValue(sortField, b);
            if (fieldA < fieldB) {
                return sortOrder === 'ascending' ? -1 : 1;
            } else if (fieldA > fieldB) {
                return sortOrder === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const filteredAndSortedCustomers = sortData(customerData.filter(customer => {
        return (
            customer.customerID.toString().includes(searchTerm) ||
            (customer.firstName + ' ' + customer.lastName).toLowerCase().includes(searchTerm) ||
            getNestedValue('status.shortDescription', customer).toLowerCase().includes(searchTerm)
        );
    }));

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePreviousPage = () => {
        setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);  // Adjusted to ensure no underflow
    };

    const handleNextPage = () => {
        if (indexOfLastItem < filteredAndSortedCustomers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Container className="my-8">
        <h1 class = "text-section-head pb-8">Members</h1>
            <Box display="flex" justifyContent="space-between" marginBottom={2}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <TextField
                        label="Search by Name, ID, or Status"
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
                            <MenuItem value="status.shortDescription">Rental Status</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={handleChangeOrder}>
                        {sortOrder === 'ascending' ? 'Sort Ascending' : 'Sort Descending'}
                    </Button>
                </div>
            </Box>
            <TableContainer component={Paper} className="my-4">
                <Table>
                <TableHead className="table-head">
                        <TableRow>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Customer ID</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Customer Name</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Rental Status</TableCell>
                            <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Customer Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((customer) => {
                            if(customer.status.statusCode != "PVN") {
                                return (
                                <TableRow key={customer.customerID} class="tr" sx={{align: "center"}}>
                                    <TableCell>{customer.customerID}</TableCell>
                                    <TableCell>{customer.firstName + ' ' + customer.lastName}</TableCell>
                                    <TableCell>{getNestedValue('status.shortDescription', customer)}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => navigate(`/customer-details/${customer.customerID}`)}>View Details</Button>
                                    </TableCell>
                                </TableRow>
                             );}
                        })}
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

export default MembersInfo;