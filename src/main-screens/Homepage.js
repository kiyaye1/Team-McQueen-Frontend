<<<<<<< HEAD

import Button from '@mui/material/Button'; // Import Button from Material UI

// Import CreateAccount component, assuming it's in the same directory
import CreateAccount from './CreateAccount';

const Homepage = () => {
  return (
    <div className="homepage-container container mx-auto px-4 py-8">
      {/* Existing hero content */}
      <div className="hero bg-cover bg-center h-screen" style={{ backgroundImage: "url(src/img/car.png)" }}>
        <div className="container flex items-center justify-content-center py-8 px-4 md:px-20">
          <div className="flex flex-col pr-8 sm:flex-row sm:items-center sm:pr-20 gap-16">
            <img src="car.png" alt="Image" className="w-64 h-auto ml-auto sm:block" />
            <div>
              <h1 className="text-4xl font-bold text-black mb-4">Experience GyroGoGo</h1>
              <p className="text-xl text-gray-500 leading-loose">Rent an easy-to-drive gyrocar for your local commuting needs.</p>
              <p className="text-xl text-gray-500 leading-loose mt-2">Become a GyroGoGo member and enjoy the very best way to get around town!</p>
              <Button href=" " variant="contained" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Sign Up
              </Button>
            </div>
=======
import { Button } from '@mui/material';
import carPhoto from '../images/teal-car.png'

const Homepage = () => {
  return (
    <div className="hero bg-cover bg-center h-screen">
      <div className="container flex items-center justify-content-center py-8 pl-4 md:pl-20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-16">
          
          <div>
            <h1 className="text-hero font-bold text-black mb-4">Experience GyroGoGo</h1>
            <p className="text-xl text-gray-500 leading-loose">Rent an easy-to-drive gyrocar for your local commuting needs.</p>
            <p className="text-xl text-gray-500 leading-loose mt-2">Become a GyroGoGo member and enjoy the very best way to get around town!</p>
            <div className = "py-8"><Button variant='contained'>Sign Up</Button></div>
>>>>>>> 4e811d035181aed97c2af7ca3979cddce6fd612b
          </div>

          <div class = "right-0"><img src={carPhoto} alt="Image" className="rounded-full w-full h-auto ml-auto sm:block" /></div>

        </div>
      </div>

      {/* Create Account section with border and title */}
      <div className="create-account-section border px-4 py-3 mx-auto mt-8 rounded flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">How it works</h2>
        {/* Your CreateAccount component goes here */}
        <CreateAccount />
      </div>

      {/* Second section with purple background */}
      <div class="w-full bg-purple-accent text-center">
        <div class="p-16 mx-16 mt-24">
          <h1 class="text-section-head mb-8">Get Going Now</h1>
          <Button variant="contained" sx={{ backgroundColor: "#000180" }}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
