import { TextField } from "@mui/material";

function DriversLicenseInfo() {
    return (
      <div class = "flex justify-center my-8">
        <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-3 gap-8">
            <div class = "col-span-3">
              <TextField variant = "standard" label = "Drivers License Number" required sx = {{width: '100%'}}/>
            </div>
            <div class = "col-span-3">
              <TextField variant = "standard" label = "State Issued" required sx = {{width: '100%'}}/>
            </div>
        </div>
      </div>
  
    );
  }
  
  export default DriversLicenseInfo;