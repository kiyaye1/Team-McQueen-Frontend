import MapComponent from "../components/MapComponent";
import CarInterior from "../assets/car-interior.png"
import { FormControl, Select, InputLabel, MenuItem, Button } from "@mui/material";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


function Reservation() {
    return (
      <><div class = "m-16">
        <section class = "flex-center">
          <h1 class = "text-section-head">Welcome! Reserve Now <br/>GyroGoGo Member</h1>
          <img class = "opacity-75 rounded-xl" src = {CarInterior}/>
        </section>

        <div class = "lg:border lg:rounded-full mx-4 lg:mx-8 xl:mx-32">
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
                <DatePicker label="Drop Off Date" slotProps={{textField: {variant: 'standard'}}}/>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label = "Pick Up Time" slotProps={{textField: {variant: 'standard'}}}/>
            </LocalizationProvider>

            <div class = "justify-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label = "Drop Off Time" slotProps={{textField: {variant: 'standard'}}}/>
              </LocalizationProvider>
            </div>

            <div>
              <Button variant = "contained">Search</Button>
            </div>

          </section>
        </div>
        <MapComponent/>
      </div></>
  
    );
  }
  
  export default Reservation; 