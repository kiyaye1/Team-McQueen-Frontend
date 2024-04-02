import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_API_URI from "../config";

function EmployeeManagement() {
    const [value, setValue] = useState('1');

    const [employeeData, setEmployeeData] = useState([])

    useEffect(() => {
      getData()
    }, [])

    const getData = async () => {
        const data = await axios.get(`${BASE_API_URI}/employees`, {withCredentials:true})
        setEmployeeData(data.data) 
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <><div className="Homepage">
        Employee Management
      </div></>
  
    );
  }
  
  export default EmployeeManagement;