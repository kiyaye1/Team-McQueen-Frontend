import { TextField } from "@mui/material";
import useFormContext from "../hooks/useFormContext";
import { StateList } from "../data/state-list";
import {Select} from "@mui/material";
import {MenuItem} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import {FormControl} from "@mui/material";

// select isnt working properly

function DriversLicenseInfo() {
  const {
    data, 
    handleChange, 
    dlNumberError, 
    dlStateError
  } = useFormContext()

    return (
      <div class = "flex justify-center my-8">
        <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-3 gap-8">
            <div class = "col-span-3">
              <TextField 
                name = "dlNumber"
                onChange = {handleChange} 
                value = {data.dlNumber}
                variant = "standard" 
                label = "Drivers License Number" 
                sx = {{width: '100%'}}
                required
              />
              <div className = "text-red text-sm">{dlNumberError}</div>
            </div>
            <div class = "col-span-3">
              <FormControl required fullWidth>
                <InputLabel id="state-select">State</InputLabel>
                  <Select
                      labelId = "state-select"
                      name = "dlState"
                      value = {data.dlState}
                      label = "State"
                      onChange = {handleChange}
                      required
                  >
                  {StateList.map((data, key) => {
                      return (
                        <MenuItem value = {data.state} key = {key}>{data.state}</MenuItem>
                      )
                  })};
                  </Select>
              </FormControl>
              <div className = "text-red text-sm">{dlStateError}</div>
            </div>
        </div>
      </div>
  
    );
  }
  
  export default DriversLicenseInfo;


              