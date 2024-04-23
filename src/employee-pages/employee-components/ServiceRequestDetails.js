import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, TextField} from "@mui/material";
import BASE_API_URI from "../../config";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs"
import {  Dialog, DialogTitle, DialogContent,  DialogActions, FormControl, InputLabel, Select, MenuItem} from '@mui/material'

// todo: set data in useeffect so it reloads when the data changes

function ServiceRequestDetails() {

    const navigate = useNavigate()

    const params = useParams()
    const requestID = params.id
    const [request, setRequest] = useState()
    const [carStatus, setCarStatus] = useState()
    const [requestStatus, setRequestStatus] = useState()
    const [dataReload, setDataReload] = useState(1)
    const [fixDescription, setFixDescription] = useState('')
    const [isFixDescription, setIsFixDescription] = useState(false)
    const {user} = useAuth()

    dayjs.extend(LocalizedFormat)

    const [openChangeStatus, setOpenChangeStatus] = useState(false)

    useEffect(() => {
        axios.get(`${BASE_API_URI}/contacts/MechanicRequests`, {withCredentials: true})
        .then((response) => {
            for(var i = 0; i < response.data.length; i++) {
                if(response.data[i].requestID == requestID) {
                    console.log(response.data[i])
                    setRequest(response.data[i])
                    if(response.data[i].fixDescription) {
                        console.log('is fix description')
                        setIsFixDescription(true)
                    } else {
                        console.log('no fix description')
                        setIsFixDescription(false) 
                    }
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }, [dataReload])   

      const handleClose = () => {
        setOpenChangeStatus(false)
      };

      const handleChangeFixDescription = (e) => {
        setFixDescription(e.target.value)
      }
  
      const submitFixDescription = async(e) => {
        e.preventDefault()
        axios.patch(`${BASE_API_URI}/contacts/MechanicRequests`, {requestID: request?.requestID, fixDescription: fixDescription, assignedToID: user.userID}, {withCredentials: true})
        .then((response) => {
            console.log(response)
            setDataReload(dataReload + 1)
            setFixDescription('')
        })
        .catch((error) => console.log(error))
      }
  
      const handleRequestStatusChange = (e) => {
          setRequestStatus(e.target.value)
      }
  
      const handleChangeStatus = () => {
        if(isFixDescription == false && requestStatus == 3) {
            alert("Please submit a fix description before completing the request.")
        } else {
            axios.patch(`${BASE_API_URI}/contacts/MechanicRequests`, 
            {requestID: request.requestID, requestStatusID: requestStatus}, 
            {withCredentials: true})
            .then((response) => {
                setDataReload(dataReload + 1)
                alert("Status changed successfully")
            })
            .catch((error) => alert("There was a problem processing your request. Please try again later. "))
        }
      }
    
    return (
      <><div class = "mx-16 my-8">
            <Button sx = {{marginBottom: '16px'}} onClick = {() => navigate('/service-requests')}>Back to Service Requests</Button>
            <h1 class = "text-section-head">Car Service Request Ticket</h1>
            
            <p class = "text-body-copy mt-4"><span class = "font-bold">Ticket Number:</span> {requestID}</p>
            <p class = "text-body-copy">Created on {dayjs(request?.createdDatetime).format('LLL')}</p>

            <div class = "flex flex-center mt-4 space-x-2">
                <p class = "text-body-copy"><span class = "font-bold">Service Status: </span> {request?.requestStatus.name}</p>
                <Button size = "small" sx = {{borderColor: "#000180", color: "#000180"}} variant = "outlined" onClick = {() => {setOpenChangeStatus(true)}}>Edit Status</Button>
            </div>
           
           <div class = "grid grid-cols-2 gap-4 mb-8">
            <div class = "col-span-2 lg:col-span-1 py-4 px-8 rounded-xl border border-border mt-8 text-body-copy grid grid-cols-2 gap-8">
                    <div class = "space-y-2">
                        <p><span class = "font-bold">Car Number: </span>{request?.car.carID}</p>
                        <p><span class = "font-bold">Car Status: </span>{request?.car.status.longDescription}</p>
                        <p><span class = "font-bold">Reason: </span>{request?.requestType.name}</p>
                    </div>
                    <div class = "space-y-2">
                        <p><span class = "font-bold">Request Status: </span>{request?.requestStatus.description}</p>
                        <p><span class = "font-bold">Description: </span>{request?.description}</p>

                        {/* <p><span class = "font-bold">Assigned to: </span> {getEmployee(request?.assignedToID)}</p> */}
                        {/* <p>{request?.description}</p> */}
                    </div>
                </div>

                <div class = "col-span-2 lg:col-span-1 space-y-4 py-4 px-8 rounded-xl border border-border mt-8 text-body-copy gap-8">
                       {isFixDescription && (<p><span class = "font-bold">Fix Description: </span>{request?.fixDescription}</p>)}
                        <form class = "space-y-4" onSubmit = {submitFixDescription}>
                            <TextField
                                label = "Edit Fix Description"
                                helperText = "You must describe the fix before marking this inquiry as complete. "
                                value = {fixDescription}
                                onChange = {handleChangeFixDescription}
                                fullWidth
                            />
                            <Button sx = {{borderColor: "#000180", color: "#000180"}} type = "submit" size = "small" variant = "outlined">Update</Button>
                        </form>

                    </div>
           </div>

           

            
           {/* <Button sx = {{backgroundColor: "#000180"}}  disabled = {!isFixDescription} onClick = {() => completeRequest()} variant = "contained">Mark Complete</Button> */}


           <Dialog open = {openChangeStatus} onClose = {handleClose}>
                <DialogTitle>Edit Mechanic Request Status</DialogTitle>
                <DialogContent>
                    <div class = "space-y-8 p-4">
                        <p><span class = "font-bold">Current Status: </span>{request?.requestStatus.name}</p>

                        <FormControl required fullWidth>
                            <InputLabel id="status-select">Request Status</InputLabel>
                            <Select
                                labelId = "status-select"
                                name = "requestStatus"
                                value = {requestStatus}
                                label = "Request Status"
                                onChange = {handleRequestStatusChange}
                                required
                            >
                        
                            <MenuItem value = "1">New</MenuItem>
                            <MenuItem value = "2">In Progress</MenuItem>
                            <MenuItem value = "3">Completed</MenuItem>
                            <MenuItem value = "0">On Hold</MenuItem>
                    
                            </Select>
                        </FormControl>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { handleChangeStatus(); handleClose();}} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        
      
      </div></>
  
    );
  }
  
  export default ServiceRequestDetails;