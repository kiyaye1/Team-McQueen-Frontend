import React, { useState, useEffect } from 'react';
import { Container, DialogTitle, Button, Dialog, DialogContent, TextField, DialogActions } from '@mui/material';
import axios from 'axios';
import BASE_API_URI from '../../config';
import dayjs from 'dayjs';

function PriceInformation() {

  const [hourlyRate, setHourlyRate] = useState([]);
  const [openEditRate, setOpenEditRate] = useState(false)
  const [newRate, setNewRate] = useState('')
  const [priceChange, setPriceChange] = useState(1)

  useEffect(() => {
    getData()
  }, [priceChange])

  const getData = async () => {
    const data = await axios.get(`${BASE_API_URI}/hourlyRate/current`, {withCredentials:true})
    setHourlyRate(data.data.hourlyRate) 
  }

  const handleClose = () => {
    setOpenEditRate(false)
  }

  const handleRateChange = (e) => {
    setNewRate(e.target.value)
  }

  const handleSubmit = () => {
    axios.post(`${BASE_API_URI}/hourlyRate`, {rate: newRate, effectiveDate: dayjs().toISOString()}, {withCredentials: true})
    .then((response) => {
        alert("Price changed successfully.")
        setPriceChange(priceChange + 1)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  return (
    <Container className="my-16"> 
      <h1 class="text-section-head pb-8">Pricing</h1>
      <div class = "flex">
        <div class = "p-8 border border-border rounded-xl space-y-2">
            <h3 class = "pb-2 text-subhead">Rochester Pricing</h3>
            <p><span class = "font-bold">Price per Hour: </span>${hourlyRate}</p>
            <p class = "pb-2"><span class = "font-bold">Daily Maximum: </span>$120.00</p>
            <Button onClick = {() => setOpenEditRate(true)} variant = "outlined">Edit Hourly Rate</Button>
        </div>
      </div>

      <Dialog open = {openEditRate} onClose = {handleClose}>
        <DialogTitle>Change Hourly Rate - Rochester</DialogTitle>
        <DialogContent>
            <TextField margin="dense" label="Hourly Rate in Dollars" fullWidth value={newRate || hourlyRate} onChange={handleRateChange} required/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => { handleSubmit(); handleClose();}} color="primary">Change Rate</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PriceInformation;
