import { TextField, Button } from "@mui/material";


function CreditCardInfo() {
    return (
      <div class = "flex justify-center my-8">
        <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-3 gap-8">
          <div class = "col-span-3">
            <TextField variant = "standard" label = "Card Holder Name" required sx = {{width: '100%'}}/>
          </div>
          <div class = "col-span-3">
            <TextField variant = "standard" label = "Card Number" required sx = {{width: '100%'}}/>
          </div>
          <div class = "col-span-2">
            <TextField variant = "standard" label = "Expiration Date" required sx = {{marginRight:1, width: '100%'}}/>
          </div>
          <div class = "col-span-1">
            <TextField variant = "standard" label = "CVC" sx = {{width: '100%'}}/>
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