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
          </div>

          <div class = "right-0"><img src={carPhoto} alt="Image" className="rounded-full w-full h-auto ml-auto sm:block" /></div>

        </div>
      </div>
    </div>
  );
};

export default Homepage;
