import { useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

function MembersInfo() {
    
    const getData = async () => {
      const data = await axios.get("https://api.mcqueen-gyrocar.com/customers")
      console.log(data)
    }
    return (
      <><div >
        <h1>Members Info</h1>
        <Button onClick = {getData}>Data</Button>
      </div></>
  
    );
  }
  
  export default MembersInfo;