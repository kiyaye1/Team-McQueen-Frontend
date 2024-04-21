import { TextField, Checkbox, FormControlLabel, Typography, Link} from "@mui/material";
import useFormContext from "../hooks/useFormContext";



function CreditCardInfo() {
    const {
      data, 
      handleChange, 
      cardNameError,
      cardNumberError,
      expDateError,
      cardccvError,
      termsAccepted,
      setTermsAccepted
    } = useFormContext()


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
              <div className = "text-red text-sm">{cardNameError}</div>
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
              <div className = "text-red text-sm">{cardNumberError}</div>
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
              <div className = "text-red text-sm">{expDateError}</div>
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
              <div className = "text-red text-sm">{cardccvError}</div>
          </div>
          {/* <div class = "col-span-3 text-left" >
              <Button variant="contained" sx={{m:1, backgroundColor: '#000180'}}>Save Card</Button>
              <Button variant="text" sx = {{color: '#000180'}}>Add New Card</Button>
          </div> */}
      {/* Terms and Conditions Checkbox with PDF Link */}
      <div className="col-span-3">
            <FormControlLabel
                  control={
                      <Checkbox
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          color="primary"
                      />
                  }
                  label={
                    <Typography>
                        I agree to the <Link href="https://mcqueen-gyrocar.com/files/TermsAndConditions.pdf" target="_blank" color="secondary">Terms and Conditions</Link>.
                    </Typography>
                }
              />
          </div>
      </div>
    </div> 
    );
  }
  
  export default CreditCardInfo;