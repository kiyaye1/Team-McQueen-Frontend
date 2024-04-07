import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import {TabPanel} from '@mui/lab';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_API_URI from '../config';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FleetManagement from './FleetManagement';
import ServiceRequests from './employee-components/MechanicServiceRequests';

function MechanicFunctions() {

    const [customerData, setCustomerData] = useState([])

    const navigate = useNavigate() 
    const params = useParams()
    const tabNumber = params.tab

    const [value, setValue] = useState(tabNumber);


    // useEffect(() => {
    //   getData()
    // }, [])

    // const getData = async () => {
    //     const data = await axios.get(`${BASE_API_URI}/customers`, {withCredentials:true})
    //     setCustomerData(data.data) 
    // }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <><div className="Homepage">
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    <Tab label="Service Requests" value="1" />
                    <Tab label="Fleet Management" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1"><ServiceRequests/></TabPanel>
                <TabPanel value="2"><FleetManagement/></TabPanel>
            </TabContext>
        </Box>
      </div></>
  
    );
  }
  
  export default MechanicFunctions;