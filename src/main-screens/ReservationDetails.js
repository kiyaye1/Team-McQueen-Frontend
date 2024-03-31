import { useLocation } from "react-router-dom";
import carInterior from "../assets/car-interior.png"
import carBack from "../assets/car-back.jpg"
import carFront from "../assets/car-front.jpg"

function ReservationDetails() {

    const {state} = useLocation()
    const {searchQuery, station, price} = state
    console.log(searchQuery)
    console.log(price)
    console.log(searchQuery.searchQuery.dropoff_location)

    return (
      <><div class ="my-16 mx-16 lg:mx-32">
        <h1 class = "mb-4 text-section-head"> Car Details </h1>
        <div class = "grid grid-cols-1 gap-4 md:grid-cols-3 gap-4 lg:gap-8">
            <img class = "col-span-2 w-full rounded-xl" src = {carInterior}></img>
            
            <div class = "grid grid-cols-1 gap-2">
                <img class = "rounded-xl" src = {carFront}></img>
                <img class = "rounded-xl" src = {carBack}></img>
            </div>
            
            <div class = "col-span-2 border border-border rounded-xl p-4">
                <h3 class = "text-card-title">Car Description</h3>
                <p>Gyrocar – the perfect electric vehicle with a sleek, contemporary design tailored just for you!</p>
            </div>

            <div class = "border border-border rounded-xl p-4">
                <h3 class = "text-card-title">Pick Up and Drop Off</h3>
                <h5>{searchQuery.searchQuery.pickup_location}</h5>
                <h5>{searchQuery.searchQuery.dropoff_location}</h5>
            </div>

            <div class = "col-span-2 border border-border rounded-xl p-4">
                <h3 class = "text-card-title">Car Features</h3>
                <p>Electric</p>
                <p>Air Conditioning</p>
                <p>Wifi</p>
                <p>Touchscreen display</p>
                <p>Built in GPS</p>
            </div>

            <div class = "border border-border rounded-xl p-4">
                <h3 class = "text-card-title">Cost</h3>
                <h5>${price.price}</h5>
            </div>

        </div>
        
      </div></>
  
    );
  }
  
  export default ReservationDetails;