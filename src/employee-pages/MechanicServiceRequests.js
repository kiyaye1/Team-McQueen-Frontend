import { Box } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import BASE_API_URI from "../config";
import { TableContainer, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Table, TextField, Container, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material"
import { useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


function ServiceRequests() {
    const [openMechanicRequest, setOpenMechanicRequest] = useState(false)
    const [newRequestData, setNewRequestData] = useState({})
    const {user} = useAuth()
    const [mechanicRequests, setMechanicRequests] = useState([]);
    const [searchQueryNew, setSearchQueryNew] = useState('');
    const [currentPageNew, setCurrentPageNew] = useState(0);
    const [searchQueryInProgress, setSearchQueryInProgress] = useState('');
    const [currentPageInProgress, setCurrentPageInProgress] = useState(0);
    const [searchQueryCompleted, setSearchQueryCompleted] = useState('');
    const [currentPageCompleted, setCurrentPageCompleted] = useState(0);

    const recordsPerPage = 5;

    const navigate = useNavigate()

    useEffect(() => {
      axios.get(`${BASE_API_URI}/contacts/MechanicRequests`, {withCredentials:true})
      .then((response) => {

        setMechanicRequests(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        alert("There was an error fetching the data for this page. Please try again later.")
      })
    }, [])

    // todo: modal to edit request - add a fix description.
    // split by new, inprogress, and completed

    const handleOpenAddRequest = () => {
      setOpenMechanicRequest(true)
      setNewRequestData({})
    }

    const handleClose = () => {
      setOpenMechanicRequest(false)
    };

    const handleChange = (event) => {
      const {name, value} = event.target;
      setNewRequestData(prev => ({...prev, [name]: value}))
    }

    const handleCreateMechanicRequest = () => {
        axios.post(`${BASE_API_URI}/contacts/MechanicRequests`, 
        {
          description: newRequestData.description,
          carID: newRequestData.carID,
          creatorID: user.userID
        },
        {withCredentials: true})
        .then((response) => console.log(response))
        
      }

    const filteredNew = mechanicRequests.filter(request =>
      request.requestStatus.statusID === 1 &&
      (request.car.carID.toString().toLowerCase().includes(searchQueryNew.toLowerCase()) ||
      request.requestID.toString().includes(searchQueryNew) ||
      request.car.status.shortDescription.toLowerCase().includes(searchQueryNew.toLowerCase()) ||
      dayjs(request.createdDatetime).format('LL').toLowerCase().includes(searchQueryNew.toLowerCase()))
    );
    const currentPageDataNew = filteredNew.slice(currentPageNew * recordsPerPage, (currentPageNew + 1) * recordsPerPage);

    const filteredInProgress = mechanicRequests.filter(request =>
      request.requestStatus.statusID === 2 &&
      (request.car.carID.toString().toLowerCase().includes(searchQueryInProgress.toLowerCase()) ||
      request.requestID.toString().includes(searchQueryInProgress) ||
      request.car.status.shortDescription.toLowerCase().includes(searchQueryInProgress.toLowerCase()) ||
      dayjs(request.createdDatetime).format('LL').toLowerCase().includes(searchQueryInProgress.toLowerCase()))
    );
    const currentPageDataInProgress = filteredInProgress.slice(currentPageInProgress * recordsPerPage, (currentPageInProgress + 1) * recordsPerPage);

    const filteredCompleted = mechanicRequests.filter(request =>
      request.requestStatus.statusID === 3 &&
      (request.car.carID.toString().toLowerCase().includes(searchQueryCompleted.toLowerCase()) ||
      request.requestID.toString().includes(searchQueryCompleted) ||
      request.car.status.shortDescription.toLowerCase().includes(searchQueryCompleted.toLowerCase()) ||
      dayjs(request.createdDatetime).format('LL').toLowerCase().includes(searchQueryCompleted.toLowerCase()))
    );
    const currentPageDataCompleted = filteredCompleted.slice(currentPageCompleted * recordsPerPage, (currentPageCompleted + 1) * recordsPerPage);

    // todo: modal to edit request - add a fix description.
    // split by new, inprogress, and completed

    return (
      <Container className="my-16">
        <div>
        <div class = "">
          <h1 class = "text-section-head pb-8">Mechanic Service Requests</h1>
          <Button onClick = {() => handleOpenAddRequest()} size = "small" variant = "contained" sx = {{float: "right", backgroundColor: "#000180", color: "white"}}>Create Request</Button>
        </div>
          <h3 class="text-subhead pr-4">New Requests</h3>
          <Box display="flex" justifyContent="space-between" marginBottom={2} marginTop={3}>
            <div style={{ display: 'flex' }}>
              <TextField
                label="Search New Requests"
                variant="outlined"
                value={searchQueryNew}
                onChange={(e) => {
                  setSearchQueryNew(e.target.value.toLowerCase());
                  setCurrentPageNew(0); // Reset to the first page
                } }
                style={{ marginBottom: '10px', width: '350px' }} />
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
                {currentPageDataNew.map((request) => (
                  <TableRow key={request.requestID} class = "tr">
                    <TableCell>{request.requestID}</TableCell>
                    <TableCell>{dayjs(request.createdDatetime).format('LL')}</TableCell>
                    <TableCell>{request.car.carID}</TableCell>
                    <TableCell>{request.car.status.shortDescription}</TableCell>
                    <TableCell>{request.requestStatus.name}</TableCell>
                    <TableCell align="right">
                      <Button sx = {{color: "#000180"}} onClick={() => navigate(`/service-request-details/${request.requestID}`)} size="small">View Request</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageNew(currentPageNew - 1)} disabled={currentPageNew === 0}>Previous</Button>
            <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageNew(currentPageNew + 1)} disabled={(currentPageNew + 1) * recordsPerPage >= filteredNew.length}>Next</Button>
          </Box>
        </div>
        
        <div>
          <h3 class="text-subhead pr-4">In Progress Requests</h3>
          <Box display="flex" justifyContent="space-between" marginBottom={2} marginTop={3}>
            <div style={{ display: 'flex' }}>
              <TextField
                label="Search In Progress Requests"
                variant="outlined"
                value={searchQueryInProgress}
                onChange={(e) => {
                  setSearchQueryInProgress(e.target.value.toLowerCase());
                  setCurrentPageInProgress(0); // Reset to the first page
                } }
                style={{ margin: '10px 0', width: '350px' }} 
              />   
            </div>
          </Box>
          <TableContainer component={Paper} className="my-4">
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
                {currentPageDataInProgress.map((request) => (
                  <TableRow key={request.requestID} class = "tr">
                    <TableCell>{request.requestID}</TableCell>
                    <TableCell>{dayjs(request.createdDatetime).format('LL')}</TableCell>
                    <TableCell>{request.car.carID}</TableCell>
                    <TableCell>{request.car.status.shortDescription}</TableCell>
                    <TableCell>{request.requestStatus.name}</TableCell>
                    <TableCell align="right">
                      <Button sx = {{color: "#000180"}} onClick={() => navigate(`/service-request-details/${request.requestID}`)} size="small">View Request</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageInProgress(currentPageInProgress - 1)} disabled={currentPageInProgress === 0}>Previous</Button>
            <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageInProgress(currentPageInProgress + 1)} disabled={(currentPageInProgress + 1) * recordsPerPage >= filteredInProgress.length}>Next</Button>
          </Box>
        </div>

        <div>
          <h3 class="text-subhead pr-4">Completed Requests</h3>
          <Box display="flex" justifyContent="space-between" marginBottom={2} marginTop={3}>
            <div style={{ display: 'flex' }}>
              <TextField
                label="Search Completed Requests"
                variant="outlined"
                value={searchQueryCompleted}
                onChange={(e) => {
                  setSearchQueryCompleted(e.target.value.toLowerCase());
                  setCurrentPageCompleted(0); // Reset to the first page
                } }
                style={{ margin: '10px 0', width: '350px' }} 
              />
            </div>
          </Box>
          <TableContainer component={Paper} className="my-4">
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
                {currentPageDataCompleted.map((request) => (
                  <TableRow key={request.requestID} class = "tr">
                    <TableCell>{request.requestID}</TableCell>
                    <TableCell>{dayjs(request.createdDatetime).format('LL')}</TableCell>
                    <TableCell>{request.car.carID}</TableCell>
                    <TableCell>{request.car.status.shortDescription}</TableCell>
                    <TableCell>{request.requestStatus.name}</TableCell>
                    <TableCell align="right">
                      <Button sx = {{color: "#000180"}} onClick={() => navigate(`/service-request-details/${request.requestID}`)} size="small">View Request</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageCompleted(currentPageCompleted - 1)} disabled={currentPageCompleted === 0}>Previous</Button>
            <Button sx = {{color: "#000180"}} onClick={() => setCurrentPageCompleted(currentPageCompleted + 1)} disabled={(currentPageCompleted + 1) * recordsPerPage >= filteredCompleted.length}>Next</Button>
          </Box>
        </div>

        <Dialog open = {openMechanicRequest} onClose = {handleClose}>
                <DialogTitle>Create Mechanic Service Request</DialogTitle>
                <DialogContent>
                    <div class = "space-y-4 p-4">
                      <TextField margin="dense" name="carID" label="Car Number" fullWidth value={newRequestData.carID} onChange={handleChange} required/>
                      <TextField margin="dense" name="description" label="Description" fullWidth value={newRequestData.description} onChange={handleChange} required/>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { handleCreateMechanicRequest(); handleClose();}} color="primary">Create Request</Button>
                </DialogActions>
            </Dialog>
            
        </Container>
    );
}

export default ServiceRequests;
