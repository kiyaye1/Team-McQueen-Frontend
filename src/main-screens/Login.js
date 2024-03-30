import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext'; 

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  useEffect(() => {
      if (user) {
          if (user.isEmployee) {
              navigate('/dash'); 
          } else {
              navigate('/reserve');
          }
      }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await login(emailAddress, password);
      } catch (error) {
          setLoginStatus('Login failed. Please check your credentials.');
      }
  };

    return (
      <div className="text-center m-16">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 grid grid-cols-1 gap-y-32">
              <div className="text-section-head">Login</div>
              <div>
                <TextField 
                  value={emailAddress} 
                  onChange={(e) => setEmailAddress(e.target.value)}              
                  name="emailAddress"
                  variant="standard" 
                  label="Email Address"
                  sx={{margin: 1, width: '100%'}}
                  required
                />
                <TextField 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  variant="standard" 
                  type="password"
                  label="Password"
                  sx={{margin: 1, width: '100%'}}
                  required
                />
                <div className="text-red text-sm">{loginStatus}</div>
              </div>
              <div className="text-center">
              <Button variant="contained" sx={{ backgroundColor: "#000180", foregroundColor: "#FFFFFF"}} type="submit">Log In</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  
}

export default Login;
