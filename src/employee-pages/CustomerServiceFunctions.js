import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import {TabPanel} from '@mui/lab';
import ApprovalRequests from './employee-components/ApprovalRequests';
import MembersInfo from './employee-components/MembersInfo'
import CustomerInquiries from './employee-components/CustomerInquiries'
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_API_URI from '../config';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CustomerServiceFunctions() {

    const [customerData, setCustomerData] = useState([])

    const navigate = useNavigate() 
    const params = useParams()
    const tabNumber = params.tab

    const [value, setValue] = useState(tabNumber);


    useEffect(() => {
      getData()
    }, [])

    const getData = async () => {
        const data = await axios.get(`${BASE_API_URI}/customers`, {withCredentials:true})
        setCustomerData(data.data) 
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <><div className="Homepage">
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    <Tab label="Approval Requests" value="1" />
                    <Tab label="Customer Inquiries" value="2" />
                    <Tab label="Members Info" value="3" />
                </TabList>
                </Box>
                <TabPanel value="1"><ApprovalRequests customerData = {customerData} /></TabPanel>
                <TabPanel value="2"><CustomerInquiries/></TabPanel>
                <TabPanel value="3"><MembersInfo customerData = {customerData}/></TabPanel>
            </TabContext>
        </Box>
      </div></>
  
    );
  }
  
  export default CustomerServiceFunctions;