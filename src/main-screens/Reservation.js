import CarInterior from "../assets/car-interior.png"
import { FormControl, Select, InputLabel, MenuItem, Button } from "@mui/material";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import MapResults from "../components/MapResults";
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs from 'dayjs';


// todo: show user location on map
// todo: log data to console & send to reservation details page & then the payment 

function Reservation() {
    const [isSearch, setIsSearch] = useState(false)
    const [pickUp, setPickUp] = useState(dayjs());
    const [dropOff, setDropOff] = useState(dayjs());
    
    const searchHandler = () => setIsSearch(true);

    return (
      // heading 
      <>
      <div class = "m-16 grid grid-cols-1 gap-8">
          <section class = "grid grid-cols-5 gap-8">
            <div class = "flex items-center col-span-3">
              <h1 class = "text-section-head lg:text-hero">Welcome! Reserve Now <br/>GyroGoGo Member</h1>
            </div>
            <div class = "col-span-2">
              <img class = "w-full opacity-75 rounded-xl" src = {CarInterior}/>
            </div>
        </section>
        
        {/* Search field */}
        <div class = "lg:border border-border lg:rounded-lg">
          <section class = "grid grid-cols-1 lg:grid-cols-5 gap-8 px-8 py-8">
            <FormControl>
              <InputLabel id="location-select">Pick Up Location</InputLabel>
              <Select
                labelId = "location-select"
                // value = {reason}
                label = "Pick Up Location"
                variant = "standard"
              >
                <MenuItem value = "Northeast">Northeast</MenuItem>
                <MenuItem value = "Northeast">Northwest</MenuItem>
                <MenuItem value = "Northeast">Center City</MenuItem>
                <MenuItem value = "Northeast">Southeast</MenuItem>
                <MenuItem value = "Northeast">Airport</MenuItem>

              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="drop-off-select">Drop off Location</InputLabel>
              <Select
                labelId = "drop-off-select"
                // value = {reason}
                label = "Drop Off Location"
                variant = "standard"
              >
                <MenuItem value = "Northeast">Northeast</MenuItem>
                <MenuItem value = "Northeast">Northwest</MenuItem>
                <MenuItem value = "Northeast">Center City</MenuItem>
                <MenuItem value = "Northeast">Southeast</MenuItem>
                <MenuItem value = "Northeast">Airport</MenuItem>

              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Drop Off Date" slotProps={{textField: {variant: 'standard'}}}/> */}
                <DateTimeField
                  label="Pick up Date"
                  slotProps={{textField: {variant: 'standard'}}}
                  value={pickUp}
                  onChange={(newValue) => setPickUp(newValue)}
                 />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Drop Off Date" slotProps={{textField: {variant: 'standard'}}}/> */}
                <DateTimeField
                  label="Drop off Date"
                  slotProps={{textField: {variant: 'standard'}}}
                  value={dropOff}
                  onChange={(newValue) => setDropOff(newValue)}
                 />
            </LocalizationProvider>

            <div class = "flex items-center">
              <Button 
                variant = "contained" 
                sx = {{width: "100%", height: "100%"}}
                onClick = {
                  searchHandler
                }
              >
              Search
              </Button>
            </div>

          </section>
        </div>

        {/* Map and results */}
        <MapResults search = {isSearch}/>
      </div></>
  
    );
  }
  
  export default Reservation; 