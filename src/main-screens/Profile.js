import { Button, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function Profile({ toggleLogIn, loginEmployee, user }) {
  return (
    <div className="profile container border-l border-gray-300 pl-4"> {/* Tailwind classes for border */}
      <Typography variant="h4" gutterBottom>
        Your Account
      </Typography>

      <div className="user-info">
        <Typography variant="body1">Name: {user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Phone number: {user.phoneNumber}</Typography>
      </div>

      <Button variant="contained" onClick={() => { /* handle edit functionality here */ }}>
        Edit
      </Button>

      <MuiLink href="/" underline="none" className="logout-link">
        Log Out
      </MuiLink>
    </div>
  );
}

export default Profile;
