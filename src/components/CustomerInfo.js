import { TextField, Box, Input, FormControl } from "@mui/material";


function CustomerInfo() {
    return (
      <div class = "flex justify-center my-8">
        <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-3 gap-8">
            <div class = "col-span-2">
              <TextField variant = "standard" label = "First Name" required sx = {{marginRight:1, width: '100%'}}/>
            </div>
            <div class = "col-span-1">
              <TextField variant = "standard" label = "MI" sx = {{width: '100%'}}/>
            </div>
            <div class = "col-span-2">
              <TextField variant = "standard" label = "Last Name" required sx = {{marginRight:1, width: '100%'}}/>
            </div>
            <div class = "col-span-1">
              <TextField variant = "standard" label = "Suffix" sx = {{width: '100%'}}/>
            </div>
            <div class = "col-span-3">
              <TextField variant = "standard" label = "Mailing Address" required sx = {{width: '100%'}}/>
            </div>
            <div class = "col-span-3">
              <TextField variant = "standard" label = "Phone Number" required sx = {{width: '100%'}}/>
            </div>
            <div class = "col-span-3">
              <TextField variant = "standard" label = "Email Address" required sx = {{width: '100%'}}/>
            </div>
            <div class = "col-span-3">
              <TextField variant = "standard" label = "Password" required sx = {{width: '100%'}}/>
            </div>
            <div class = "col-span-3">
              <TextField variant = "standard" label = "Retype Password" required sx = {{width: '100%'}}/>
            </div>
        </div>

            




      </div>
  
    );
  }
  
  export default CustomerInfo;


//   <><div class = "grid grid-cols-2 gap-4">

//   <div>
//     <TextField margin = "dense" label="First Name" required variant="outlined"/>
//     <TextField margin = "dense" label="MI" variant="outlined"/>
//   </div>
//   <div class = "col-span-2">
//     <TextField label="Mailing Address" required variant="outlined"/>
//   </div>




// </div></>