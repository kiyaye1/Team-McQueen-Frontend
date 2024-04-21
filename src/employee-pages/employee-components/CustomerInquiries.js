import BASE_API_URI from "../../config";
import axios from 'axios'
import { useEffect } from "react";
import { TableContainer, Paper, Table, Container, Box, TextField, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material"
import { useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"
import { useNavigate } from 'react-router-dom';

function CustomerInquiries() {
    const [inquiries, setInquiries] = useState([])
    const [serviceReq, setServiceReq] = useState([])
    const [searchQueryNew, setSearchQueryNew] = useState('');
    const [currentPageNew, setCurrentPageNew] = useState(0);
    const [searchQueryInProgress, setSearchQueryInProgress] = useState('');
    const [currentPageInProgress, setCurrentPageInProgress] = useState(0);
    const [searchQueryCompleted, setSearchQueryCompleted] = useState('');
    const [currentPageCompleted, setCurrentPageCompleted] = useState(0);
    const [searchQueryMechanic, setSearchQueryMechanic] = useState('');
    const [currentPageMechanic, setCurrentPageMechanic] = useState(0);

    const recordsPerPage = 5;
    
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${BASE_API_URI}/contacts/getCustomerContacts`, {withCredentials: true})
            .then(response => {
                setInquiries(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));

        axios.get(`${BASE_API_URI}/contacts/MechanicRequests`, {withCredentials: true})
            .then(response => {
                setServiceReq(response.data);
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    function getMechanic(id) {
        axios.get(`${BASE_API_URI}/employees/${id}}`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const filteredNew = inquiries.filter(inquiry =>
        inquiry.requestStatus.statusID === 1 && (
            inquiry.description.toLowerCase().includes(searchQueryNew.toLowerCase()) ||
            inquiry.requestID.toString().includes(searchQueryNew) ||
            dayjs(inquiry.createdDatetime).format('LL').toString().toLowerCase().includes(searchQueryNew.toLowerCase()) ||
            inquiry.type.toLowerCase().includes(searchQueryNew.toLowerCase())
        )
    );
    const currentPageDataNew = filteredNew.slice(currentPageNew * recordsPerPage, (currentPageNew + 1) * recordsPerPage);
    
    const filteredInProgress = inquiries.filter(inquiry =>
        inquiry.requestStatus.statusID === 2 && (
            inquiry.description.toLowerCase().includes(searchQueryInProgress.toLowerCase()) ||
            inquiry.requestID.toString().includes(searchQueryInProgress) ||
            dayjs(inquiry.createdDatetime).format('LL').toString().toLowerCase().includes(searchQueryInProgress.toLowerCase()) ||
            inquiry.type.toLowerCase().includes(searchQueryInProgress.toLowerCase())
        )
    );
    const currentPageDataInProgress = filteredInProgress.slice(currentPageInProgress * recordsPerPage, (currentPageInProgress + 1) * recordsPerPage);
    
    const filteredCompleted = inquiries.filter(inquiry =>
        inquiry.requestStatus.statusID === 3 && (
            inquiry.description.toLowerCase().includes(searchQueryCompleted.toLowerCase()) ||
            inquiry.requestID.toString().includes(searchQueryCompleted) ||
            dayjs(inquiry.createdDatetime).format('LL').toString().toLowerCase().includes(searchQueryCompleted.toLowerCase()) ||
            inquiry.type.toLowerCase().includes(searchQueryCompleted.toLowerCase())
        )
    );
    const currentPageDataCompleted = filteredCompleted.slice(currentPageCompleted * recordsPerPage, (currentPageCompleted + 1) * recordsPerPage);
    
    const filteredMechanic = serviceReq.filter(request =>
        request.car.carID.toString().toLowerCase().includes(searchQueryMechanic.toLowerCase()) ||
        request.requestStatus.name.toString().toLowerCase().includes(searchQueryMechanic.toLowerCase()) ||
        request.requestID.toString().includes(searchQueryMechanic) ||
        dayjs(request.createdDatetime).format('LL').toString().toLowerCase().includes(searchQueryMechanic.toLowerCase()) ||
        request.car.status.shortDescription.toLowerCase().includes(searchQueryMechanic.toLowerCase())
    );
    const currentPageDataMechanic = filteredMechanic.slice(currentPageMechanic * recordsPerPage, (currentPageMechanic + 1) * recordsPerPage);
    
    const handleNavigate = (id) => {
        navigate(`/inquiry-details/${id}`);
    };

    const handleNavigateMechanic = (id) => {
        navigate(`/service-request-details/${id}`);
    };

    return (
        <Container className="my-8">
            <div>
                <h1 class="text-section-head pb-8">Customer Inquiries</h1>
                <h3 class="text-subhead pr-4">New Inquiries</h3>
                <Box display="flex" justifyContent="space-between" marginBottom={2} marginTop={3}>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            label="Search New Inquiries"
                            variant="outlined"
                            value={searchQueryNew}
                            onChange={(e) => {
                                setSearchQueryNew(e.target.value.toLowerCase());
                                setCurrentPageNew(0);
                            }}
                            style={{ marginBottom: '10px', width: '350px' }}
                        />
                    </div>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead class = "table-head">
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Ticket Number</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Date Created</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Request Type</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Description</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Status</TableCell>
                                <TableCell align="right" sx={{fontWeight: "bold", fontSize: "1em"}}>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentPageDataNew.map((inquiry) => (
                                <TableRow key={inquiry.requestID} class = "tr">
                                    <TableCell>{inquiry.requestID}</TableCell>
                                    <TableCell>{dayjs(inquiry.createdDatetime).format('LL')}</TableCell>
                                    <TableCell>{inquiry.type}</TableCell>
                                    <TableCell>{inquiry.description}</TableCell>
                                    <TableCell>{inquiry.requestStatus.name}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleNavigate(inquiry.requestID)} size="small" variant="text">View Request</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button onClick={() => setCurrentPageNew(currentPageNew - 1)} disabled={currentPageNew === 0}>Previous</Button>
                    <Button onClick={() => setCurrentPageNew(currentPageNew + 1)} disabled={(currentPageNew + 1) * recordsPerPage >= filteredNew.length}>Next</Button>
                </Box>
            </div>

            <div>
                <h3 class="text-subhead pr-4">In Progress Inquiries</h3>
                <Box display="flex" justifyContent="space-between" marginBottom={2} marginTop={3}>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            label="Search In Progress Inquiries"
                            variant="outlined"
                            value={searchQueryInProgress}
                            onChange={(e) => {
                                setSearchQueryInProgress(e.target.value.toLowerCase());
                                setCurrentPageInProgress(0);  // Reset to the first page
                            }}
                            style={{ marginBottom: '10px', width: '350px' }}
                        />
                    </div>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead class = "table-head">
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Ticket Number</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Date Created</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Request Type</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Description</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Status</TableCell>
                                <TableCell align="right" sx={{fontWeight: "bold", fontSize: "1em"}}>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentPageDataInProgress.map((inquiry) => (
                                <TableRow key={inquiry.requestID} class = "tr">
                                    <TableCell>{inquiry.requestID}</TableCell>
                                    <TableCell>{dayjs(inquiry.createdDatetime).format('LL')}</TableCell>
                                    <TableCell>{inquiry.type}</TableCell>
                                    <TableCell>{inquiry.description}</TableCell>
                                    <TableCell>{inquiry.requestStatus.name}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleNavigate(inquiry.requestID)} size="small" variant="text">View Request</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button onClick={() => setCurrentPageInProgress(currentPageInProgress - 1)} disabled={currentPageInProgress === 0}>Previous</Button>
                    <Button onClick={() => setCurrentPageInProgress(currentPageInProgress + 1)} disabled={(currentPageInProgress + 1) * recordsPerPage >= filteredInProgress.length}>Next</Button>
                </Box>
            </div>

            <div>
                <h3 class="text-subhead pr-4">Completed Inquiries</h3>
                <Box display="flex" justifyContent="space-between" marginBottom={2} marginTop={3}>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            label="Search Completed Inquiries"
                            variant="outlined"
                            value={searchQueryCompleted}
                            onChange={(e) => {
                                setSearchQueryCompleted(e.target.value.toLowerCase());
                                setCurrentPageCompleted(0);  // Reset to the first page
                            }}
                            style={{ marginBottom: '10px', width: '350px' }}
                        />
                    </div>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead class = "table-head">
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Ticket Number</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Date Created</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Request Type</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Description</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Status</TableCell>
                                <TableCell align="right" sx={{fontWeight: "bold", fontSize: "1em"}}>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentPageDataCompleted.map((inquiry) => (
                                <TableRow key={inquiry.requestID} class = "tr">
                                    <TableCell>{inquiry.requestID}</TableCell>
                                    <TableCell>{dayjs(inquiry.createdDatetime).format('LL')}</TableCell>
                                    <TableCell>{inquiry.type}</TableCell>
                                    <TableCell>{inquiry.description}</TableCell>
                                    <TableCell>{inquiry.requestStatus.name}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleNavigate(inquiry.requestID)} size="small" variant="text">View Request</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button onClick={() => setCurrentPageCompleted(currentPageCompleted - 1)} disabled={currentPageCompleted === 0}>Previous</Button>
                    <Button onClick={() => setCurrentPageCompleted(currentPageCompleted + 1)} disabled={(currentPageCompleted + 1) * recordsPerPage >= filteredCompleted.length}>Next</Button>
                </Box>
            </div>

            <div>
                <h3 class="text-subhead pr-4">Mechanic Service Requests</h3>
                <Box display="flex" justifyContent="space-between" marginBottom={2} marginTop={3}>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            label="Search Mechanic Service Requests"
                            variant="outlined"
                            value={searchQueryMechanic}
                            onChange={(e) => {
                                setSearchQueryMechanic(e.target.value.toLowerCase());
                                setCurrentPageMechanic(0);  // Reset to the first page
                            }}
                            style={{ marginBottom: '10px', width: '350px' }}
                        />
                    </div>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead class = "table-head">
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Ticket Number</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Date Created</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Car ID</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Car Status</TableCell>
                                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Request Status</TableCell>
                                <TableCell align="right" sx={{fontWeight: "bold", fontSize: "1em"}}>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentPageDataMechanic.map((request) => (
                                <TableRow key={request.requestID} class = "tr">
                                    <TableCell>{request.requestID}</TableCell>
                                    <TableCell>{dayjs(request.createdDatetime).format('LL')}</TableCell>
                                    <TableCell>{request.car.carID}</TableCell>
                                    <TableCell>{request.car.status.shortDescription}</TableCell>
                                    <TableCell>{request.requestStatus.name}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleNavigateMechanic(request.requestID)} size="small" variant="text">View Request</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button onClick={() => setCurrentPageMechanic(currentPageMechanic - 1)} disabled={currentPageMechanic === 0}>Previous</Button>
                    <Button onClick={() => setCurrentPageMechanic(currentPageMechanic + 1)} disabled={(currentPageMechanic + 1) * recordsPerPage >= filteredMechanic.length}>Next</Button>
                </Box>
            </div>

        </Container>
    );
}

export default CustomerInquiries;