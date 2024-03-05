import MapComponent from "../components/MapComponent";
import CarInterior from "../assets/car-interior.png"
import { FormControl, Select, InputLabel, MenuItem, Button } from "@mui/material";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchResult from "../components/SearchResult";

function Reservation() {

    return (
      <><div class = "m-16 grid grid-cols-8 gap-8">
        <div class = "flex items-center col-span-4">
          <h1 class = "text-section-head">Welcome! Reserve Now <br/>GyroGoGo Member</h1>
        </div>
        <div class = "col-span-4">
          <img class = "w-full opacity-75 rounded-xl" src = {CarInterior}/>
        </div>

        <div class = "lg:border lg:rounded-lg col-span-8">
          <section class = "grid grid-cols-1 lg:grid-cols-6 gap-8 px-8 py-4">
            <FormControl>
              <InputLabel id="location-select">Pick Up Location</InputLabel>
              <Select
                labelId = "location-select"
                // value = {reason}
                label = "Pick Up Location"
                variant = "standard"
              >
                <MenuItem value = "Northeast">Northeast</MenuItem>

              </Select>
            </FormControl>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Pick Up Date" slotProps={{textField: {variant: 'standard'}}}/>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label = "Pick Up Time" slotProps={{textField: {variant: 'standard'}}}/>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Drop Off Date" slotProps={{textField: {variant: 'standard'}}}/>
            </LocalizationProvider>

            <div class = "justify-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label = "Drop Off Time" slotProps={{textField: {variant: 'standard'}}}/>
              </LocalizationProvider>
            </div>

            <div class = "flex items-center">
              <Button variant = "contained" sx = {{width: "100%", height: "100%"}}>Search</Button>
            </div>

          </section>
        </div>

        <div class = "col-span-3">
          <div class = "grid grid-cols-1 gap-4">
            <SearchResult station = "GyroGoGo Northwest" price = "25" distance = "0.3" address = "The Mall at Greece Ridge, Somerworth Dr, Rochester, NY"/>
            <SearchResult station = "GyroGoGo Northeast" price = "25" distance = "1.2" address = "Town Center of Webster, Webster, NY"/>
            <SearchResult station = "GyroGoGo Center City" price = "25" distance = "3" address = "Genesee Crossroads Garage, 69 Andrews St, Rochester, NY "/>
            <SearchResult station = "GyroGoGo Southeast" price = "25" distance = "4" address = "Perinton Square Mall, Fairport, NY"/>
            <SearchResult station = "GyroGoGo Airport" price = "25" distance = "4.3" address = "Paul Rd at Scottsville Rd, Rochester, NY"/>
          </div>
        </div>

        <div class = "col-span-5">
          <MapComponent/>
        </div>


      </div></>
  
    );
  }
  
  export default Reservation; 