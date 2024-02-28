import { TextField } from "@mui/material";
import useFormContext from "../hooks/useFormContext";
import { useRef, useState, useEffect } from "react";


const CustomerInfo = () => {
  const {
    data, 
    handleChange, 
    customer_firstNameError,
    customer_lastNameError,
    customer_mailingAddressError,
    customer_phoneNumberError,
    customer_emailAddressError,
    customer_passwordError,
    customer_passwordRetypeError
  } = useFormContext()

    const name_regex = /^([A-Z])[\w+.]{1,}$/
    const email_regex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]$/

    const content = (
      <div class = "flex justify-center my-8">
      <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-3 gap-8">
          <div class = "col-span-2">
            <TextField 
              name = "customer_firstName"
              variant = "standard" 
              label = "First Name" 
              sx = {{marginRight:1, width: '100%'}}
              value = {data.customer_firstName} 
              onChange = {handleChange} 
              required 
            />
            <div className = "text-red text-sm">{customer_firstNameError}</div>
          </div>
          <div class = "col-span-1">
            <TextField 
              onChange = {handleChange} 
              value = {data.customer_mi} 
              name = "customer_mi"
              variant = "standard" 
              label = "MI" 
              sx = {{marginRight:1, width: '100%'}}
            />
          </div>
          <div class = "col-span-2">
            <TextField 
              onChange = {handleChange} 
              value = {data.customer_lastName} 
              name = "customer_lastName"
              variant = "standard" 
              label = "Last Name"
              sx = {{marginRight:1, width: '100%'}}
              required
            />
            <div class = "text-red text-sm">{customer_lastNameError}</div>
          </div>
          <div class = "col-span-1">
            <TextField 
              onChange = {handleChange} 
              value = {data.customer_suffix} 
              name = "customer_suffix"
              variant = "standard" 
              label = "Suffix" 
              sx = {{width: '100%'}}
            />
          </div>
          <div class = "col-span-3">
            <TextField 
              onChange = {handleChange} 
              value = {data.customer_mailingAddress}
              name = "customer_mailingAddress"
              variant = "standard" 
              label = "Mailing Address"
              sx = {{width: '100%'}}
              required 
            />
            <div className = "text-red text-sm">{customer_mailingAddressError}</div>
          </div>
          <div class = "col-span-3">
            <TextField 
              onChange = {handleChange} 
              value = {data.customer_phoneNumber}
              name = "customer_phoneNumber"
              variant = "standard" 
              label = "Phone Number" 
              sx = {{width: '100%'}}
              required
            />
            <div className = "text-red text-sm">{customer_phoneNumberError}</div>
          </div>
          <div class = "col-span-3">
            <TextField 
              onChange = {handleChange} 
              value = {data.customer_emailAddress}
              name = "customer_emailAddress"
              variant = "standard" 
              label = "Email Address" 
              sx = {{width: '100%'}}
              required
            />
            <div className = "text-red text-sm">{customer_emailAddressError}</div>
          </div>
          <div class = "col-span-3">
            <TextField 
              onChange = {handleChange} 
              value = {data.customer_password}
              name = "customer_password"
              variant = "standard" 
              label = "Password" 
              type = "password"
              sx = {{width: '100%'}}
              required
            /> 
            <div className = "text-red text-sm">{customer_passwordError}</div>           
          </div>
          <div class = "col-span-3">
            <TextField 
                onChange = {handleChange} 
                value = {data.customer_passwordRetype}
                name = "customer_passwordRetype"
                variant = "standard" 
                label = "Password" 
                type = "password"
                sx = {{width: '100%'}}
                required
              />
              <div className = "text-red text-sm">{customer_passwordRetypeError}</div>              
          </div>
      </div>
    </div>
    )
    return content
  }
  
  export default CustomerInfo;
