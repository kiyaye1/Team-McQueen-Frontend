import { Box } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import BASE_API_URI from "../config";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField} from "@mui/material"
import { useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


function ServiceRequests() {
    const [mechanicRequests, setMechanicRequests] = useState()
    const navigate = useNavigate()
    const [openMechanicRequest, setOpenMechanicRequest] = useState(false)
    const [newRequestData, setNewRequestData] = useState({})
    const {user} = useAuth()


    useEffect(() => {
      axios.get(`${BASE_API_URI}/contacts/MechanicRequests`, {withCredentials:true})
      .then((response) => {

        setMechanicRequests(response.data)
      })
      .catch((error) => {
        console.log(error)
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
        .catch((error) => console.log(error))
    }

    return (
      <>
      <div class = "m-16">
        <div class = "">
          <h1 class = "text-section-head">Mechanic Service Requests</h1>
          <Button onClick = {() => handleOpenAddRequest()} size = "small" variant = "closed" sx = {{float: "right", backgroundColor: "#000180", color: "white"}}>Create Request</Button>
        </div>
    

      <h3 class = "text-subhead mt-8" >New Requests</h3>
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
                    {mechanicRequests?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 1) {
                          return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.car.carID}</TableCell>
                                <TableCell align = "left">{row.car.status.shortDescription}</TableCell>
                                <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => {navigate(`/service-request-details/${row.requestID}`)}} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                        );
                      }
                    })}
                </TableBody>
            </Table>
        </TableContainer>






        <h3 class = "text-subhead mt-8" >In Progress Requests</h3>
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
                    {mechanicRequests?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 2) {
                          return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.car.carID}</TableCell>
                                <TableCell align = "left">{row.car.status.shortDescription}</TableCell>
                                <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => {navigate(`/service-request-details/${row.requestID}`)}} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                        );
                      }
                    })}
                </TableBody>
            </Table>
        </TableContainer>




        <h3 class = "text-subhead mt-8" >Completed Requests</h3>
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
                    {mechanicRequests?.map((row) => {
                        dayjs.extend(LocalizedFormat)
                        const dateCreated = dayjs(row.createdDatetime).format('LL')

                        if(row.requestStatus.statusID == 3) {
                          return (
                            <TableRow key = {row.requestID}>
                                <TableCell align = "left" component="th" scope = "row">
                                    {row.requestID}
                                </TableCell>
                                <TableCell align = "left">{dateCreated}</TableCell>
                                <TableCell align = "left">{row.car.carID}</TableCell>
                                <TableCell align = "left">{row.car.status.shortDescription}</TableCell>
                                <TableCell align = "left">{row.requestStatus.name}</TableCell>
                                <TableCell align = "right"><Button onClick = {() => {navigate(`/service-request-details/${row.requestID}`)}} size = "small" variant = "text">View Request</Button></TableCell>
                            </TableRow>
                        );
                      }
                    })}
                </TableBody>
            </Table>
        </TableContainer>



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
      </div>
      </>
  
    );
  }
  
  export default ServiceRequests;