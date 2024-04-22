import CarInterior from "../assets/car-interior.png"
import { FormControl, Select, InputLabel, MenuItem, Button } from "@mui/material";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import MapResults from "../components/MapResults";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from "axios";
import { useEffect } from "react";
import BASE_API_URI from "../config";

// todo: show user location on map
// todo: log data to console  -- DONE
// send to reservation details page & then the payment 

function Reservation() {
    const [isSearch, setIsSearch] = useState(false)
    const [pickup_datetime, setPickUp] = useState(dayjs());
    const [dropoff_datetime, setDropOff] = useState(dayjs());
    const [pickup_location, setPickupLocation] = useState(1)
    const [dropoff_location, setDropOffLocation] = useState(2)
    const [reservationTime, setReservationTime] = useState()
    const [stations, setStations] = useState()
    //const [latitude, setLatitude] = useState("43.0844")
    //const [longitude, setLongitude] = useState("43.20663")
    const [reservationResult, setReservationResult] = useState()
    const [reservationError, setReservationError] = useState("")

    const getStations = async () => {
      const data = await axios.get(`${BASE_API_URI}/stations`, {withCredentials:true})
      const stations = data.data
      setStations(stations)
      console.log(stations)
    }

    useEffect(() => {
        getStations()
    }, [])

    // hardcode user location as RIT, for now
    let data = JSON.stringify({
        scheduledStartDatetime: pickup_datetime.toISOString(),
        scheduledEndDatetime: dropoff_datetime.toISOString(),
        startStationID: pickup_location,
        coordinates: {
            lat: 43.0848,
            lng: -77.6715
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_API_URI}/reservations/availability/`,
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        data : data,
        withCredentials: true
    };

    function getResult() {
        axios.request(config)
        .then((response) => {
            console.log("Response")
            console.log(response)
            setReservationResult(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handlePickUpLocation = (e) => {
        setPickupLocation(e.target.value)
    }

    const handleDropOffLocation = (e) => {
        setDropOffLocation(e.target.value)
    }
    
    const searchHandler = e => {
        sessionStorage.removeItem('reservationComplete');
        sessionStorage.setItem('reservationActive', 'true');
        sessionStorage.removeItem('lastLocation'); 
        
        if(pickup_datetime.isAfter(dropoff_datetime)) {
          setReservationError("Please select a dropoff time that is after your pickup time")
          e.preventDefault()
        } else {
          setReservationError("")
          getResult();
  
          // get elapsed time
          const startTime = new Date(pickup_datetime)
          const endTime = new Date(dropoff_datetime)
          const elapsedTimeMillis = Math.abs(endTime - startTime)
          const elapsedHours = elapsedTimeMillis / 3600000
          setReservationTime(elapsedHours)
          setIsSearch(true);
          e.preventDefault()
        }
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
            <p class = "px-8 pt-4 text-red font-bold">{reservationError}</p>
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
                {stations?.map((data, key) => {
                    return(
                        <MenuItem key = {key} value = {data.stationID}>{data.name}</MenuItem>
                    );
                })}
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
                {stations?.map((data, key) => {
                    return(
                        <MenuItem key = {key} value = {data.stationID}>{data.name}</MenuItem>
                    );
                })}

                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Drop Off Date" slotProps={{textField: {variant: 'standard'}}}/> */}
                <DateTimePicker
                  label="Pick up Date"
                  name = "pickup_datetime"
                  value = {pickup_datetime}
                  onChange = {newDate => setPickUp(newDate)}
                  slotProps={{textField: {variant: 'standard'}}}
                  disablePast
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Drop Off Date" slotProps={{textField: {variant: 'standard'}}}/> */}
                <DateTimePicker
                  label="Drop off Date"
                  slotProps={{textField: {variant: 'standard'}}}
                  name = "dropoff_datetime"
                  value={dropoff_datetime}
                  onChange={newDate => setDropOff(newDate)}
                  disablePast
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
        <MapResults search = {isSearch} result = {{reservationResult}} searchQuery = {{pickup_datetime, pickup_location, dropoff_datetime, dropoff_location, reservationTime}}/>
        </div></>
    );
  }
  
  export default Reservation; 
