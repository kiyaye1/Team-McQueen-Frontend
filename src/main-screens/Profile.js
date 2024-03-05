import { Button } from "@mui/material";
import {Link} from "react-router-dom"

function Profile({toggleLogIn, loginEmployee}) {
    return (
      <><div className="Profile">
        <h1>Profile</h1>
          <Link to = "/">
            <Button variant = "text" onClick = { () => {toggleLogIn(false); loginEmployee(false)}}>Log Out</Button>
          </Link>
      </div></>
  
    );
  }
  
  export default Profile;