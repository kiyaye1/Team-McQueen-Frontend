import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ReservationConfirmation = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1 class = "text-section-head">Your Reservation is Confirmed</h1>
            <p>Your reservation ID is {}</p>
            <Button onClick = {navigate('/home')}>Back to Home</Button>
        </div>
    )
}

export default ReservationConfirmation;