import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
//import theme from "../theme/Theme"
import {ThemeProvider} from "@mui/material/styles";
import { createTheme } from "@mui/material"
import {Link} from "react-router-dom"

const theme = createTheme({
  palette: {
      blue_primary: '#000180',
      blue_primary_accent: '4a4cda',
      teal_secondary: '#33adad',
      purple: '9d9dd9',
      purple_accent: 'f2f2ff'
  }
});

function Login({toggleLogIn}) {
    return (
      <ThemeProvider theme = {theme}>
        <div class = "text-center p-8">
          <div class = "font-medium text-section-head">Login</div>
          <div>
            <div><TextField variant = "standard" label = "Email Address"/></div>
            <div class = "p-2"><TextField variant = "standard" label = "Password"/></div>
            <div>
              <Link to = "/reserve">
                <Button variant = "contained" onClick = { () => toggleLogIn(true)}>Log In</Button>
              </Link>
            
            </div>
          </div>
          
      </div>
      </ThemeProvider>
  
    );
  }
  
  export default Login;

//TODO: log in will be determined based on if the user is authenticated or not. 
// if not authorized, they will not jump to the home page after logging in. 