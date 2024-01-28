import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

function Login() {
    return (
      <><div class = "text-center p-8">
          <div class = "font-medium text-2xl">Login</div>
          <div>
            <div><TextField variant = "standard" label = "Email Address"/></div>
            <div class = "p-2"><TextField variant = "standard" label = "Password"/></div>
            <div>
              <Button variant = "contained">
                Log In
              </Button>
            </div>
          </div>
          
      </div></>
  
    );
  }
  
  export default Login;