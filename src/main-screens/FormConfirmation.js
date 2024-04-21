import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate();

    return (
        <div class = "m-16">
            <h1 class = "text-section-head">Thank you! Email Successfully Verified!</h1>
            <p>Please expect another email shortly to notify you of the approval status.</p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    )
}

export default Confirmation;