import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
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
    dayjs.extend(LocalizedFormat)

    const [openChangeStatus, setOpenChangeStatus] = useState(false)

    useEffect(() => {
        axios.get(`${BASE_API_URI}/contacts/MechanicRequests`, {withCredentials: true})
        .then((response) => {
            console.log(response)
            for(var i = 0; i < response.data.length; i++) {
                if(response.data[i].requestID == requestID) {
                    setRequest(response.data[i])
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
  
    //   const handleStatusChange = (e) => {
    //       setCarStatus(e.target.value)
    //   }
  
      const handleRequestStatusChange = (e) => {
          setRequestStatus(e.target.value)
          setDataReload(dataReload + 1)
      }
  
      const handleChangeStatus = () => {
        axios.patch(`${BASE_API_URI}/contacts/MechanicRequests`, 
            {requestID: request?.requestID, requestStatusID: requestStatus, carID: request?.car.carID}, 
            {withCredentials: true})
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
      }
    
    return (
      <><div class = "mx-16 my-8">
            <Button sx = {{marginBottom: '16px'}} onClick = {() => navigate(-1)}>Back to Service Requests</Button>
            <h1 class = "text-section-head">Car Service Request Ticket</h1>
            
            <p class = "text-body-copy mt-4"><span class = "font-bold">Ticket Number:</span> {requestID}</p>
            <p class = "text-body-copy">Created on {dayjs(request?.createdDatetime).format('LLL')}</p>

            <div class = "flex flex-center mt-4 space-x-4">
                <p class = "text-body-copy"><span class = "font-bold">Service Status: </span> {request?.requestStatus.name}</p>
                <Button size = "small" variant = "outlined" onClick = {() => {setOpenChangeStatus(true)}}>Edit Status</Button>
            </div>
           
           <div class = "grid grid-cols-2 mb-8">
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
           </div>


           <Dialog open = {openChangeStatus} onClose = {handleClose}>
                <DialogTitle>Create Mechanic Service Request</DialogTitle>
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
                            <MenuItem value = "3">Done</MenuItem>
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