import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import NotLoggedInLayout from "../navigation/Layout";

function Login({toggleLogIn}) {
    return (
      <><div class = "text-center p-8">
          <div class = "font-medium text-2xl">Login</div>
          <div>
            <div><TextField variant = "standard" label = "Email Address"/></div>
            <div class = "p-2"><TextField variant = "standard" label = "Password"/></div>
            <div>
              <Button variant = "contained" onClick = {() => toggleLogIn(true)}>
                Log In
              </Button>
            </div>
          </div>
          
      </div></>
  
    );
  }
  
  export default Login;