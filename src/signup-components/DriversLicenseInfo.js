import { TextField } from "@mui/material";
import useFormContext from "../hooks/useFormContext";

function DriversLicenseInfo() {
    const {data, handleChange} = useFormContext()

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
            </div>
            <div class = "col-span-3">
              <TextField 
                  name = "dlState"
                  onChange = {handleChange} 
                  value = {data.dlState}
                  variant = "standard" 
                  label = "State Issued" 
                  sx = {{width: '100%'}}
                  required
                />
            </div>
        </div>
      </div>
  
    );
  }
  
  export default DriversLicenseInfo;


              