import BikeWoman from '../assets/bike-woman.jpg'
import HowItWorks from '../components/HowItWorks';
import { Button } from '@mui/material';
import carPhoto from '../assets/teal-car.png';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="hero bg-cover bg-center h-screen">
      <div className="container flex items-center justify-content-center py-8 pl-4 md:pl-20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-16">
          
          <div>
            <h1 className="text-hero font-bold text-black mb-4">Experience GyroGoGo</h1>
            <p className="text-xl text-gray-500 leading-loose">Rent an easy-to-drive gyrocar for your local commuting needs.</p>
            <p className="text-xl text-gray-500 leading-loose mt-2">Become a GyroGoGo member and enjoy the very best way to get around town!</p>
            <div className="py-8">
              <Button variant="contained" onClick={handleSignUpClick} sx={{ backgroundColor: "#000180" }}>
                Sign Up
              </Button>
            </div>

          </div>

          <div class = "right-0"><img src={carPhoto} alt="Image" className="rounded-full w-full h-auto ml-auto sm:block" /></div>

        </div>
      </div>

      {/* Create Account section with border and title */}
      <div className="create-account-section border border-border px-4 py-3 mx-auto mt-8 rounded flex flex-col items-center">
        <h2 className="text-section-head mb-8 mt-4">How it works</h2>
        {/* Your CreateAccount component goes here */}
        <HowItWorks />
      </div>

      <div className="m-16 lg:mx-32">
          <div className="grid grid-cols-2 gap-8 lg:gap-16">
            <img src= {BikeWoman} alt="Image" className="w-full h-auto object-cover rounded-lg mr-8" />
            <div className="flex flex-col justify-content-between">
            <div class="text-alignment">  
            <h1 class="text-section-head font-bold text-black mb-4">Why GyroGoGo</h1>  
              <div class="tagline-and-description">  
                <p class="text-subhead leading-loose">Convenient</p>  
                <p class = "text-body-copy">
                    Navigate city traffic with ease. Parking is a breeze.  <br/>
                    Five convenient locations for pick up and drop off!
                </p>
              </div>

              <div class="tagline-and-description">  
              <p class="text-subhead leading-loose">Affordable</p>  
              <p class = "text-body-copy">
                  Save money! Renting an environmentally friendly gyrocar as needed is far more <br/>
                  cost effective than commuting in an automobile that you own and maintain.
                </p>
              </div>

              <div class="tagline-and-description">  
              <p class="text-subhead leading-loose">Professional</p>  
                <p class = "text-body-copy">
                  Arrive at your destination in comfort and looking professional <br/> regardless of the weather.
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
      <div class="w-full bg-purple-accent text-center">
        <div class="p-16 mx-16 mt-24">
          <h1 class="text-section-head mb-8">Get Going Now</h1>
          <div className="py-8">
              <Button variant="contained" onClick={handleSignUpClick} sx={{ backgroundColor: "#000180" }}>
                Sign Up
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
