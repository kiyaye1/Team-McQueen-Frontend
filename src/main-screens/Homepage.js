
import CreateAccount from '../components/HowItWorks';
import { Button } from '@mui/material';
import carPhoto from '../assets/teal-car.png';
import { Grid, Typography } from '@mui/material';




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

      <div className="hero bg-cover bg-center h-screen" style={{ backgroundImage: "url(src/img/car.png)" }}>
      <div className="container flex items-center py-8 px-4 md:px-20">
        <img src="img/car.png" alt="Image" className="w-1/2 h-auto object-cover rounded-lg mr-8" />
        <div className="flex flex-col justify-content-between">
        <div class="text-alignment">  <h1 class="text-4xl font-bold text-black mb-4">Why GyroGoGo</h1>  <div class="tagline-and-description">  <p class="text-xl text-gray-500 leading-loose">Convenient</p>  <Typography variant="caption" color="textSecondary">
      Navigate city traffic with ease. Parking is a breeze.  
      Five convenient locations for pick up and drop off!
    </Typography>
  </div>

  <div class="tagline-and-description">  <p class="text-xl text-gray-500 leading-loose">Affordable</p>  <Typography variant="caption" color="textSecondary">
      Save money! Renting an environmentally friendly gyrocar as needed is far more 
      cost effective than commuting in an automobile that you own and maintain.
    </Typography>
  </div>

  <div class="tagline-and-description">  <p class="text-xl text-gray-500 leading-loose">Professional</p>  <Typography variant="caption" color="textSecondary">
      Arrive at your destination in comfort and looking professional regardless of the weather.
    </Typography>
  </div>
</div>

          {/* Removed the Button component and its class */}
        </div>
      </div>
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
