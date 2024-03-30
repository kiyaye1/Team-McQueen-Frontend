import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
//import theme from "../theme/Theme"
import {ThemeProvider} from "@mui/material/styles";
import { createTheme } from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import BASE_API_URI from "../config";


//Handle login with appropriate messages
function Login({toggleLogIn, loginEmployee}) {
  
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post( `${BASE_API_URI}/login/loginRequest`, {emailAddress, password}, {withCredentials:true})
    .then(response => {
      console.log(response)
      axios.get(`${BASE_API_URI}/loginInfo/getInfo`,{withCredentials:true})
      .then(response => {
        console.log(response)
        console.log(response.data.role)
        if(response.data.role === 0) {
          console.log("role is 0")
          toggleLogIn(true)
          localStorage.setItem('isLoggedIn', true)
          navigate('/reserve')
        }
        if(response.data.role > 0) {
          console.log("employee logged in")
          loginEmployee(true)
          localStorage.setItem('isEmployee', true)
          navigate('/dash')
        }
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
    
  };
  
  return (
    <div class = "text-center m-16">
      <form onSubmit={handleSubmit}>
        <div class = "flex justify-center">
        <div class = "w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-1 gap-y-32">
            <div class = "text-section-head">Login</div>
            <div class = "">
              <TextField 
                value = {emailAddress} 
                onChange = {(e) => setEmailAddress(e.target.value)}              
                name = "emailAddress"
                variant = "standard" 
                label = "Email Address"
                sx = {{margin:1, width: '100%'}}
                required
              />
              <TextField 
                value = {password} 
                onChange = {(e) => setPassword(e.target.value)}
                name = "password"
                variant = "standard" 
                type = "password"
                label = "Password"
                sx = {{margin:1, width: '100%'}}
                required
              />
              <div className = "text-red text-sm">{loginStatus}</div>
            </div>
            <div class = "text-center">
              {/*<Link to = "/reserve">*/}
                <Button sx = {{backgroundColor: '#000180'}} type="submit">Log In</Button>
              {/*</Link>*/}
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
