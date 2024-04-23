import BASE_API_URI from "../../config";
import axios from 'axios'
import { useEffect } from "react";
import { FormControl, Box, MenuItem, Container, Select, InputLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField} from "@mui/material"
import { useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

function CustomerInquiries() {
    const [inquiries, setInquiries] = useState()
    const [serviceReq, setServiceReq] = useState()
    const [openMechanicRequest, setOpenMechanicRequest] = useState(false)
    const [newMechanicData, setNewMechanicData] = useState({})
    const [openNewInquiry, setOpenNewInquiry] = useState(false)
    const [newInquiryData, setNewInquiryData] = useState({})

    const [searchQueryNew, setSearchQueryNew] = useState('');
    const [currentPageNew, setCurrentPageNew] = useState(0);
    const [searchQueryInProgress, setSearchQueryInProgress] = useState('');
    const [currentPageInProgress, setCurrentPageInProgress] = useState(0);
    const [searchQueryCompleted, setSearchQueryCompleted] = useState('');
    const [currentPageCompleted, setCurrentPageCompleted] = useState(0);
    const [searchQueryMechanic, setSearchQueryMechanic] = useState('');
    const [currentPageMechanic, setCurrentPageMechanic] = useState(0);

    const {user} = useAuth()

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

    // adding mechanic request
    const handleOpenMechanicRequest = () => {
      setOpenMechanicRequest(true)
      setNewMechanicData({})
    }

    const handleRequestChange = (event) => {
      const {name, value} = event.target;
      setNewMechanicData(prev => ({...prev, [name]: value}))
    }
    
    const handleCreateMechanicRequest = () => {
      axios.post(`${BASE_API_URI}/contacts/MechanicRequests`, 
      {
        description: newMechanicData.description,
        carID: newMechanicData.carID,
        creatorID: user.userID
      },
      {withCredentials: true})
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    }

    // handle close for both modals
    const handleClose = () => {
      setOpenMechanicRequest(false)
      setOpenNewInquiry(false)
    };

    // adding new customer inquiry
    const handleOpenInquiry = () => {
      setOpenNewInquiry(true)
      setNewInquiryData({})
    }

    const handleInquiryChange = (event) => {
      const {name, value} = event.target;
      setNewMechanicData(prev => ({...prev, [name]: value}))
    }

    const handleCreateInquiry = () => {
      axios.post(`${BASE_API_URI}/contacts/MechanicRequests`, 
      {
        description: newMechanicData.description,
        carID: newMechanicData.carID,
        creatorID: user.userID
      },
      {withCredentials: true})
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    }

    const filteredNew = inquiries?.filter(inquiry =>
        inquiry.requestStatus.statusID === 1 && (
            inquiry.description.toLowerCase().includes(searchQueryNew.toLowerCase()) ||
            inquiry.requestID.toString().includes(searchQueryNew) ||
            dayjs(inquiry.createdDatetime).format('LL').toString().toLowerCase().includes(searchQueryNew.toLowerCase()) ||
            inquiry.type.toLowerCase().includes(searchQueryNew.toLowerCase())
        )
    );
    const currentPageDataNew = filteredNew?.slice(currentPageNew * recordsPerPage, (currentPageNew + 1) * recordsPerPage);
    
    const filteredInProgress = inquiries?.filter(inquiry =>
        inquiry.requestStatus.statusID === 2 && (
            inquiry.description.toLowerCase().includes(searchQueryInProgress.toLowerCase()) ||
            inquiry.requestID.toString().includes(searchQueryInProgress) ||
            dayjs(inquiry.createdDatetime).format('LL').toString().toLowerCase().includes(searchQueryInProgress.toLowerCase()) ||
            inquiry.type.toLowerCase().includes(searchQueryInProgress.toLowerCase())
        )
    );
    const currentPageDataInProgress = filteredInProgress?.slice(currentPageInProgress * recordsPerPage, (currentPageInProgress + 1) * recordsPerPage);
    
    const filteredCompleted = inquiries?.filter(inquiry =>
        inquiry.requestStatus.statusID === 3 && (
            inquiry.description.toLowerCase().includes(searchQueryCompleted.toLowerCase()) ||
            inquiry.requestID.toString().includes(searchQueryCompleted) ||
            dayjs(inquiry.createdDatetime).format('LL').toString().toLowerCase().includes(searchQueryCompleted.toLowerCase()) ||
            inquiry.type.toLowerCase().includes(searchQueryCompleted.toLowerCase())
        )
    );
    const currentPageDataCompleted = filteredCompleted?.slice(currentPageCompleted * recordsPerPage, (currentPageCompleted + 1) * recordsPerPage);
    
    const filteredMechanic = serviceReq?.filter(request =>
        request.car.carID.toString().toLowerCase().includes(searchQueryMechanic.toLowerCase()) ||
        request.requestStatus.name.toString().toLowerCase().includes(searchQueryMechanic.toLowerCase()) ||
        request.requestID.toString().includes(searchQueryMechanic) ||
        dayjs(request.createdDatetime).format('LL').toString().toLowerCase().includes(searchQueryMechanic.toLowerCase()) ||
        request.car.status.shortDescription.toLowerCase().includes(searchQueryMechanic.toLowerCase())
    );
    const currentPageDataMechanic = filteredMechanic?.slice(currentPageMechanic * recordsPerPage, (currentPageMechanic + 1) * recordsPerPage);
    
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
                <div class = "flex float-right space-x-4">
                  <Button onClick = {() => handleOpenMechanicRequest()} size = "small" variant = "contained" sx = {{backgroundColor:  "#000180", color: "white"}}>New Service Request</Button>
                  <Button onClick = {() => handleOpenInquiry()} size = "small" variant = "outlined" sx = {{borderColor:  "#000180", color: "#000180"}}>New Inquiry</Button>
                </div>
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
                            {currentPageDataNew?.map((inquiry) => (
                                <TableRow key={inquiry.requestID} class = "tr">
                                    <TableCell>{inquiry.requestID}</TableCell>
                                    <TableCell>{dayjs(inquiry.createdDatetime).format('LL')}</TableCell>
                                    <TableCell>{inquiry.type}</TableCell>
                                    <TableCell>{inquiry.description}</TableCell>
                                    <TableCell>{inquiry.requestStatus.name}</TableCell>
                                    <TableCell align="right">
                                        <Button sx = {{color: "#000180"}}  onClick={() => handleNavigate(inquiry.requestID)} size="small" variant="text">View Request</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageNew(currentPageNew - 1)} disabled={currentPageNew === 0}>Previous</Button>
                    <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageNew(currentPageNew + 1)} disabled={(currentPageNew + 1) * recordsPerPage >= filteredNew?.length}>Next</Button>
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
                            {currentPageDataInProgress?.map((inquiry) => (
                                <TableRow key={inquiry.requestID} class = "tr">
                                    <TableCell>{inquiry.requestID}</TableCell>
                                    <TableCell>{dayjs(inquiry.createdDatetime).format('LL')}</TableCell>
                                    <TableCell>{inquiry.type}</TableCell>
                                    <TableCell>{inquiry.description}</TableCell>
                                    <TableCell>{inquiry.requestStatus.name}</TableCell>
                                    <TableCell align="right">
                                        <Button sx = {{color: "#000180"}} onClick={() => handleNavigate(inquiry.requestID)} size="small" variant="text">View Request</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageInProgress(currentPageInProgress - 1)} disabled={currentPageInProgress === 0}>Previous</Button>
                    <Button sx = {{color: "#000180"}}  onClick={() => setCurrentPageInProgress(currentPageInProgress + 1)} disabled={(currentPageInProgress + 1) * recordsPerPage >= filteredInProgress?.length}>Next</Button>
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
                            {currentPageDataCompleted?.map((inquiry) => (
                                <TableRow key={inquiry.requestID} class = "tr">
                                    <TableCell>{inquiry.requestID}</TableCell>
                                    <TableCell>{dayjs(inquiry.createdDatetime).format('LL')}</TableCell>
                                    <TableCell>{inquiry.type}</TableCell>
                                    <TableCell>{inquiry.description}</TableCell>
                                    <TableCell>{inquiry.requestStatus.name}</TableCell>
                                    <TableCell align="right">
                                        <Button sx = {{color: "#000180"}} onClick={() => handleNavigate(inquiry.requestID)} size="small" variant="text">View Request</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageCompleted(currentPageCompleted - 1)} disabled={currentPageCompleted === 0}>Previous</Button>
                    <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageCompleted(currentPageCompleted + 1)} disabled={(currentPageCompleted + 1) * recordsPerPage >= filteredCompleted?.length}>Next</Button>
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
                            {currentPageDataMechanic?.map((request) => (
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
                    <Button onClick={() => setCurrentPageMechanic(currentPageMechanic + 1)} disabled={(currentPageMechanic + 1) * recordsPerPage >= filteredMechanic?.length}>Next</Button>
                </Box>
            </div>


            <Dialog open = {openMechanicRequest} onClose = {handleClose}>
            <DialogTitle>Create Mechanic Service Request</DialogTitle>
            <DialogContent>
                <div class = "space-y-4 p-4">
                  <TextField margin="dense" name="carID" label="Car Number" fullWidth value={newMechanicData.carID} onChange={handleRequestChange} required/>
                  <TextField margin="dense" name="description" label="Description" fullWidth value={newMechanicData.description} onChange={handleRequestChange} required/>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { handleCreateMechanicRequest(); handleClose();}} color="primary">Create Request</Button>
            </DialogActions>
        </Dialog>


        <Dialog open = {openNewInquiry} onClose = {handleClose}>
            <DialogTitle>Create Customer Service Inquiry</DialogTitle>
            <DialogContent>
                <div class = "space-y-4 p-4">
                  <TextField margin="dense" name="name" label="Customer Name" fullWidth value={newInquiryData.name} onChange={handleInquiryChange} required/>
                  <TextField margin="dense" name="email" label="Email" fullWidth value={newInquiryData.email} onChange={handleInquiryChange} required/>
                  <FormControl fullWidth>
                  <InputLabel id="reason-select">Reason</InputLabel>
                    <Select
                      labelId = "reason-select"
                      value = {newInquiryData.reason}
                      label = "Reason"
                      onChange = {handleInquiryChange}
                      sx = {{ backgroundColor: 'white', borderRadius: '4px'}}
                      required
                     >
                          <MenuItem value = "Website feedback">Website Feedback</MenuItem>
                          <MenuItem value = "General Feedback">General Feedback</MenuItem>
                          <MenuItem value = "Vehicle Inquiries">Vehicle Inquiries</MenuItem>
                          <MenuItem value = "General Questions">General Questions</MenuItem>
                      </Select>
                  </FormControl>
                  <TextField margin="dense" name="message" label="Message" fullWidth value={newInquiryData.message} onChange={handleInquiryChange} required/>

                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { handleCreateInquiry(); handleClose();}} color="primary">Create Inquiry</Button>
            </DialogActions>
        </Dialog>


        </Container>
    );
}

export default CustomerInquiries;