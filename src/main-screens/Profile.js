import { Button } from "@mui/material";
import {Link} from "react-router-dom"

function Profile({toggleLogIn}) {
    return (
      <><div className="Profile">
        <h1>Profile</h1>
          <Link to = "/">
            <Button variant = "text" onClick = { () => toggleLogIn(false)}>Log Out</Button>
          </Link>
      </div></>
  
    );
  }
  
  export default Profile;