
import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';


const CreateAccount = () => {
  return (
   // <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', border: '1px solid #ddd', borderRadius: 4 }}> {/* Added border and rounded corners */}
      <Grid container spacing={2} direction="row" alignItems="center" >
        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}> {/* Added padding */}
          <img src="your-image.png" alt="Create Account" width="128" height="128" />
          <Typography variant="h6" component="h6" className="text-black font-bold mb-2">
            Create an account
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Sign up, await approval, then access!
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}> {/* Added padding */}
        <img src="book.png" alt="Book Reservation" width="128" height="128" />
          <Typography variant="h6" component="h6" className="text-black font-bold mb-2">
            Book Your Reservation
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Sign up, await approval, then access!
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}> {/* Added padding */}
        <img src="gyrocar.png" alt="PickUp" width="128" height="128" />
          <Typography variant="h6" component="h6" className="text-black font-bold mb-2">
            Pick Up Your Gyrocar
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Sign up, await approval, then access!
          </Typography>
        </Grid>
      </Grid>
    
  );
};

export default CreateAccount;
