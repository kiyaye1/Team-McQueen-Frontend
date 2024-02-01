import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom"

function Login({toggleLogIn}) {
    return (
      <><div class = "text-center p-8">
          <div class = "font-medium text-2xl">Login</div>
          <div>
            <div><TextField variant = "standard" label = "Email Address"/></div>
            <div class = "p-2"><TextField variant = "standard" label = "Password"/></div>
            <div>
              <Link to = "/reserve">
                <Button variant = "contained" onClick = { () => toggleLogIn(true)}>Log In</Button>
              </Link>
            
            </div>
          </div>
          
      </div></>
  
    );
  }
  
  export default Login;

//TODO: log in will be determined based on if the user is authenticated or not. 
// if not authorized, they will not jump to the home page after logging in. 