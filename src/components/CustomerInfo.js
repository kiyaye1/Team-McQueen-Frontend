import { TextField } from "@mui/material";
import Form from "./Form";

const CustomerInfo = ({ data, handleChange }) => {
    const content = (
      <div class = "flex justify-center my-8">
      <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-3 gap-8">
          <div class = "col-span-2">
            <TextField 
              name = "firstName"
              variant = "standard" 
              label = "First Name" 
              sx = {{marginRight:1, width: '100%'}}
              value = {data.firstName} 
              onChange = {handleChange} 
              required 
            />
          </div>
          <div class = "col-span-1">
            <TextField 
              onChange = {handleChange} 
              value = {data.mi} 
              name = "mi"
              variant = "standard" 
              label = "MI" 
              sx = {{marginRight:1, width: '100%'}}
            />
          </div>
          <div class = "col-span-2">
            <TextField 
              onChange = {handleChange} 
              value = {data.lastName} 
              name = "lastName"
              variant = "standard" 
              label = "Last Name"
              sx = {{marginRight:1, width: '100%'}}
              required
            />
          </div>
          <div class = "col-span-1">
            <TextField 
              onChange = {handleChange} 
              value = {data.suffix} 
              name = "suffix"
              variant = "standard" 
              label = "Suffix" 
              sx = {{width: '100%'}}
            />
          </div>
          <div class = "col-span-3">
            <TextField 
              onChange = {handleChange} 
              value = {data.mailingAddress}
              name = "mailingAddress"
              variant = "standard" 
              label = "Mailing Address"
              sx = {{width: '100%'}}
              required 
            />
          </div>
          <div class = "col-span-3">
            <TextField 
              onChange = {handleChange} 
              value = {data.phoneNumber}
              name = "phoneNumber"
              variant = "standard" 
              label = "Phone Number" 
              sx = {{width: '100%'}}
              required
            />
          </div>
          <div class = "col-span-3">
            <TextField 
              onChange = {handleChange} 
              value = {data.emailAddress}
              name = "emailAddress"
              variant = "standard" 
              label = "Email Address" 
              sx = {{width: '100%'}}
              required
            />
          </div>
          <div class = "col-span-3">
            <TextField 
              onChange = {handleChange} 
              value = {data.password}
              name = "password"
              variant = "standard" 
              label = "Password" 
              sx = {{width: '100%'}}
              required
            />            
          </div>
          <div class = "col-span-3">
            <TextField 
                onChange = {handleChange} 
                value = {data.passwordRetype}
                name = "passwordRetype"
                variant = "standard" 
                label = "Password" 
                sx = {{width: '100%'}}
                required
              />              
          </div>
      </div>
    </div>
    )
    return content
  }
  
  export default CustomerInfo;
