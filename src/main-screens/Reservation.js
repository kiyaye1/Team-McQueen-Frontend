import MapComponent from "../components/MapComponent";
import CarInterior from "../assets/car-interior.png"
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


function Reservation() {
    return (
      <><div >
        <section>
          <h1 class = "text-section-head">Welcome! Reserve Now <br/>GyroGoGo Member</h1>
          <img src = {CarInterior}/>
        </section>
        <section>
          <FormControl>
            <InputLabel id="location-select">Pick Up Location</InputLabel>
            <Select
              labelId = "location-select"
              // value = {reason}
              label = "Pick Up Location"
            >
              <MenuItem value = "Northeast">Northeast</MenuItem>

            </Select>
          </FormControl>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Pick Up Date" />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Drop Off Date" />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label = "Pick Up Time"/>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label = "Drop Off Time"/>
          </LocalizationProvider>
        
        </section>
        <MapComponent/>
      </div></>
  
    );
  }
  
  export default Reservation; 