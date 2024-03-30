import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate();

    return (
        <div class = "m-16">
            <h1 class = "text-section-head">Thank you!</h1>
            <p>We'll review your information for verification and approval. Expect an email shortly to notify you of the approval status.</p>
            <Button onClick = {navigate('/home')}>Back to Home</Button>
        </div>
    )
}

export default Confirmation;