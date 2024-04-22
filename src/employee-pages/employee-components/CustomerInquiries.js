import BASE_API_URI from "../../config";
import axios from 'axios'
import { useEffect } from "react";
import { FormControl, Box, MenuItem, Select, InputLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField} from "@mui/material"
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

    const recordsPerPage = 5;

    const navigate = useNavigate()
    const {user} = useAuth()

    // get all inquiries, including mechanic request inquiries
    useEffect(() => {
      axios.get(`${BASE_API_URI}/contacts/getCustomerContacts`, {useCredentials: true})
      .then((response) => {
        setInquiries(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    // get mechanic inquiry requests
    useEffect(() => {
      axios.get(`${BASE_API_URI}/contacts/MechanicRequests`, {useCredentials: true})
      .then((response) => {
        console.log(response)
        setServiceReq(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

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

    // sorting and filtering
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

      <><div class = "mx-16 my-8">
      <div>
        <div class = "flex float-right space-x-4">
          <Button onClick = {() => handleOpenMechanicRequest()} size = "small" variant = "contained" sx = {{backgroundColor:  "#000180", color: "white"}}>New Service Request</Button>
          <Button onClick = {() => handleOpenInquiry()} size = "small" variant = "outlined" sx = {{borderColor:  "#000180", color: "#000180"}}>New Inquiry</Button>
        </div>

        <div>
        <h1 class = "text-subhead">New Inquiries</h1>

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
        <TableContainer component = {Paper}  class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell align = "left">Ticket Number</TableCell>
                        <TableCell align = "left">Date Created</TableCell>
                        <TableCell align = "left">Request Type</TableCell>
                        <TableCell align = "left">Description</TableCell>
                        <TableCell align = "left">Status</TableCell>
                        <TableCell align = "right">Manage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inquiries?.map((row) => {

                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 1){
                          return (
                              <TableRow key = {row.requestID}>
                                  <TableCell align = "left" component="th" scope = "row">
                                      {row.requestID}
                                  </TableCell>
                                  <TableCell align = "left">{dateCreated}</TableCell>
                                  <TableCell align = "left">{row.type}</TableCell>
                                  <TableCell align = "left">{row.description}</TableCell>
                                  <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                  <TableCell align = "right"><Button onClick = {() => navigate(`/inquiry-details/${row.requestID}`)} size = "small" variant = "text">View Request</Button></TableCell>
                              </TableRow>
                          );
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </div>


        <h1 class = "mt-8 text-subhead">In Progress Inquiries</h1>
        <TableContainer component = {Paper}  class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell align = "left">Ticket Number</TableCell>
                        <TableCell align = "left">Date Created</TableCell>
                        <TableCell align = "left">Request Type</TableCell>
                        <TableCell align = "left">Description</TableCell>
                        <TableCell align = "left">Status</TableCell>
                        <TableCell align = "right">Manage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inquiries?.map((row) => {

                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 2){
                          return (
                              <TableRow key = {row.requestID}>
                                  <TableCell align = "left" component="th" scope = "row">
                                      {row.requestID}
                                  </TableCell>
                                  <TableCell align = "left">{dateCreated}</TableCell>
                                  <TableCell align = "left">{row.type}</TableCell>
                                  <TableCell align = "left">{row.description}</TableCell>
                                  <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                  <TableCell align = "right"><Button onClick = {() => navigate(`/inquiry-details/${row.requestID}`)} size = "small" variant = "text">View Request</Button></TableCell>
                              </TableRow>
                          );
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>


        <h1 class = "mt-8 text-subhead">Completed Inquiries</h1>
        <TableContainer component = {Paper}  class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell align = "left">Ticket Number</TableCell>
                        <TableCell align = "left">Date Created</TableCell>
                        <TableCell align = "left">Request Type</TableCell>
                        <TableCell align = "left">Description</TableCell>
                        <TableCell align = "left">Status</TableCell>
                        <TableCell align = "right">Manage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inquiries?.map((row) => {

                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 3){
                          return (
                              <TableRow key = {row.requestID}>
                                  <TableCell align = "left" component="th" scope = "row">
                                      {row.requestID}
                                  </TableCell>
                                  <TableCell align = "left">{dateCreated}</TableCell>
                                  <TableCell align = "left">{row.type}</TableCell>
                                  <TableCell align = "left">{row.description}</TableCell>
                                  <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                  <TableCell align = "right"><Button onClick = {() => navigate(`/inquiry-details/${row.requestID}`)} size = "small" variant = "text">View Request</Button></TableCell>
                              </TableRow>
                          );
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
      </div>

      <div class = "mt-16">
      <h1 class = "text-subhead">Mechanic Service Requests</h1>
        <TableContainer component = {Paper}  class = "my-4">
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell align = "left">Ticket Number</TableCell>
                        <TableCell align = "left">Date Created</TableCell>
                        <TableCell align = "left">Car ID</TableCell>
                        <TableCell align = "left">Car Status</TableCell>
                        <TableCell align = "left">Request Status</TableCell>
                        <TableCell align = "right">Manage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serviceReq?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')
                        return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.car.carID}</TableCell>
                                <TableCell align = "left">{row.car.status.shortDescription}</TableCell>
                                <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => navigate(`/service-request-details/${row.requestID}`)} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                      );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
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

      </div></>

  
    );
  }
  
  export default CustomerInquiries;