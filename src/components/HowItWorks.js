import CreateAccount from '../assets/man-walking.png'
import BookReservation from '../assets/calendar.png'
import PickUp from '../assets/car-interior-cropped.png'
import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';


const HowItWorks = () => {
  return (
    <div class = "grid grid-cols-3 gap-16">
      <div class = "text-center">
        <div class = "flex justify-center items-center">
          <img class = "rounded-full" src={CreateAccount} alt="Create Account" width="128" height="128" />
        </div>
        <h5 class = "text-card-title">Create an Account</h5>
        <p class = "text-body text-body-copy">Sign up, await approval, then access!</p>
      </div>

      <div class = "text-center">
        <div class = "flex justify-center items-center">
          <img class = "rounded-full" src={BookReservation} alt="Create Account" width="128" height="128" />
        </div>
        <h5 class = "text-card-title">Book your Reservation</h5>
        <p class = "text-body text-body-copy">Sign up, await approval, then access!</p>
      </div>

      <div class = "text-center">
        <div class = "flex justify-center items-center">
          <img class = "rounded-full" src={PickUp} alt="Create Account" width="128" height="128" />
        </div>
        <h5 class = "text-card-title">Pick up your Gyrocar</h5>
        <p class = "text-body text-body-copy">Sign up, await approval, then access!</p>
      </div>
  
    </div>
   
    
  );
};

export default HowItWorks;
