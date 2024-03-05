import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
//import theme from "../theme/Theme"
import {ThemeProvider} from "@mui/material/styles";
import { createTheme } from "@mui/material"
import {Link} from "react-router-dom"

// const theme = createTheme({
//   palette: {
//       blue_primary: '#000180',
//       blue_primary_accent: '4a4cda',
//       teal_secondary: '#33adad',
//       purple: '9d9dd9',
//       purple_accent: 'f2f2ff'
//   }
// });

function Login({toggleLogIn, loginEmployee}) {
    return (
      <div class = "text-center m-16">
        <form>
          <div class = "flex justify-center">
          <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-1 gap-y-32">
              <div class = "text-section-head">Login</div>
              <div class = "">
                <TextField 
                  variant = "standard" 
                  label = "Email Address"
                  sx = {{margin:1, width: '100%'}}
                />
                <TextField 
                  variant = "standard" 
                  type = "password"
                  label = "Password"
                  sx = {{margin:1, width: '100%'}}
                />
              </div>
              <div class = "text-center">
                <Link to = "/reserve">
                  <Button sx = {{backgroundColor: '#000180'}} variant = "contained" onClick = { () => toggleLogIn(true)}>Log In</Button>
                </Link>
                <Link to = "/account">
                <Button variant = "outlined" onClick = {() => loginEmployee(true)}>Employee Login</Button>
              </Link>
              </div>

          </div>
          </div>
          
        </form>
          
      </div>
 
      
  
    );
  }
  
  export default Login;

//TODO: log in will be determined based on if the user is authenticated or not. 
// if not authorized, they will not jump to the home page after logging in. 