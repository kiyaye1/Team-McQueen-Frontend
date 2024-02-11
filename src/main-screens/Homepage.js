import Button from 'react-bootstrap/Button';

const Homepage = () => {
  return (
    <div className="hero bg-cover bg-center h-screen" style={{ backgroundImage: "url(src/img/car.png)" }}>
      <div className="container flex items-center justify-content-center py-8 px-4 md:px-20">
        <div className="flex flex-col pr-8 sm:flex-row sm:items-center sm:pr-20 gap-16">
          <img src="car.png" alt="Image" className="w-64 h-auto ml-auto sm:block" />
          <div>
            <h1 className="text-4xl font-bold text-black mb-4">Experience GyroGoGo</h1>
            <p className="text-xl text-gray-500 leading-loose">Rent an easy-to-drive gyrocar for your local commuting needs.</p>
            <p className="text-xl text-gray-500 leading-loose mt-2">Become a GyroGoGo member and enjoy the very best way to get around town!</p>
            <Button href=" " className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
