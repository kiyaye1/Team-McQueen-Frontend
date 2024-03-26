import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import carInterior from "../assets/car-interior.png"
import carBack from "../assets/car-back.jpg"
import carFront from "../assets/car-front.jpg"
import { FormControl, Select, InputLabel, MenuItem, Button } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import BASE_API_URI from "../config";

function ReservationDetails() {

    const {state} = useLocation()
    const {result, search} = state
    const searchQuery = search.searchQuery
    const selectedResult = result.data
    console.log(selectedResult)

    const navigate = useNavigate()
    // Payment Methods
    const customerID = 24; // FOR DEBUGGING AND TESTING
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [paymentMethods, setPaymentMethods] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${BASE_API_URI}/customers/${customerID}/payments`, 
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true
                    },
                    withCredentials: true
                }
            );
            setPaymentMethods(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
    }, []);

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };



    function getStationName(id) {
        switch(id) {
            case 1: return "Northwest";
            case 2: return "Northeast";
            case 3: return "Center City";
            case 4: return "Southeast";
            case 5: return "Airport";
            default: return "Northwest"
        }
    }

    // make sure customer ID is for who is logged in 
    let reservationData = {
        customerID: customerID, // FOR TESTING
        carID: selectedResult.carsAvailable[0],
        scheduledStartDatetime: searchQuery.pickup_datetime.$d.toISOString(),
        scheduledEndDatetime: searchQuery.dropoff_datetime.$d.toISOString(),
        startStationID: searchQuery.pickup_location,
        endStationID: searchQuery.dropoff_location
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_API_URI}/reservations/`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials:true
    }

    async function submitReservation() {
        if (selectedPaymentMethod === "") {
            alert("Please select a payment method");
            return;
        }
        reservationData.paymentMethodID = selectedPaymentMethod;

        config.data = JSON.stringify(reservationData);

        axios.request(config)
            .then((response) => {
                if (response.status === 200) {
                    alert("Reservation Successful: " + response.data.reservationID);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


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
                <h5>{getStationName(searchQuery.pickup_location)}</h5>
                <p>{searchQuery.pickup_datetime.$d.toISOString()}</p>
                <h5>{getStationName(searchQuery.dropoff_location)}</h5>
                <p>{searchQuery.dropoff_datetime.$d.toISOString()}</p>
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
                <h5>${(selectedResult.costPerHour * searchQuery.reservationTime).toFixed(2)}</h5>
            </div>

        </div>
        <form className="grid grid-cols-1 lg:grid-cols-5 gap-8 px-8 py-8">
            <FormControl>
                <InputLabel id="payment-method-select">Select Payment Method</InputLabel>
                <Select
                name = "payment_method"
                labelId = "payment_method_select"
                label = "Payment Method"
                variant = "standard"
                onChange={handlePaymentMethodChange}
                >
            
                {paymentMethods.map((paymentMethod) => (
                    <MenuItem key={paymentMethod.id} value={paymentMethod.id}>
                        {paymentMethod.brand.toUpperCase() + " **** " + paymentMethod.last4}
                    </MenuItem>
                ))}


                </Select>
            </FormControl>
            <Button onClick = {() => submitReservation()}>Confirm Reservation</Button>
        </form>
        
      </div></>
  
    );
  }
  
  export default ReservationDetails;