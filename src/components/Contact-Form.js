import {TextField} from "@mui/material";
import {Select} from "@mui/material";
import {Button, MenuItem} from "@mui/material";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import {FormControl} from "@mui/material";
import BASE_API_URI from "../config";
import axios from "axios";
import validator from 'validator';

const ContactForm = () => {

    const [reason, setReason] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isVehicleInquiry, setIsVehicleInquiry] = useState(false) 
    const [carID, setCarID] = useState(null)
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleCarIdChange = (e) => {
        setCarID(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleReasonChange = (e) => {
        setReason(e.target.value);
        if(e.target.value == "Vehicle Inquiries") {
            setIsVehicleInquiry(true)
        } else {
            setIsVehicleInquiry(false)
        }
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validator.isEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
    
        if(carID) {
            axios.post(`${BASE_API_URI}/contacts/createContacts`, {name, email, reason, carID, message})
            .then((response) => {
                console.log(response)
                setName('');
                setEmail('');
                setReason('');
                setMessage('');
                setCarID(null)
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            axios.post(`${BASE_API_URI}/contacts/createContacts`, {name, email, reason, message})
            .then((response) => {
                console.log(response)
                setName('');
                setEmail('');
                setReason('');
                setMessage('');
                setCarID(null)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     if (!validator.isEmail(email)) {
    //         alert('Please enter a valid email address.');
    //         return;
    //     }
    
    //     try {
    //         await axios.post(`${BASE_API_URI}/contacts/createContacts`, { name, email, reason, message }, { withCredentials: true });
    //         alert('Your message has been sent!');
    //         // Reset form fields
    //         setName('');
    //         setEmail('');
    //         setReason('');
    //         setMessage('');
    //     } catch (error) {
    //         console.error(error);
    //         console.error('Error sending message:', error);
    //         alert('Failed to send the message.');
    //     }
    // };

    return (
    <div class = "grid grid-cols-1 lg:grid-cols-3 md: grid-cols-2 py-8 gap-16">
        <form onSubmit = {handleSubmit} class = "col-span-1 grid grid cols-1 gap-8">
            <div>
            <TextField 
            label = "Name"
            value = {name}
            onChange = {handleNameChange}
            variant = "outlined"
            sx = {{marginRight:1, width: '100%', backgroundColor: 'white', borderRadius: '4px'}}
            required
            />
            </div>
            <div>
            <TextField 
                label = "Email"
                value = {email}
                onChange = {handleEmailChange}
                variant = "outlined"
                sx = {{marginRight:1, width: '100%', backgroundColor: 'white', borderRadius: '4px'}}
                required
            />
            </div>
            <div>
            <FormControl fullWidth>
                <InputLabel id="reason-select">Reason</InputLabel>
                <Select
                    labelId = "reason-select"
                    value = {reason}
                    label = "Reason"
                    onChange = {handleReasonChange}
                    sx = {{ backgroundColor: 'white', borderRadius: '4px'}}
                    required
                >
                    <MenuItem value = "Website feedback">Website Feedback</MenuItem>
                    <MenuItem value = "General Feedback">General Feedback</MenuItem>
                    <MenuItem value = "Vehicle Inquiries">Vehicle Inquiries or Service Requests</MenuItem>
                    <MenuItem value = "General Questions">General Questions</MenuItem>
                </Select>
            </FormControl>
            
            </div>
            {isVehicleInquiry && (
                <div>
                    <TextField 
                        label = "Car Number"
                        variant = "outlined"
                        value = {carID}
                        onChange = {handleCarIdChange}
                        sx = {{marginRight:1, width: '100%', backgroundColor: 'white', borderRadius: '4px'}}
                        helperText="If you are having an issue with a car, please provide the car number from your reservation."
                    />
                </div>
            )}

            <div>
            <TextField 
                label = "Send us a Message!"
                variant = "outlined"
                value = {message}
                onChange = {handleMessageChange}
                sx = {{marginRight:1, width: '100%', backgroundColor: 'white', borderRadius: '4px'}}
                required
            />
            </div>
            <div>
            <Button type = "submit" variant = "contained" sx = {{backgroundColor: '#000180'}}>Send</Button>
            </div>
            
        </form>

        <div class = "col-span-1 lg:col-span-2">
            <p class = "text-body-copy">Our Customer Service staff will be happy to answer any questions you may have.
            <br/><br/>Office hours
            <br/>Mon - Fri
            <br/>8:00 AM – 8:00 PM EST.
            <br/><br/>Members will receive a 24-hour emergency service number in their rental confirmation.
            </p>
        </div>
        
    </div>
  
    );
  }
  
  export default ContactForm;