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

function InquiryDetails() {

    const navigate = useNavigate()
    const {user} = useAuth()

    const params = useParams()
    const inquiryID = params.id
    const [inquiry, setInquiry] = useState()
    const [inquiryStatus, setInquiryStatus] = useState()
    const [openChangeStatus, setOpenChangeStatus] = useState(false)
    const [openServiceRequest, setOpenServiceRequest] = useState(false)
    const [carStatus, setCarStatus] = useState()
    dayjs.extend(LocalizedFormat)

    useEffect(() => {
        axios.get(`${BASE_API_URI}/contacts/getCustomerContacts`, {withCredentials: true})
        .then((response) => {
            console.log(response)
            for(var i = 0; i < response.data.length; i++) {
                if(response.data[i].requestID == inquiryID) {
                    setInquiry(response.data[i])
                    console.log(response.data[i])
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])    
    
    //Function to handle close action for dialogs
    const handleClose = () => {
      setOpenServiceRequest(false);
      setOpenChangeStatus(false)
    };

    const handleInquiryStatusChange = (e) => {
        setInquiryStatus(e.target.value)
    }

    const handleChangeStatus = () => {
        axios.post(`${BASE_API_URI}/contacts/updateTicketStatus`, {requestID: inquiry?.requestID, newStatus: inquiryStatus}, {withCredentials: true})
        .then((response) => console.log(response))
        .catch((error) => alert(error))
    }

  
    const handleSubmit = () => {
        axios.post(`${BASE_API_URI}/contacts/MechanicRequests`,
            {
                description: inquiry?.description,
                carID: inquiry?.carID,
                creatorID: user.userID,
            },
            {withCredentials: true}
        )
        .then((response) => {
            console.log(response)
            completeRequest()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const completeRequest = () => {
        axios.post(`${BASE_API_URI}/contacts/updateTicketStatus`, {requestID: inquiry?.requestID, newStatus: 3}, {withCredentials: true})
        .then((response) => alert(response))
        .catch((error) => alert(error))
    }


    return (
      <><div class = "mx-16 my-8">
            <Button sx = {{marginBottom: '16px'}} onClick = {() => navigate('/customer-inquiries')}>Back to Inquiry List</Button>
            <h1 class = "text-section-head">Inquiry Ticket</h1>
            
            <p class = "text-body-copy mt-4"><span class = "font-bold">Ticket Number:</span> {inquiryID}</p>
            <p class = "text-body-copy">Created on {dayjs(inquiry?.createdDatetime).format('LLL')}</p>

            <div class = "flex flex-center mt-4 space-x-4">
                <p class = "text-body-copy"><span class = "font-bold">Inquiry Status: </span> {inquiry?.requestStatus.name}</p>
                <Button size = "small" variant = "outlined" onClick = {() => {setOpenChangeStatus(true)}}>Edit Status</Button>
            </div>
            
           
           <div class = "grid grid-cols-2 mb-8">
            <div class = "col-span-2 lg:col-span-1 py-4 px-8 rounded-xl border border-border mt-8 text-body-copy grid grid-cols-2 gap-8">
                    <div class = "space-y-2">
                        <p><span class = "font-bold">Name: </span>{inquiry?.customerName}</p>
                        <p><span class = "font-bold">Email: </span>{inquiry?.customerEmail}</p>
                        <p><span class = "font-bold">Reason: </span>{inquiry?.type}</p>
                    </div>
                    <div class = "">
                        <p class = "font-bold">Inquiry:</p>
                        <p>{inquiry?.description}</p>
                    </div>
                </div>
           </div>

            <div class = "space-x-2">
                <Button variant = "outlined" onClick = {() => setOpenServiceRequest(true)}>Create Service Request</Button>
            </div>

            <Dialog open = {openServiceRequest} onClose = {handleClose}>
                <DialogTitle>Create Mechanic Service Request</DialogTitle>
                <DialogContent>
                    <div class = "space-y-4 p-4">
                        <p>This will create a Mechanic Service Request out of the information submitted by the customer. It will mark the Customer Service Inquiry as completed, and will transfer the information to the Mechanics.</p>
                        <p><span class = "font-bold">Ticket Number: </span>{inquiryID}</p>
                        <p><span class = "font-bold">Car Number: </span>{inquiry?.carID}</p>
                        <div class = "pb-4">
                            <p class = "font-bold">Description:</p>
                            <p>{inquiry?.description}</p>
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { handleSubmit(); handleClose();}} color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            <Dialog open = {openChangeStatus} onClose = {handleClose}>
                <DialogTitle>Create Mechanic Service Request</DialogTitle>
                <DialogContent>
                    <div class = "space-y-8 p-4">
                        <p><span class = "font-bold">Current Status: </span>{inquiry?.requestStatus.name}</p>

                        <FormControl required fullWidth>
                            <InputLabel id="status-select">Inquiry Status</InputLabel>
                            <Select
                                labelId = "status-select"
                                name = "inquiryStatus"
                                value = {carStatus}
                                label = "Inquiry Status"
                                onChange = {handleInquiryStatusChange}
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
  
  export default InquiryDetails;