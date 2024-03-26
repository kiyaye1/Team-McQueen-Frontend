import { Button } from "@mui/material";
import {Link} from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

function Profile({toggleLogIn, loginEmployee}) {
    const [customerID, setCustomerID] = useState()
    const [customer, setCustomer] = useState()

    useEffect(() => {
      getLoggedInUser()

      // getCustomerInfo()
    }, [])

    function getLoggedInUser() {
      axios.get('https://api.mcqueen-gyrocar.com/loginInfo/getID', {withCredentials:true})
        .then(response => {
          console.log(response.data.ID)
          setCustomerID(response.data.ID)
          
          axios.get(`https://api.mcqueen-gyrocar.com/customers/${response.data.ID}`, {withCredentials: true})
            .then(response => {
              console.log(response.data)
              setCustomer(response.data)
      
            })
            .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
    }


    return (
      <><div className="Profile">
        <h1>Profile</h1>
        <h3>{customer.firstName + "" + customer.lastName}</h3>
          <Link to = "/">
            <Button variant = "text" onClick = { () => {toggleLogIn(false); loginEmployee(false)}}>Log Out</Button>
          </Link>
      </div></>
  
    );
  }
  
  export default Profile;