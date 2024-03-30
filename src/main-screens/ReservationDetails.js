import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import carInterior from "../assets/car-interior.png";
import carBack from "../assets/car-back.jpg";
import carFront from "../assets/car-front.jpg";
import { FormControl, Select, InputLabel, MenuItem, Button, TextField } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import BASE_API_URI from "../config";
import { useAuth } from '../context/AuthContext';

function ReservationDetails() {
    const { user } = useAuth();
    const { state } = useLocation();
    const { result, search } = state || {};
    const searchQuery = search?.searchQuery;
    const selectedResult = result?.data;

    const navigate = useNavigate();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [paymentMethods, setPaymentMethods] = useState([]);
    const customerID = user.userID;

    useEffect(() => {
        if (customerID) {
            const fetchPaymentMethods = async () => {
                try {
                    const response = await axios.get(`${BASE_API_URI}/customers/${customerID}/payments`, {
                        withCredentials: true
                    });
                    setPaymentMethods(response.data);
                } catch (error) {
                    console.error('Error fetching payment methods:', error);
                }
            };
            fetchPaymentMethods();
        }
    }, [customerID]);

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const getStationName = (id) => {
        switch (id) {
            case 1: return "Northwest";
            case 2: return "Northeast";
            case 3: return "Center City";
            case 4: return "Southeast";
            case 5: return "Airport";
            default: return "Unknown";
        }
    };
    const reservationData = {
        customerID,
        carID: selectedResult?.carsAvailable[0],
        scheduledStartDatetime: dayjs(searchQuery?.pickupDateTime).toISOString(), 
        scheduledEndDatetime: dayjs(searchQuery?.dropoffDateTime).toISOString(), 
        startStationID: searchQuery?.pickupLocation,
        endStationID: searchQuery?.dropoffLocation, 
        paymentMethodID: selectedPaymentMethod
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_API_URI}/reservations/`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: reservationData,
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
        <>
            <div className="my-16 mx-16 lg:mx-32">
                <h1 className="mb-4 text-section-head">Car Details</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-8">
                    <img className="col-span-2 w-full rounded-xl" src={carInterior} alt="Car Interior" />
                    <div className="grid grid-cols-1 gap-2">
                        <img className="rounded-xl" src={carFront} alt="Car Front" />
                        <img className="rounded-xl" src={carBack} alt="Car Back" />
                    </div>
                    <div className="col-span-2 border border-border rounded-xl p-4">
                        <h3 className="text-card-title">Car Description</h3>
                        <p>Gyrocar – the perfect electric vehicle with a sleek, contemporary design tailored just for you!</p>
                    </div>
                    <div className="border border-border rounded-xl p-4">
                        <h3 className="text-card-title">Pick Up and Drop Off</h3>
                        <h5>{getStationName(searchQuery?.pickupLocation)}</h5>
                        <p>{searchQuery?.pickupDateTime ? dayjs(searchQuery.pickupDateTime).toISOString() : "Time Unavailable"}</p>
                        <h5>{getStationName(searchQuery?.dropoffLocation)}</h5>
                        <p>{searchQuery?.dropoffDateTime ? dayjs(searchQuery.dropoffDateTime).toISOString() : "Time Unavailable"}</p>
                    </div>
                    <div className="col-span-2 border border-border rounded-xl p-4">
                        <h3 className="text-card-title">Car Features</h3>
                        <p>Electric</p>
                        <p>Air Conditioning</p>
                        <p>Wifi</p>
                        <p>Touchscreen display</p>
                        <p>Built in GPS</p>
                    </div>
                    <div className="border border-border rounded-xl p-4">
                    <h3 className="text-card-title">Cost</h3>
                    <h5>
                        ${selectedResult && searchQuery ? (
                            (selectedResult.costPerHour * searchQuery.reservationTime).toFixed(2)
                        ) : (
                            "Calculating..."
                        )}
                    </h5>
                </div>
                </div>
                <form className="grid grid-cols-1 lg:grid-cols-5 gap-8 px-8 py-8">
                <FormControl>
                    <InputLabel id="payment-method-select">Select Payment Method</InputLabel>
                    <Select
                        name="payment_method"
                        labelId="payment_method_select"
                        label="Payment Method"
                        variant="standard"
                        value={selectedPaymentMethod}
                        onChange={handlePaymentMethodChange}
                    >
                        {/* Static options for Stripe and PayPal */}
                        <MenuItem value="stripe">Stripe</MenuItem>
                        <MenuItem value="paypal">PayPal</MenuItem>

                        {/* Dynamically loaded payment methods */}
                        {paymentMethods.map((paymentMethod) => (
                            <MenuItem key={paymentMethod.id} value={paymentMethod.id}>
                                {paymentMethod.brand.toUpperCase() + " **** " + paymentMethod.last4}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                    <Button onClick={submitReservation}>Confirm Reservation</Button>
                </form>
            </div>
        </>
    );
}


export default ReservationDetails;
