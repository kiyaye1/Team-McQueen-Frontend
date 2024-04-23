import carImage from '../assets/full-car-teal.jpg'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AboutUs() {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  
    return (
      <><div class = "">
      <div class = "w-full bg-gray5 px-16 py-16">
        <h1 class = "text-section-head">About Us</h1>
      </div>
      <div class = "mx-16 lg: mr-32 mt-16 grid grid-cols-2 gap-8">
        <img class = "rounded-lg" src = {carImage}/>
        <section class = "text-body-copy text-card-title font-normal">
          <p class = "pb-4">We invite you to join us in using GyroGoGo for easy, convenient personal transportation. Rent a gyrocar for a single run into downtown, or rent it for the day to visit multiple destinations. The cars are designed to carry a single passenger and a small amount of cargo. </p>
          <p>Gyrocars are easy to drive because internal gyroscopes balance the cars for you. You don’t need any special training to drive a gyrocar, just slide in and go! These cars have a small profile, so are easy to navigate through traffic – and parking is a breeze. County regulations even allow gyrocars to be parked in designated motorcycle slots. </p>
        </section>
        <h2 class = "col-span-2 text-subhead">It’s easy. It’s convenient. It’s cost effective. GyroGoGo!</h2>
        <section class = "col-span-2 text-body-copy text-card-title font-normal">
          <p class = "pb-4">We have five convenient pick up/drop off locations in Monroe County, including in center city. Your rental is operated with a unique access code that prevents anyone else from entering your vehicle. If you’ve opted for a longer rental, our gyrocars can be recharged at any EV charging station. Gyrogogo, Inc. is a privately owned, United States based corporation that provides commuting solutions for individuals.</p>
          <p>If you need more information, check out the Q&A section or send us a message through our Contact Page.</p>
        </section>
      </div>


      <div class = "w-full bg-purple-accent text-center">
        <div class = "p-16 mx-16 mt-24">
          <h1 class = "text-section-head mb-8">Get Going Now</h1>
          <Button variant="contained" onClick={handleSignUpClick} sx={{ backgroundColor: "#000180" }}>
                Sign Up
          </Button>
        </div>
      </div>


    </div></>
  
    );
  }
  
  export default AboutUs;