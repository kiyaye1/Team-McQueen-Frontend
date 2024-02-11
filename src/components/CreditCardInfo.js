import { TextField, Button } from "@mui/material";
import useFormContext from "../hooks/useFormContext";

function CreditCardInfo() {
    const {data, handleChange} = useFormContext()

    return (
      <div class = "flex justify-center my-8">
        <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-3 gap-8">
          <div class = "col-span-3">
            <TextField 
                onChange = {handleChange} 
                value = {data.cardName}
                name = "cardName"
                variant = "standard" 
                label = "Card Holder Name" 
                sx = {{width: '100%'}}
                required
              /> 
          </div>
          <div class = "col-span-3">
            <TextField 
                onChange = {handleChange} 
                value = {data.cardNumber}
                name = "cardNumber"
                variant = "standard" 
                label = "Card Number" 
                sx = {{width: '100%'}}
                required
              /> 
          </div>
          <div class = "col-span-2">
            <TextField 
                onChange = {handleChange} 
                value = {data.cardExpirationDate}
                name = "cardExpirationDate"
                variant = "standard" 
                label = "Expiration Date" 
                sx = {{width: '100%'}}
                required
              /> 
          </div>
          <div class = "col-span-1">
            <TextField 
                onChange = {handleChange} 
                value = {data.cardccv}
                name = "cardccv"
                variant = "standard" 
                label = "CCV" 
                sx = {{width: '100%'}}
                required
              /> 
          </div>
          <div class = "col-span-3" >
              <Button variant="contained" sx={{m:1}}>Save Card</Button>
              <Button variant="text">Add New Card</Button>
          </div>
      </div>

    </div>

  
    );
  }
  
  export default CreditCardInfo;