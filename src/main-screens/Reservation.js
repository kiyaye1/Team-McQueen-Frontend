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
// todo: log data to console  -- DONE
// send to reservation details page & then the payment 

function Reservation() {
    const [isSearch, setIsSearch] = useState(false)
    const [pickup_datetime, setPickUp] = useState(dayjs());
    const [dropoff_datetime, setDropOff] = useState(dayjs());
    const [pickup_location, setPickupLocation] = useState("")
    const [dropoff_location, setDropOffLocation] = useState("")

    // const [searchQuery, setSearchQuery] = useState({
    //   pickup: dayjs(),
    //   dropoff: dayjs(),
    //   pickup_loc: "",
    //   dropoff_loc: "",
    // })

    const handlePickUpLocation = (e) => {
      setPickupLocation(e.target.value)
    }

    const handleDropOffLocation = (e) => {
      setDropOffLocation(e.target.value)
    }
    
    const searchHandler = e => {
      // setSearchQuery({
      //   pickup: pickup_datetime,
      //   dropoff: dropoff_datetime,
      //   pickup_loc: pickup_location,
      //   dropoff_loc: dropoff_location
      // })
      // console.log("RESERVATION: ")
      // console.log(searchQuery)
      setIsSearch(true);
      e.preventDefault()

      // check errors on if date 2 is before date 1
      console.log(pickup_datetime.toISOString(), dropoff_datetime.toISOString(), pickup_location, dropoff_location)
    }

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
          <form onSubmit = {searchHandler} class = "grid grid-cols-1 lg:grid-cols-5 gap-8 px-8 py-8">
            <FormControl>
              <InputLabel id="location-select">Pick Up Location</InputLabel>
              <Select
                name = "pickup_location"
                value = {pickup_location}
                onChange = {handlePickUpLocation}
                labelId = "location-select"
                label = "Pick Up Location"
                variant = "standard"
              >
                <MenuItem value = "Northeast">Northeast</MenuItem>
                <MenuItem value = "Northwest">Northwest</MenuItem>
                <MenuItem value = "Center City">Center City</MenuItem>
                <MenuItem value = "Southeast">Southeast</MenuItem>
                <MenuItem value = "Airport">Airport</MenuItem>

              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="drop-off-select">Drop off Location</InputLabel>
              <Select
                labelId = "drop-off-select"
                name = "dropoff_location"
                value = {dropoff_location}
                onChange = {handleDropOffLocation}
                label = "Drop Off Location"
                variant = "standard"
              >
                <MenuItem value = "Northeast">Northeast</MenuItem>
                <MenuItem value = "Northwest">Northwest</MenuItem>
                <MenuItem value = "Center City">Center City</MenuItem>
                <MenuItem value = "Southeast">Southeast</MenuItem>
                <MenuItem value = "Airport">Airport</MenuItem>

              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Drop Off Date" slotProps={{textField: {variant: 'standard'}}}/> */}
                <DateTimeField
                  label="Pick up Date"
                  name = "pickup_datetime"
                  value = {pickup_datetime}
                  onChange = {newDate => setPickUp(newDate)}
                  slotProps={{textField: {variant: 'standard'}}}
                 />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Drop Off Date" slotProps={{textField: {variant: 'standard'}}}/> */}
                <DateTimeField
                  label="Drop off Date"
                  slotProps={{textField: {variant: 'standard'}}}
                  name = "dropoff_datetime"
                  value={dropoff_datetime}
                  onChange={newDate => setDropOff(newDate)}
                 />
            </LocalizationProvider>

            <div class = "flex items-center">
              <Button 
                variant = "contained" 
                sx = {{width: "100%", height: "100%"}}
                type = "submit"
              >
              Search
              </Button>
            </div>

          </form>
        </div>

        {/* Map and results */}
        <MapResults search = {isSearch} searchQuery = {{pickup_datetime, pickup_location, dropoff_datetime, dropoff_location}}/>
      </div></>
  
    );
  }
  
  export default Reservation; 